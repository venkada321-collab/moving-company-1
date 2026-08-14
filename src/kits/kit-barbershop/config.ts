import { LAYOUT, BRAND, GEO } from '../../config';

export const NicheConfig = {
  getNavLinks: () => {
    const rawLinks: Record<string, { id: string; label: string; enabled: boolean }> = {
      'hero_lead_capture': { id: 'hero_lead_capture', label: 'Book Appointment', enabled: true },
      'core_services': { id: 'core_services', label: 'Services', enabled: (LAYOUT.sectionsEnabled as any).core_services !== false },
      'team_roster': { id: 'team_roster', label: 'Our Barbers', enabled: (LAYOUT.sectionsEnabled as any).team_roster !== false },
      'lookbook_gallery': { id: 'lookbook_gallery', label: 'Gallery', enabled: (LAYOUT.sectionsEnabled as any).lookbook_gallery !== false },
      'vip_membership': { id: 'vip_membership', label: 'VIP', enabled: (LAYOUT.sectionsEnabled as any).vip_membership !== false },
      'location_hours': { id: 'location_hours', label: 'Location', enabled: (LAYOUT.sectionsEnabled as any).location_hours !== false },
      'trust_signals': { id: 'trust_signals', label: 'Reviews', enabled: (LAYOUT.sectionsEnabled as any).trust_signals !== false },
      'contact_conversion': { id: 'contact_conversion', label: 'Contact', enabled: (LAYOUT.sectionsEnabled as any).contact_conversion !== false },
    };

    const orderedLinks = [];
    const order = LAYOUT.sectionOrder && LAYOUT.sectionOrder.length > 0 ? LAYOUT.sectionOrder : Object.keys(rawLinks);
    
    for (const sectionId of order) {
      if (rawLinks[sectionId] && rawLinks[sectionId].enabled) {
        orderedLinks.push({ id: rawLinks[sectionId].id, label: rawLinks[sectionId].label });
      }
    }

    return orderedLinks;
  }
};
