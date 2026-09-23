# Jak dodawać wydarzenia na stronę Halki

Ta instrukcja dotyczy kalendarza Google **„HALKA - WYDARZENIA”** na koncie
`kalendarz@halkalubliniec.pl`. Wydarzenia z tego kalendarza trafiają na stronę
Halki po jej kolejnym zbudowaniu i opublikowaniu.

## Najważniejsza zasada prywatności

Kalendarz **„HALKA - WYDARZENIA” jest publiczny**. Dodajemy do niego wyłącznie
informacje, które mogą zobaczyć wszyscy: próby, występy, otwarte warsztaty,
publiczne spotkania i inne ogólnodostępne terminy.

Spotkań zarządu, rozmów organizacyjnych, danych kontaktowych, linków do rozmów,
numerów telefonów, list uczestników ani innych informacji wewnętrznych **nie
dodajemy do tego kalendarza**. Takie wydarzenie należy utworzyć w prywatnym
kalendarzu konta lub innym kalendarzu wewnętrznym. Ustawienie wydarzenia jako
„Prywatne” stanowi dodatkowe zabezpieczenie, ale nie zastępuje wyboru właściwego
kalendarza.

## Dodawanie wydarzenia krok po kroku

1. Otwórz Kalendarz Google na koncie `kalendarz@halkalubliniec.pl`.
2. Kliknij **Utwórz** lub wybierz dzień i godzinę w kalendarzu.
3. Wpisz czytelną nazwę wydarzenia, np. „Koncert kolęd w Lublińcu”.
4. Sprawdź pole **Kalendarz** i wybierz **„HALKA - WYDARZENIA”**. To
   najważniejszy krok — bez niego termin nie trafi na stronę.
5. Ustaw właściwą datę oraz godzinę rozpoczęcia i zakończenia.
6. Uzupełnij pole **Miejsce**.
7. W polu **Opis** dodaj linie sterujące według wzoru poniżej. Pod nimi możesz
   dopisać zwykły, publiczny opis wydarzenia.
8. Kliknij **Zapisz**.

## Co wpisujemy w poszczególnych polach

### Nazwa wydarzenia

Nazwa jest głównym tytułem widocznym na stronie. Powinna być krótka i zrozumiała
bez dodatkowego kontekstu.

Dobre przykłady:

- `Koncert kolęd w Lublińcu`
- `Występ na dożynkach w Pawełkach`
- `Próba grupy wokalnej`
- `Warsztaty taneczne dla dzieci`

### Data i godzina

Podaj godzinę rozpoczęcia i zakończenia. Jeśli wydarzenie trwa cały dzień, użyj
opcji **Cały dzień**. Strona przelicza godziny według strefy Europe/Warsaw.

### Miejsce

Wpisz nazwę obiektu i możliwie dokładny adres, np.:

`Miejski Dom Kultury, ul. Plebiscytowa 9, Lubliniec`

Miejsce będzie na stronie linkiem do Google Maps. Jeśli znamy tylko miejscowość,
można wpisać samo `Lubliniec` — link otworzy wyszukiwanie tej miejscowości.

Jeżeli Google Maps wskazuje niewłaściwy punkt, skopiuj właściwy link z Google
Maps i dodaj go w opisie w osobnej linii:

`Mapa: https://maps.app.goo.gl/...`

### Opis i linie sterujące

Na początku opisu najlepiej zawsze podać typ wydarzenia i uczestniczące grupy:

```text
Typ: Występ
Grupy: zespół, dzieci, chór, balet
Mapa: https://maps.app.goo.gl/...

Krótki publiczny opis wydarzenia można wpisać tutaj.
```

Linie `Typ:`, `Grupy:` i `Mapa:` służą stronie do uporządkowania danych i same
nie są wyświetlane jako część opisu. Linia `Mapa:` jest opcjonalna. Pozostała
treść opisu może pojawić się na stronie, dlatego nie wpisujemy tam informacji
wewnętrznych.

## Dostępne typy wydarzeń

W linii `Typ:` używamy jednej z pięciu wartości:

- `Typ: Występ` — koncerty, festiwale, dożynki, gale i pokazy;
- `Typ: Próba` — próby wszystkich grup;
- `Typ: Warsztaty` — warsztaty i zajęcia specjalne;
- `Typ: Konkurs` — konkursy i różnego rodzaju przeglądy;
- `Typ: Spotkanie` — wyłącznie spotkania, które mają być publicznie widoczne;
- `Typ: Inne` — publiczne wydarzenia, które nie pasują do pozostałych typów.

Strona potrafi rozpoznać część typów z nazwy, ale wpisanie linii `Typ:` jest
najpewniejsze i zapobiega pomyłkom.

## Dostępne grupy

W linii `Grupy:` można podać jedną lub kilka wartości, oddzielając je
przecinkami:

- `zespół` — cały zespół lub wydarzenie ogólne;
- `dzieci` — grupy dziecięce;
- `chór` — grupa wokalna;
- `balet` — grupa taneczna.

Przykłady:

```text
Grupy: chór
```

```text
Grupy: dzieci, chór, balet
```

Jeśli linia `Grupy:` zostanie pominięta i strona nie rozpozna grupy z nazwy,
wydarzenie zostanie przypisane do całego zespołu.

## Próby i wydarzenia cykliczne

Stałe próby najlepiej tworzyć jako wydarzenia cykliczne:

1. Utwórz pierwszą próbę z właściwą godziną i miejscem.
2. Ustaw powtarzanie, np. **co tydzień w środę**.
3. Dodaj w opisie `Typ: Próba` oraz właściwą grupę.
4. Zapisz serię w kalendarzu **„HALKA - WYDARZENIA”**.

Gdy jedna próba się nie odbywa, usuń tylko ten konkretny termin. Google zapyta,
czy zmiana dotyczy:

- **Tylko tego wydarzenia** — wybierz tę opcję przy jednorazowym odwołaniu;
- **Tego i kolejnych wydarzeń** — wybierz przy trwałej zmianie planu od danego
  dnia;
- **Wszystkich wydarzeń** — wybierz tylko wtedy, gdy chcesz zmienić lub usunąć
  całą serię.

Po kolejnym buildzie usunięta pojedyncza próba zniknie również z terminarza na
stronie.

## Zmiana lub odwołanie wydarzenia

- Poprawiona data, godzina, nazwa lub miejsce pojawią się po kolejnym buildzie.
- Usunięte wydarzenie zniknie ze strony po kolejnym buildzie.
- Przy wydarzeniu cyklicznym uważnie wybierz zakres zmiany: jeden termin, ten i
  kolejne albo cała seria.
- Nie twórz drugiego wydarzenia zamiast poprawienia istniejącego, ponieważ przez
  pewien czas na stronie mogą pojawić się dwa terminy.

## Kiedy zmiana pojawi się na stronie

Kalendarz nie aktualizuje strony natychmiast. Dane są pobierane podczas builda.
Po dodaniu lub poprawieniu wydarzenia trzeba uruchomić publikację strony albo
zgłosić to osobie, która ją uruchamia. Ostatnia zapisana wersja kalendarza
pojawi się wtedy automatycznie.

## Gotowe szablony

### Występ

```text
Typ: Występ
Grupy: zespół

Krótki opis dla odbiorców strony.
```

### Próba dzieci

```text
Typ: Próba
Grupy: dzieci
```

### Próba wokalna

```text
Typ: Próba
Grupy: chór
```

### Próba taneczna

```text
Typ: Próba
Grupy: balet
```

### Warsztaty

```text
Typ: Warsztaty
Grupy: dzieci, chór, balet

Krótki publiczny opis warsztatów.
```

## Lista kontrolna przed zapisaniem

- Czy wybrany jest kalendarz **„HALKA - WYDARZENIA”**?
- Czy wydarzenie i cały jego opis mogą być publiczne?
- Czy data oraz godzina rozpoczęcia i zakończenia są poprawne?
- Czy pole **Miejsce** jest uzupełnione?
- Czy w opisie znajduje się właściwy `Typ:`?
- Czy w opisie znajdują się właściwe `Grupy:`?
- Czy przy wydarzeniu cyklicznym wybrano odpowiedni zakres zmian?
- Czy po zapisaniu ktoś uruchomi build i publikację strony?
