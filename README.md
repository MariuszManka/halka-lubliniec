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

## Publikacja strony

Po zalogowaniu w lokalnej aplikacji Codex mozesz opublikowac aktualny stan strony bez pisania tutaj na czacie:

```bash
npm run deploy
```

Domyslnie publikuje to wersje testowa podpieta pod `D:\HALKA\site\.openai\hosting.json`.

Masz tez dwa jawne warianty:

```bash
npm run deploy:preview
npm run deploy:production
```

`deploy:production` przelacza najpierw aktywny hosting na `D:\HALKA\site\.openai\hosting.production.json`, buduje projekt i potem uruchamia publikacje przez lokalnego Codexa.

Jesli komenda przerwie sie od razu, najczesciej oznacza to brak zalogowania w aplikacji Codex albo problem z uprawnieniami do publikacji.

## Dodawanie koncertu do kroniki

1. W katalogu `D:\HALKA\ASSETS` utwórz folder o nazwie np. `2027.06.15 - Halka - Opole`.
2. Wklej do niego zdjęcia JPG, PNG, WEBP lub HEIC.
3. Uruchom w tym projekcie:

```bash
npm run gallery:sync
```

Skrypt wybierze reprezentatywny zestaw zdjęć, zoptymalizuje je do formatu WEBP, dopisze wydarzenie do strony i automatycznie doda brakujący domyślny wpis do `content/gallery.config.json`. Opis, tytuł lub ręczny wybór konkretnych zdjęć możesz potem nadpisać w tym pliku.

## Zdjęcia z sesji

Lista fotografii z folderu `ASSETS/Sesja zdjęciowa` znajduje się w `content/session.config.json`. Skrypt automatycznie dopisuje tam także brakujące domyślne wpisy dla nowych zdjęć spoza folderu `do użycia`. Po zmianie listy uruchom:

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

## Dodawanie wydarzenia do kalendarza

Wydarzenia i próby są zapisane w `content/events.ts`. Aby dodać kolejne:

1. Skopiuj jeden obiekt z listy `calendarEvents`.
2. Ustaw unikalne `id`, datę w formacie `RRRR-MM-DD`, tytuł i lokalizację.
3. Dodaj godzinę w polu `time`, jeśli jest znana.
4. W polu `groups` wpisz jedną lub kilka grup: `ensemble`, `children`, `choir` albo `ballet`.

Kalendarz sam utworzy nowy miesiąc, umieści wydarzenie w odpowiednim dniu i dobierze kolor grupy. Dla wydarzenia kilkudniowego dodaj `endDate`.

## Najważniejsze pliki

- `app/HalkaSite.tsx` — układ i zachowanie strony,
- `app/globals.css` — kolory, typografia, animacje i widok mobilny,
- `content/site-content.ts` — treść stała,
- `content/events.ts` — wydarzenia, próby i grupy widoczne w kalendarzu,
- `content/gallery.config.json` — ustawienia wydarzeń w kronice,
- `content/session.config.json` — wybór zdjęć z sesji,
- `scripts/` — automatyczne przygotowanie zdjęć.
