import { LAYOUT, BRAND, GEO } from '../../config';

export const NicheConfig = {
  getNavLinks: () => {
    const rawLinks: Record<string, { id: string; label: string; enabled: boolean }> = {
      'hero_lead_capture': { id: 'hero_lead_capture', label: 'Rate Calculator', enabled: true },
      'core_services': { id: 'core_services', label: 'Relocation Services', enabled: LAYOUT.sectionsEnabled.core_services },
      'service_areas': { id: 'service_areas', label: `${GEO.regionName} Network`, enabled: LAYOUT.sectionsEnabled.service_areas },
      'how_it_works': { id: 'how_it_works', label: 'Our Protocol', enabled: LAYOUT.sectionsEnabled.how_it_works },
      'supplemental_services': { id: 'supplemental_services', label: 'Vault Storage', enabled: LAYOUT.sectionsEnabled.supplemental_services },
      'trust_signals': { id: 'trust_signals', label: 'Reviews', enabled: LAYOUT.sectionsEnabled.trust_signals },
      'referral_program': { id: 'referral_program', label: `Refer Rewards (${BRAND.referralGetAmount})`, enabled: LAYOUT.sectionsEnabled.referral_program },
      'blog_page': { id: 'blog', label: 'Resources', enabled: LAYOUT.sectionsEnabled.blog_page },
    };

    const orderedLinks = [];
    
    // Iterate based on LAYOUT.sectionOrder to maintain navigation order
    for (const sectionId of LAYOUT.sectionOrder) {
      if (rawLinks[sectionId] && rawLinks[sectionId].enabled) {
        orderedLinks.push({ id: rawLinks[sectionId].id, label: rawLinks[sectionId].label });
      }
    }

    return orderedLinks;
  }
};
