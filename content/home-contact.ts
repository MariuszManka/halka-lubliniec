import { siteConfig } from './site-config';

export type ContactPhone = { _key: string; owner: string; number: string; enabled: boolean; primary: boolean };
export const homeContactDefaults = {
  email: siteConfig.contact.email as string,
  address: siteConfig.contact.address as string,
  mapUrl: siteConfig.contact.mapUrl as string,
  mapEmbedUrl: siteConfig.contact.mapEmbedUrl as string,
  messengerLabel: 'Napisz na Messengerze', messengerValue: 'zpit.halka',
  emailActionLabel: 'Otwórz pocztę', phoneActionLabel: 'Zadzwoń',
  messengerActionLabel: 'Otwórz czat', addressActionLabel: 'Pokaż trasę',
  facebook: siteConfig.social.facebook as string, instagram: siteConfig.social.instagram as string,
  youtube: siteConfig.social.youtube as string, messenger: siteConfig.social.messenger as string,
  associationName: siteConfig.association.name as string, krs: siteConfig.association.krs as string, nip: siteConfig.association.nip as string,
  phones: [
    { _key: 'mdk', owner: 'Miejski Dom Kultury w Lublińcu', number: '34 351 06 83', enabled: true, primary: true },
    { _key: 'andrzej-pluskota', owner: 'Andrzej Pluskota — wiceprezes Stowarzyszenia', number: '669 101 959', enabled: true, primary: false },
  ] as ContactPhone[],
};

export function phoneHref(number: string) {
  const digits = number.replace(/\D/g, '');
  return number.trim().startsWith('+') ? `+${digits}` : digits.length === 9 ? `+48${digits}` : `+${digits}`;
}

export function resolveContactPhones(phones: ContactPhone[]) {
  const enabled = phones.filter(phone => phone.enabled !== false && phone.number?.trim());
  return { enabled, primary: enabled.find(phone => phone.primary) ?? enabled[0] ?? null };
}
