import { getCliClient } from 'sanity/cli';
import { homeContactDefaults } from '../content/home-contact';

const client = getCliClient({ apiVersion: '2026-08-26' });
// Add fields without replacing existing copy or editorial changes.
for (const id of ['homePage', 'drafts.homePage']) {
  const doc = await client.getDocument(id);
  if (!doc) {
    if (id === 'homePage') throw new Error('Brak dokumentu homePage.');
    continue;
  }
  const fields = Object.fromEntries(Object.entries(homeContactDefaults).map(([key, value]) => [
    `contact.${key}`, Array.isArray(value) ? value.map(phone => ({ _type: 'contactPhone', ...phone })) : value,
  ]));
  await client.patch(id).ifRevisionId(doc._rev).setIfMissing({ contact: {} }).setIfMissing(fields).commit();
  console.log(`Uzupełniono Kontakt: ${id}`);
}
