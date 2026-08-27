---
name: "Halka Lubliniec"
description: "Scena Pokoleń: ciepły, folkowy system wizualny łączący autentyczność zespołu z profesjonalną prezentacją sceniczną."
colors:
  ink: "#123b2a"
  halka-green: "#145f3d"
  halka-green-deep: "#0c452d"
  coral-red: "#d52b2f"
  coral-red-deep: "#ad1d25"
  cream-fabric: "#f8f5ee"
  warm-surface: "#fffdf8"
  muted-green: "#4d6759"
  soft-line: "rgba(18, 59, 42, 0.16)"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.5rem, 5.7vw, 6rem)"
    fontWeight: 470
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 4rem)"
    fontWeight: 520
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.45rem, 2.3vw, 2.35rem)"
    fontWeight: 560
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.73rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.11em"
rounded:
  image-sm: "10px"
  image-md: "14px"
  card: "18px"
  panel: "20px"
  surface: "22px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "36px"
  section: "clamp(104px, 11vw, 168px)"
components:
  button-primary:
    backgroundColor: "{colors.coral-red}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 23px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.coral-red-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.halka-green-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 23px"
    height: "52px"
  event-panel:
    backgroundColor: "{colors.warm-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "36px"
  gallery-card:
    backgroundColor: "#111813"
    textColor: "#ffffff"
    rounded: "0px"
---

# Design System: Halka Lubliniec

## Overview

**Creative North Star: "Scena Pokoleń"**

System wizualny przedstawia Halkę jako żywą wspólnotę, która ma historię, ale nadal pracuje, występuje i zaprasza kolejne osoby na scenę. Fotografia jest głównym nośnikiem autentyczności, a duża typografia nadaje jej profesjonalną, współczesną oprawę. Motywy folkowe pełnią rolę rozpoznawalnego podpisu, nie dekoracyjnej warstwy dodawanej do każdego elementu.

Całość jest folkowa, autentyczna, ciepła i międzypokoleniowa. Jasne powierzchnie tworzą spokojne tło dla nasyconych zdjęć, zieleni i czerwieni. System świadomie unika muzealnej sztywności, instytucjonalnego monumentalizmu, jarmarcznego przeładowania oraz generycznej estetyki startupowej.

**Key Characteristics:**

- Fotografia sceniczna i portretowa prowadzi narrację.
- Duża, miękka typografia display kontrastuje z precyzyjnymi etykietami sans-serif.
- Zieleń buduje tożsamość i zaufanie, a czerwień wyznacza działanie i akcent.
- Ornamenty wynikają z geometrii haftu, rozety, tkaniny i wstęgi.
- Ruch jest spokojny, ciągły i podporządkowany przewijaniu lub informacji zwrotnej.

## Colors

Paleta łączy głębokie, nasycone barwy strojów z jasnym, ciepłym tłem przypominającym tkaninę.

### Primary

- **Zieleń Halki:** podstawowy kolor marki, aktywnych linków, detali nawigacji, informacji kontaktowych i spokojnych elementów akcji.
- **Głęboka Zieleń Halki:** ciemniejsza odmiana dla mocnych przycisków, tekstu na jasnym tle i stanów wymagających większego kontrastu.

### Secondary

- **Czerwień Korali:** akcent działania, statusów, słów wyróżnionych w nagłówkach i krótkich elementów prowadzących wzrok.
- **Głęboka Czerwień Korali:** stan hover i bardziej skupiona odmiana akcentu.

### Neutral

- **Kremowa Tkanina:** główne tło strony, które pozwala fotografiom i ornamentom zachować nasycenie.
- **Ciepła Powierzchnia:** nieznacznie jaśniejsza warstwa dla paneli wydarzeń, kart informacyjnych, mapy i menu mobilnego.
- **Atramentowa Zieleń:** główny kolor tekstu zamiast neutralnej czerni.
- **Stonowana Zieleń:** tekst pomocniczy, podpisy, metadane i informacje drugoplanowe.
- **Miękka Linia:** delikatne separatory, obrysy i konstrukcja tabelarycznych układów.

**The Living Color Rule.** Zieleń i czerwień pozostają nasycone; nie należy zamieniać ich na pastelowe lub przygaszone odpowiedniki.

**The Red Leads Rule.** Czerwień wskazuje najważniejsze działanie lub pojedynczy akcent w danym obszarze. Nie zalewa całych sekcji bez wyraźnego powodu.

## Typography

**Display Font:** Fraunces (z Georgia jako fallback)

**Body Font:** DM Sans (z systemowym sans-serif jako fallback)

**Character:** Fraunces wnosi miękkość, historię i organiczny rytm kojarzący się z ruchem tkaniny. DM Sans utrzymuje współczesną czytelność nawigacji, opisów, danych i CTA. Para jest wyrazista, ale nie ceremonialna.

### Hierarchy

- **Display:** duże nagłówki hero i sekcji, zazwyczaj ograniczone do 9–12 znaków szerokości, z ciasnym światłem i balansem linii.
- **Headline:** tytuły galerii, kart fotograficznych i większych bloków narracyjnych.
- **Title:** nazwy wydarzeń, suit, grup i mniejszych modułów treści.
- **Body:** opisy o długości maksymalnie około 65 znaków w wierszu, prowadzone luźno i czytelnie.
- **Label:** krótkie etykiety, daty i kategorie pisane wersalikami z wyraźnym trackingiem.

**The Two Voices Rule.** Fraunces opowiada i buduje emocję; DM Sans wyjaśnia, porządkuje i prowadzi do działania. Nie należy odwracać tych ról.

**The Wide Headline Rule.** Nagłówki mogą być duże, lecz nie powinny rozpadać się na wiele krótkich, przypadkowych wierszy ani nachodzić na zdjęcia.

## Layout

Główna szerokość treści wynosi do 1320px, a nagłówek i hero mogą rozszerzać się do 1440px. Desktop wykorzystuje asymetryczne podziały, naprzemienne zestawienia tekstu i fotografii oraz siatki 12-kolumnowe dla bardziej ekspresyjnych układów. Sekcje oddziela duży, konsekwentny rytm pionowy.

Poniżej 1180px nawigacja przechodzi w menu mobilne, a rozbudowane siatki zaczynają się upraszczać. Poniżej 820px układy stają się jednokolumnowe, zachowując kolejność: przekaz, działanie, fotografia lub rozwinięcie. Poniżej 520px margines boczny zmniejsza się do 14px, CTA zajmują pełną szerokość, a galerie i mozaiki przechodzą w czytelne układy pionowe.

**The Full Person Rule.** Kadrowanie może być dynamiczne, ale nie może przypadkowo odcinać głów, kluczowych elementów stroju ani wspólnej choreografii.

**The Breathing Section Rule.** Pusta przestrzeń oddziela kolejne części narracji; tła i ornamenty nie zastępują rytmu pionowego.

## Elevation & Depth

Powierzchnie pozostają spokojne i przeważnie płaskie. Głębia pojawia się poprzez nakładanie fotografii, różnicę jasności powierzchni oraz miękkie, zabarwione zielenią cienie. Cienie służą przede wszystkim zdjęciom, modalom, mapie i elementom podnoszonym podczas interakcji. Nie są stałym obramowaniem każdej karty.

### Shadow Vocabulary

- **Ambient Panel:** miękki cień dla większych paneli, mapy i kontenerów wymagających odseparowania od tła.
- **Floating Photograph:** nieco bardziej skupiony cień dla nakładających się fotografii i detali galerii.
- **Modal Depth:** mocny, szeroki cień zarezerwowany dla lightboxów i dialogów nad przyciemnionym tłem.

**The Calm Surface Rule.** Elementy są płaskie w spoczynku. Mocniejsza głębia pojawia się tylko wtedy, gdy wyjaśnia warstwę, modal albo stan interakcji.

## Shapes

System łączy trzy rodziny form. Zdjęcia i główne panele używają miękkich narożników, zwykle od 14px do 22px. Przyciski i filtry są pełnymi pigułkami. Elementy hero, galerie kostiumów i wybrane kadry mogą korzystać z asymetrycznego wycięcia inspirowanego tkaniną, liściem lub ruchem spódnicy.

Obramowania są cienkie i zielonkawe. Rozety, romby oraz uproszczone linie haftu działają jako akcenty tła lub dzielniki, zawsze podporządkowane treści.

**The One Silhouette Rule.** Jeden obszar może mieć jeden charakterystyczny kształt. Nie należy mieszać kilku konkurujących wycięć, łuków i ornamentów w tym samym module.

## Components

Komponenty są lekkie i pewne siebie: spokojne powierzchnie, czytelne przyciski, zdecydowane CTA i ruch ograniczony do informacji zwrotnej.

### Buttons

- **Shape:** pełna pigułka o minimalnej wysokości 52px dla głównych CTA.
- **Primary:** Czerwień Korali z białym tekstem, mocną wagą DM Sans i poziomym paddingiem pozwalającym zachować pojedynczy wiersz.
- **Hover / Focus:** hover przyciemnia czerwień i podnosi element o 2px; focus musi mieć jednoznaczny, kontrastowy obrys.
- **Secondary:** przezroczyste tło, zielony obrys i tekst; hover wypełnia powierzchnię Głęboką Zielenią Halki.
- **Text link:** minimalna wysokość dotykowa 44px, wysoka waga oraz strzałka przesuwająca się poziomo na hover.

### Chips

- **Style:** filtry lat i statusy używają zwartej pigułki z jasnym tłem oraz zielonym tekstem.
- **State:** aktywny filtr wypełnia się zielenią i zachowuje wyraźny focus; elementy semantyczne nie używają przypadkowych kolorów dekoracyjnych.

### Cards / Containers

- **Corner Style:** panele informacyjne zwykle 18–22px; karty fotograficzne mogą pozostać ostre, jeśli tworzą jednolitą mozaikę.
- **Background:** Kremowa Tkanina dla strony, Ciepła Powierzchnia dla odseparowanych paneli.
- **Shadow Strategy:** cień jest ambientowy i używany selektywnie.
- **Border:** pojedyncza Miękka Linia porządkuje listy, harmonogramy i dane kontaktowe.
- **Internal Padding:** od 18px w małych kartach do 36px w większych panelach.

### Navigation

Desktopowa nawigacja jest jednorzędowa, lekka i wyśrodkowana, z CTA kontaktowym po prawej. Linki wykorzystują DM Sans o podwyższonej wadze i przechodzą na Czerwień Korali w stanie aktywnym lub hover. Poniżej 1180px menu przechodzi w dostępny przycisk 44px i jasny panel rozwijany.

### Photography Card

Fotografia wypełnia kartę i korzysta z lekkiego przybliżenia na hover. Gradient pojawia się wyłącznie tam, gdzie musi zapewnić kontrast metadanym i tytułowi. Tekst pozostaje w dolnej części kadru, a jego szerokość jest ograniczona, aby nie zasłaniał istotnych osób i stroju.

### Event Panel

Lista wydarzeń i stały plan korzystają z jasnej, nieprzezroczystej powierzchni. Linie i kolumny budują czytelność, a Czerwień Korali oznacza daty oraz statusy. Na telefonie panel redukuje liczbę kolumn bez poziomego rozszerzania strony.

## Do's and Don'ts

### Do:

- **Do** używaj autentycznych zdjęć zespołu jako głównego materiału wizualnego.
- **Do** zestawiaj duże nagłówki Fraunces z konkretną informacją podaną w DM Sans.
- **Do** zachowuj Zieleń Halki, Czerwień Korali i Kremową Tkaninę jako główne role kolorystyczne.
- **Do** stosuj ornamenty folklorystyczne jako podpis, dzielnik lub element tła, z dala od tekstów i twarzy.
- **Do** zapewniaj widoczne CTA, focus klawiatury, pełne cele dotykowe oraz wariant ograniczonego ruchu.
- **Do** projektuj kadry osobno dla desktopu i telefonu, chroniąc twarze, stroje i choreografię.

### Don't:

- **Don't** zmieniaj nasyconej zieleni i czerwieni na pastelowe, przygaszone odpowiedniki.
- **Don't** buduj muzealnej, pomnikowej lub urzędowej atmosfery.
- **Don't** przeładowuj sekcji wieloma ornamentami, wzorami i kolorami jednocześnie.
- **Don't** używaj generycznych gradientów technologicznych, szkła, neonów ani estetyki startupowego dashboardu.
- **Don't** umieszczaj tekstu bezpośrednio na ruchliwym zdjęciu bez kontrolowanego kontrastu.
- **Don't** stosuj mocnego cienia do każdego panelu ani karty.
