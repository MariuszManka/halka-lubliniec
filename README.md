# Zespół Pieśni i Tańca „Halka”

Strona wizytówkowa i cyfrowa kronika zespołu z Lublińca. Projekt korzysta z Next.js/Vinext i przechowuje treści w prostych plikach, bez panelu administracyjnego i bazy danych.

## Uruchomienie

Wymagany jest Node.js 22 lub nowszy.

```bash
npm install
npm run dev
```

Sprawdzenie wersji produkcyjnej:

```bash
npm run build
```

## Dodawanie koncertu do kroniki

1. W katalogu `D:\HALKA\ASSETS` utwórz folder o nazwie np. `2027.06.15 - Halka - Opole`.
2. Wklej do niego zdjęcia JPG, PNG, WEBP lub HEIC.
3. Uruchom w tym projekcie:

```bash
npm run gallery:sync
```

Skrypt wybierze reprezentatywny zestaw zdjęć, zoptymalizuje je do formatu WEBP i dopisze wydarzenie do strony. Opis, tytuł lub ręczny wybór konkretnych zdjęć można ustawić w `content/gallery.config.json`.

## Zdjęcia z sesji

Lista wybranych fotografii z folderu `ASSETS/Sesja zdjęciowa` znajduje się w `content/session.config.json`. Po zmianie listy uruchom:

```bash
npm run session:sync
```

Polecenie `npm run media:sync` odświeża jednocześnie kronikę koncertów i sesję zdjęciową. Jest też wykonywane automatycznie przed każdym buildem.

## Edycja treści

Najczęściej zmieniane dane są w `content/site-content.ts`:

- kalendarz i próby,
- historia oraz oś czasu,
- statystyki zespołu,
- dane kontaktowe i adres,
- odnośniki nawigacji.

Formularz kontaktowy otwiera wiadomość do adresu wpisanego w tym pliku. Bez dodatkowego serwera pocztowego nie wysyła danych bezpośrednio z przeglądarki.

## Najważniejsze pliki

- `app/HalkaSite.tsx` — układ i zachowanie strony,
- `app/globals.css` — kolory, typografia, animacje i widok mobilny,
- `content/site-content.ts` — treść stała,
- `content/gallery.config.json` — ustawienia wydarzeń w kronice,
- `content/session.config.json` — wybór zdjęć z sesji,
- `scripts/` — automatyczne przygotowanie zdjęć.
