const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Usage: node scripts/batch_clone.cjs <path_to_batch.json> [--deploy] [--skip-build]
const batchFilePath = process.argv[2];
const shouldDeploy = process.argv.includes('--deploy');
const skipBuild = process.argv.includes('--skip-build');

if (!batchFilePath || !fs.existsSync(batchFilePath)) {
  console.error('❌ Error: Please provide a valid path to a JSON list of target websites or domain strings.');
  console.log('Usage: node scripts/batch_clone.cjs examples/batch-targets.sample.json [--deploy] [--skip-build]');
  process.exit(1);
}

console.log(`📥 Loading batch target list from: ${batchFilePath}...`);
const rawBatch = JSON.parse(fs.readFileSync(batchFilePath, 'utf8'));

if (!Array.isArray(rawBatch)) {
  console.error('❌ Error: Input file must be a JSON array of website profile objects or domain strings.');
  process.exit(1);
}

// Helper to sanitize strings into filesystem folder names (slugs)
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `brand-${Date.now()}`;
}

// Helper to copy directory recursively while filtering out artifacts and node_modules
function copyDirectorySync(src, dest, excludeNames = ['.git', 'node_modules', 'dist', '.vercel', 'output', 'batch-output', '.system_generated', '.user_uploaded']) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (excludeNames.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath, excludeNames);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Ensure master output directory exists
const outputRootDir = path.join(__dirname, '..', 'output');
if (!fs.existsSync(outputRootDir)) {
  fs.mkdirSync(outputRootDir, { recursive: true });
}

console.log(`🚀 Starting Batch Engine for ${rawBatch.length} target websites...`);

const results = [];
const masterRepoDir = path.resolve(__dirname, '..');
const masterNodeModules = path.join(masterRepoDir, 'node_modules');

for (let i = 0; i < rawBatch.length; i++) {
  const rawItem = rawBatch[i];
  
  // Normalize item: support either a raw domain string or a comprehensive profile JSON object
  const profile = typeof rawItem === 'string'
    ? {
        name: rawItem.split('.')[0].toUpperCase() + ' Moving Group',
        domain: rawItem,
        shortName: rawItem.split('.')[0],
        websiteUrl: `https://www.${rawItem}`
      }
    : rawItem;

  const brandName = profile.name || profile.domain || `Target Site ${i + 1}`;
  const slug = profile.githubRepo || toSlug(brandName);
  const targetDir = path.join(outputRootDir, slug);

  console.log(`\n============================================================`);
  console.log(`[${i + 1}/${rawBatch.length}] 🛠️  Processing Brand: ${brandName} (Slug: ${slug})`);
  console.log(`============================================================`);

  const itemResult = {
    index: i + 1,
    name: brandName,
    slug: slug,
    directory: targetDir,
    populateStatus: 'Pending',
    buildStatus: 'Pending',
    deployUrl: 'N/A',
    error: null
  };

  try {
    // Step 1: Create isolated build folder and copy template
    console.log(`📦 Creating isolated brand clone in: ./output/${slug}/...`);
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    copyDirectorySync(masterRepoDir, targetDir);

    // Step 2: Write profile JSON and run modular substitution engine
    const targetProfilePath = path.join(targetDir, 'target-profile.json');
    fs.writeFileSync(targetProfilePath, JSON.stringify(profile, null, 2), 'utf8');
    
    console.log(`🔄 Executing modular substitution engine...`);
    execSync(`node scripts/populate_template.cjs target-profile.json`, {
      cwd: targetDir,
      stdio: 'inherit'
    });
    itemResult.populateStatus = '✅ Success';

    // Step 3: Fast dependency symlinking or copying for compiler verification
    if (!skipBuild) {
      console.log(`⚙️  Preparing dependencies for build check...`);
      const targetNodeModules = path.join(targetDir, 'node_modules');
      if (fs.existsSync(masterNodeModules) && !fs.existsSync(targetNodeModules)) {
        // Use directory copy or symlink if available for high-speed batch execution
        try {
          fs.symlinkSync(masterNodeModules, targetNodeModules, 'dir');
        } catch (e) {
          copyDirectorySync(masterNodeModules, targetNodeModules, []);
        }
      }

      console.log(`🔍 Verifying production compilation (npm run build)...`);
      execSync('npm run build', {
        cwd: targetDir,
        stdio: 'inherit'
      });
      itemResult.buildStatus = '✅ Passed (0 Errors)';
    } else {
      itemResult.buildStatus = '⏭️  Skipped';
    }

    // Step 4: Automated GitHub & Vercel Edge Deployment
    if (shouldDeploy) {
      console.log(`🚀 Triggering automated live edge deployment...`);
      try {
        execSync(`git init; git add -A; git commit -m "feat: initial batch release for ${brandName}"`, {
          cwd: targetDir,
          stdio: 'ignore'
        });

        if (profile.githubRepo && process.env.GITHUB_TOKEN) {
          console.log(`🌐 Provisioning GitHub repository: ${profile.githubRepo}...`);
          // Execute gh repo creation if available
          execSync(`gh repo create ${profile.githubRepo} --public --source=. --push`, { cwd: targetDir, stdio: 'inherit' });
        }

        console.log(`⚡ Deploying to Vercel Edge Production...`);
        const vercelProject = profile.vercelProject || slug;
        const deployOutput = execSync(`npx --yes vercel@latest deploy --prod --yes --name ${vercelProject}`, {
          cwd: targetDir,
          encoding: 'utf8'
        });
        
        // Extract live URL from deployment output
        const urlMatch = deployOutput.match(/https:\/\/[^\s]+\.vercel\.app/);
        itemResult.deployUrl = urlMatch ? urlMatch[0] : 'Deployed (Check Vercel Dashboard)';
      } catch (deployErr) {
        console.warn(`⚠️ Deployment step encountered warning: ${deployErr.message.split('\n')[0]}`);
        itemResult.deployUrl = '⚠️ Manual push required';
      }
    }

    console.log(`✨ Successfully generated clean build for: ${brandName}`);
  } catch (err) {
    console.error(`❌ Error processing ${brandName}:`, err.message);
    itemResult.error = err.message.split('\n')[0];
    if (itemResult.populateStatus === 'Pending') itemResult.populateStatus = '❌ Failed';
    if (itemResult.buildStatus === 'Pending') itemResult.buildStatus = '❌ Failed';
  }

  results.push(itemResult);
}

// ============================================================
// FINAL BATCH EXECUTION REPORT
// ============================================================
console.log(`\n\n============================================================`);
console.log(`📋 BATCH EXECUTION SUMMARY (${results.length} Targets Processed)`);
console.log(`============================================================`);

console.table(results.map(r => ({
  '#': r.index,
  'Brand Name': r.name,
  'Slug': r.slug,
  'Substitution': r.populateStatus,
  'Build Test': r.buildStatus,
  'Live Edge URL': r.deployUrl
})));

const failedCount = results.filter(r => r.buildStatus.includes('❌') || r.populateStatus.includes('❌')).length;
const successCount = results.length - failedCount;

console.log(`\n🎉 Batch processing finished! Success: ${successCount} | Failed: ${failedCount}`);
console.log(`📁 All independent generated websites are ready in: ./output/<brand-slug>/`);
if (failedCount > 0) {
  process.exit(1);
}
