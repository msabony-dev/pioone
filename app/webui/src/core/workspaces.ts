export type Scope = 'personal' | 'organization' | 'department' | 'team' | 'group';
export const organizations: Record<string,string[]> = {'PioVation Demo':['PioVation GmbH','PioVation Services Demo'],'Customer Demo':['Customer GmbH','Customer Services Demo']};
export function storagePrefix(tenant:string, organization:string) { return `pio19-${encodeURIComponent(tenant)}-${encodeURIComponent(organization)}-`; }
export function resetDemo() { Object.keys(localStorage).filter(key=>key.startsWith('pio19-')).forEach(key=>localStorage.removeItem(key)); location.reload(); }
