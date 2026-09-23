# Zespół Pieśni i Tańca „Halka”

Strona wizytówkowa i cyfrowa kronika zespołu z Lublińca. Projekt korzysta z Next.js/Vinext, a treści redakcyjne i galerie są obsługiwane przez Sanity.

## Galeria w Sanity

Panel treści zawiera dokument **Teksty galerii** oraz kolekcję **Galerie**. W nowej galerii pierwsze zdjęcie jest okładką, a kolejność zdjęć można zmieniać przeciąganiem. Każde zdjęcie ma wymagany opis alternatywny i opcjonalny podpis widoczny w powiększeniu.

```bash
npm run cms:dev
```

Jednorazowy import obecnej lokalnej galerii wykonuje `npm run cms:migrate:gallery`. Skrypt nie nadpisuje wpisów, które już istnieją w Sanity.

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

## Wydarzenia z Google Calendar

Strona pobiera wydarzenia podczas builda z osobnego publicznego kalendarza
Google „HALKA - WYDARZENIA”. Jego publiczny adres iCal jest już ustawiony w
integracji. Jeśli źródło jest chwilowo niedostępne, lokalny build korzysta z
danych awaryjnych z `content/events.ts`.

Instrukcja dla osób dodających wydarzenia znajduje się w pliku
`INSTRUKCJA-KALENDARZ-DLA-SOCIAL-MEDIA.md`.

1. W Google Calendar otwórz na komputerze **Ustawienia i udostępnianie** dla
   kalendarza „HALKA - WYDARZENIA”.
2. W sekcji **Uprawnienia dostępu do wydarzeń** włącz publiczne wyświetlanie
   pełnych szczegółów. Nie rób tego dla głównego kalendarza konta.
3. W sekcji **Integracja kalendarza** skopiuj **Adres publiczny w formacie iCal**.
4. Opcjonalnie możesz nadpisać adres lokalnie w `.env.local` przez
   `GOOGLE_CALENDAR_ICAL_URL` albo zmienną o tej nazwie w GitHubie.
5. Opcjonalnie ustaw `GOOGLE_CALENDAR_REQUIRED=true`, aby wdrożenie przerwało
   się przy błędzie pobierania zamiast użyć danych awaryjnych.

Standardowe pola wydarzenia są mapowane automatycznie: nazwa, początek, koniec
i miejsce. W opisie można dodać dwie opcjonalne linie sterujące (nie są
wyświetlane jako notatka):

```text
Typ: Występ
Grupy: zespół, dzieci, chór, balet
Mapa: https://maps.app.goo.gl/...

Pozostała część opisu pojawi się na stronie jako notatka.
```

Pole `Miejsce` z Google Calendar jest wyświetlane jako link do wyszukiwania tej
lokalizacji w Google Maps. Ogólna lokalizacja, np. samo `Lubliniec`, otworzy
wyszukiwanie miasta. Jeśli w opisie podasz poprawny adres Google Maps w linii
`Mapa:`, integracja użyje właśnie tego dokładnego odnośnika.

Dozwolone typy to `Występ`, `Próba`, `Warsztaty`, `Konkursy`, `Spotkanie` i `Inne`.
Jeśli typu nie podasz, integracja spróbuje rozpoznać go z nazwy, a w
pozostałych przypadkach przyjmie `Inne`.
Jeśli nie podasz grupy i nie da się jej rozpoznać z nazwy, przyjmie `zespół`.
Wszystkie typy wydarzeń, w tym próby, pochodzą z Google Calendar. Wpisy
oznaczone w Google jako `Prywatne` albo `Poufne` są dodatkowo odrzucane podczas
builda. Dane z `content/events.ts` służą wyłącznie jako fallback, gdy Google
Calendar chwilowo nie działa.

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
