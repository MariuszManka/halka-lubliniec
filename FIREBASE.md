# Firebase Hosting

Projekt jest eksportowany przez Next.js do statycznego katalogu `out/`. Podczas każdego builda strony `/dolacz/` i `/zapros-halke/` pobierają opublikowany content z Sanity. Push na branch `firebase` uruchamia GitHub Actions i publikuje wynik w Firebase Hosting.

Ten wariant korzysta z klasycznego Firebase Hosting, dzięki czemu może działać na planie Spark bez karty. Firebase App Hosting nie jest tu używany, ponieważ wymaga planu Blaze.

## 1. Utwórz projekt i Hosting

1. Utwórz projekt w [Firebase Console](https://console.firebase.google.com/).
2. Włącz **Build > Hosting** i przejdź przez ekran startowy.
3. Zanotuj identyfikator projektu Firebase, np. `halka-lubliniec`.

## 2. Dodaj zmienne GitHub Actions

W repozytorium GitHub otwórz **Settings > Secrets and variables > Actions > Variables** i dodaj:

- `FIREBASE_PROJECT_ID` — identyfikator projektu Firebase,
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — identyfikator projektu Sanity,
- `NEXT_PUBLIC_SANITY_DATASET` — zwykle `production`,
- `NEXT_PUBLIC_SANITY_API_VERSION` — `2026-08-26`.

Dataset Sanity musi być publiczny. Jeżeli jest prywatny, pobieranie wymaga dodatkowego tokenu i odpowiedniej zmiany w `sanity/content.ts`.

## 3. Połącz GitHub z Firebase

Zaloguj Firebase CLI i uruchom w katalogu projektu:

```bash
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools init hosting:github
```

Wybierz istniejący projekt Firebase oraz repozytorium `MariuszManka/halka-lubliniec`. CLI utworzy konto serwisowe, sekret GitHub i przykładowy workflow. W wygenerowanym pliku odczytaj nazwę sekretu z wiersza podobnego do:

```yaml
firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_NAZWA_PROJEKTU }}
```

Workflow `.github/workflows/firebase-hosting.yml` korzysta z wygenerowanego sekretu `FIREBASE_SERVICE_ACCOUNT_HALKA_LUBLINIEC`.

Jeżeli CLI utworzy własne pliki workflow, można je usunąć — projekt ma już jeden workflow produkcyjny. Nie commituj pliku JSON konta serwisowego.

## 4. Pierwszy deployment

Push na branch `firebase` uruchomi build i deployment. Można też wejść w **Actions > Build and deploy to Firebase Hosting > Run workflow**.

Build celowo zakończy się błędem, jeśli brakuje identyfikatora Sanity albo Sanity nie zwróci opublikowanych dokumentów. Zapobiega to przypadkowemu wdrożeniu treści zastępczej.

## 5. Domena halkalubliniec.pl

Po udanym wdrożeniu przejdź do **Firebase Console > Hosting > Add custom domain**:

1. Dodaj `halkalubliniec.pl`.
2. Wprowadź u operatora domeny rekordy DNS pokazane przez kreator Firebase.
3. Dodaj również `www.halkalubliniec.pl` i ustaw przekierowanie na domenę główną.
4. Usuń kolidujące rekordy A/AAAA/CNAME wskazujące poprzedni hosting, ale dopiero zgodnie z instrukcjami kreatora migracji Firebase.

Firebase automatycznie wystawi i będzie odnawiać certyfikat SSL. Propagacja DNS i uruchomienie certyfikatu mogą potrwać do 24 godzin.

## Lokalne sprawdzenie produkcyjnego eksportu

Ustaw zmienne z `.env.example`, a następnie uruchom:

```bash
npm ci
npm run build
npx firebase-tools emulators:start --only hosting
```
