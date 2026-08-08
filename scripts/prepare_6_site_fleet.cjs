const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const fleetTargets = [
  {
    "name": "Moving ASAP",
    "phone": "+1 647-540-1453",
    "email": "info@movingasap.ca",
    "website": "http://movingasap.ca/",
    "address": "98 Merkley Square, Scarborough, ON M1G 2Y7, Canada",
    "neighborhood": "Scarborough",
    "category": "Moving and storage service",
    "rating": 4.9,
    "reviews": 121,
    "facebook": "https://www.facebook.com/movingasap.ca",
    "linkedin": "",
    "instagram": "https://instagram.com/moving_asap",
    "twitter": "https://x.com/moving_asap",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Moving%20ASAP&query_place_id=ChIJ8baC9v7R1IkRYMQMptZdLAk",
    "placeId": "ChIJ8baC9v7R1IkRYMQMptZdLAk"
  },
  {
    "name": "A-Z Moving",
    "phone": "+1 647-878-6683",
    "email": "contact@az-moving.com",
    "website": "https://az-moving.com/",
    "address": "25 Parkway Forest Dr, North York, ON M2J 1L4, Canada",
    "neighborhood": "North York",
    "category": "Moving and storage service",
    "rating": 4.9,
    "reviews": 116,
    "facebook": "https://www.facebook.com/azmovinginc",
    "linkedin": "https://www.linkedin.com/company/75476048",
    "instagram": "https://www.instagram.com/az_moving",
    "twitter": "",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=A-Z%20Moving&query_place_id=ChIJ-bIvYo_T1IkR1aWGmh7uTr8",
    "placeId": "ChIJ-bIvYo_T1IkR1aWGmh7uTr8"
  },
  {
    "name": "Shuttle Moving Company",
    "phone": "+1 647-704-9249",
    "email": "shuttlemoving@gmail.com",
    "website": "https://shuttlemoving.com/",
    "address": "4590 Dufferin St, North York, ON M3H 5S4, Canada",
    "neighborhood": "North York",
    "category": "Moving and storage service",
    "rating": 5,
    "reviews": 109,
    "facebook": "",
    "linkedin": "",
    "instagram": "https://www.instagram.com/shuttlemoving",
    "twitter": "",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Shuttle%20Moving%20Company&query_place_id=ChIJLTzQYMktK4gRjHIwlujwRII",
    "placeId": "ChIJLTzQYMktK4gRjHIwlujwRII"
  },
  {
    "name": "Bravos Moving",
    "phone": "+1 437-385-7254",
    "email": "info@bravosmoving.com",
    "website": "https://bravosmoving.com/",
    "address": "4915 Bathurst St Suite 223, North York, ON M2R 1X8, Canada",
    "neighborhood": "North York",
    "category": "Moving and storage service",
    "rating": 4.8,
    "reviews": 106,
    "facebook": "https://www.facebook.com/bravosmoving",
    "linkedin": "",
    "instagram": "https://instagram.com/bravosmoving",
    "twitter": "",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Bravos%20Moving&query_place_id=ChIJ8wIQMzgtK4gRfvwcRp1F9yI",
    "placeId": "ChIJ8wIQMzgtK4gRfvwcRp1F9yI"
  },
  {
    "name": "T&M Movers Canada",
    "phone": "+1 416-726-7115",
    "email": "tmmoverscanadainc@gmail.com; totmmoverscanadainc@gmail.com",
    "website": "https://www.tmmoverscanada.ca/",
    "address": "1050 Markham Rd #1606, Scarborough, ON M1H 2Y7, Canada",
    "neighborhood": "Scarborough",
    "category": "Mover",
    "rating": 4.5,
    "reviews": 105,
    "facebook": "https://www.facebook.com/TMMoversofficial",
    "linkedin": "",
    "instagram": "",
    "twitter": "",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=T%26M%20MOVERS%20CANADA%20INC&query_place_id=ChIJ13H89YvR1IkRwleEVnLROAY",
    "placeId": "ChIJ13H89YvR1IkRwleEVnLROAY"
  },
  {
    "name": "Sheffield Moving & Storage",
    "phone": "+1 416-291-1200",
    "email": "info@sheffieldmoving.com",
    "website": "https://sheffieldmoving.com/",
    "address": "4069 Gordon Baker Rd Suite 1, Scarborough, ON M1W 2P3, Canada",
    "neighborhood": "Scarborough",
    "category": "Moving and storage service",
    "rating": 4.5,
    "reviews": 100,
    "facebook": "",
    "linkedin": "https://www.linkedin.com/company/sheffieldmoving",
    "instagram": "https://www.instagram.com/sheffieldmoving",
    "twitter": "https://twitter.com/SheffieldMoving",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Sheffield%20Moving%20and%20Storage%20Inc.&query_place_id=ChIJq6pqBHbT1IkReVs_Ik1mroQ",
    "placeId": "ChIJq6pqBHbT1IkReVs_Ik1mroQ"
  }
];

function toSlug(str) {
  return str.toLowerCase()
    .replace(/['’\.]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `brand-${Date.now()}`;
}

const profilesDir = path.join(process.cwd(), 'profiles');
if (!fs.existsSync(profilesDir)) fs.mkdirSync(profilesDir, { recursive: true });

const finalizedProfiles = [];

console.log(`\n═══════════════════════════════════════════════════════════════════════════════`);
console.log(`🛸 PRO MAX FLEET PREPARATION: INGESTING & EXTRACTING 6 TARGET BRANDS`);
console.log(`═══════════════════════════════════════════════════════════════════════════════\n`);

for (const target of fleetTargets) {
  const slug = toSlug(target.name);
  const profilePath = path.join(profilesDir, `${slug}.json`);
  console.log(`\n─────────────────────────────────────────────────────────────`);
  console.log(`⚙️  Step 1 Extraction: [${target.name}] (${target.website})`);
  console.log(`─────────────────────────────────────────────────────────────`);

  try {
    execSync(`node scripts/extract_brand.cjs ${target.website} profiles/${slug}.json`, {
      stdio: 'inherit'
    });
  } catch (err) {
    console.log(`⚠️ Automated DOM extraction reached timeout or HTTP shield on ${target.website}. Generating synthetic baseline...`);
  }

  let profile = {};
  if (fs.existsSync(profilePath)) {
    try {
      profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    } catch (e) {}
  }

  // Overlay authoritative directory coordinates from user input
  profile.name = target.name;
  profile.legalName = target.name + (target.name.toLowerCase().includes('inc') ? '' : ' Inc.');
  profile.shortName = target.name.split(' ')[0];
  profile.slug = slug;
  profile.domain = new URL(target.website).hostname.replace(/^www\./, '');
  profile.websiteUrl = target.website;
  profile.phone = target.phone;
  profile.phoneRaw = target.phone.replace(/[^0-9]/g, '');
  profile.email = target.email.split(';')[0].trim();
  profile.hqAddress = `${target.address} (${target.neighborhood})`;
  profile.logoSymbol = target.name.charAt(0).toUpperCase();
  profile.rating = target.rating;
  profile.reviewCount = target.reviews;
  profile.googleMapsUrl = target.googleMapsUrl;
  
  if (!profile.social) profile.social = {};
  if (target.facebook) profile.social.facebook = target.facebook;
  if (target.instagram) profile.social.instagram = target.instagram;
  if (target.linkedin) profile.social.linkedin = target.linkedin;
  if (target.twitter) profile.social.twitter = target.twitter;

  if (!profile.theme) {
    profile.theme = { primary: 'blue', secondary: 'amber', tertiary: 'emerald' };
  }
  if (!profile.layout) {
    profile.layout = { variants: {}, sectionsEnabled: {} };
  }
  if (!profile.brandVibes) {
    profile.brandVibes = {
      architecture: "Content-Dense Classic",
      chromaticIntensity: "Vibrant HSL Triad",
      improvementCategory: "UI/UX Pro Max Upgrade — High-Contrast Glassmorphic & Neomorphic Conversion Console"
    };
  }

  fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), 'utf8');
  console.log(`✅ Finalized Profile Saved -> profiles/${slug}.json`);
  finalizedProfiles.push(profile);
}

const masterManifestPath = path.join(process.cwd(), 'targets-6-fleet.json');
fs.writeFileSync(masterManifestPath, JSON.stringify(finalizedProfiles, null, 2), 'utf8');
console.log(`\n═══════════════════════════════════════════════════════════════════════════════`);
console.log(`🎉 ALL 6 TARGET PROFILES GENERATED! MASTER FLEET MANIFEST SAVED TO: targets-6-fleet.json`);
console.log(`═══════════════════════════════════════════════════════════════════════════════`);
