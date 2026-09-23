export type HistoryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};
export type HistoryChapter = {
  id: string;
  years: string;
  label: string;
  title: string;
  paragraphs: string[];
  photos: HistoryPhoto[];
  layout?: "pair" | "wide" | "portrait";
  note?: { title: string; text: string };
  sourcePages: number[];
};
const photo = (file: string, width: number, height: number, alt: string, caption: string): HistoryPhoto => ({
  src: `/history/${file}.webp`, width, height, alt, caption,
});

// Source: ASSETS/wystawa.pdf. Dates follow the visually verified exhibition columns.
// These are local editorial contents, intentionally independent of Sanity.
export const openingPhoto = photo("wroclaw-1948", 1601, 899,
  "Tancerze Halki trzymający się za ręce podczas plenerowego występu we Wrocławiu",
  "Wrocław, 1948. Jeden z pierwszych występów Halki.");

export const historyChapters: HistoryChapter[] = [
  {
    id: "poczatki", years: "1948–1954", label: "Początki", title: "Najpierw byli ludzie",
    paragraphs: [
      "W 1948 roku w Lublińcu powstaje Halka. Za jej początkiem stoją Józef Kościelny i grono społeczników, których nazwiska zachowało zespołowe archiwum. Na najstarszych zdjęciach oglądamy już występy we Wrocławiu: pary w ludowych strojach, wspólny taniec i publiczność zgromadzoną wokół sceny.",
      "Zespół szybko staje się częścią miejscowego życia. W 1954 roku wystawia sztukę „Zbiegowie”, występuje na dożynkach powiatowych i podczas Dnia Górnika w kopalni „Barbara”. Jest też czas na wycieczkę do Świerklańca. Obok scenicznych występów od początku zapisują się zwyczajne chwile spędzane razem.",
    ],
    photos: [photo("pierwsza-fotografia-1954", 1601, 1084, "Członkowie Halki z instrumentami i Józefem Kościelnym na wspólnym zdjęciu", "1954. Pierwsze zdjęcie grupowe Halki, wykonane z okazji Święta Pracy; wśród członków Józef Kościelny.")],
    note: { title: "Ci, którzy dali początek", text: "Józef Kościelny, Leon Bartos, Paweł Ciba, Jan Drozdowski, Teofil Gałeczko, Leon Karolewski, Józef Lesik i Stanisław Owczarek." },
    sourcePages: [1, 12],
  },
  {
    id: "teatr", years: "1955–1958", label: "Muzyka i teatr", title: "Gdy Halka grała operetki",
    paragraphs: [
      "Pieśń i taniec to tylko część ówczesnego repertuaru. W 1955 roku Halka wystawia „Pana Damazego” i operetkę „Dom trzech dziewcząt”. Rok później przychodzi premiera „Tam, gdzie skowronek śpiewa”, a w 1957 roku publiczność ogląda komedię muzyczną „Rozkoszna dziewczyna”. Zachowane afisze i fotografie przypominają rozmach tych przedstawień.",
      "Przy zespole działa orkiestra symfoniczna, a zdjęcia z 1958 roku dokumentują również próby orkiestry dętej. Na dziesięciolecie Halka prezentuje fragmenty opery „Halka”. Jubileusz w Strzelnicy zamyka pierwszą dekadę wypełnioną muzyką, teatrem i wspólnymi spotkaniami.",
    ],
    photos: [photo("operetka-1956", 1056, 1601, "Para wykonawców w scenie z operetki Tam, gdzie skowronek śpiewa", "1956. „Tam, gdzie skowronek śpiewa”."), photo("rozkoszna-dziewczyna-1957", 1166, 1601, "Oryginalny afisz komedii muzycznej Rozkoszna dziewczyna wystawianej przez Halkę", "1957. Afisz „Rozkosznej dziewczyny”.")],
    layout: "portrait", sourcePages: [1, 2],
  },
  {
    id: "telewizja", years: "1959–1968", label: "Scena i telewizja", title: "Coraz więcej sposobów na muzykę",
    paragraphs: [
      "Kolejne lata przynoszą „Awanturę w Chioggi” (1959), „Królową śniegu” (1961) i „Nowe szaty króla” (1963). Orkiestra dęta wychodzi w pochód, a Halka uczestniczy w przeglądach i zjazdach śpiewaczych. Archiwum zachowało nawet zdjęcie kursu gotowania: siedziba zespołu służyła także spotkaniom poza próbami.",
      "W połowie lat 60. Halka występuje w Kotlinie Jeleniogórskiej i w Zielonej Górze. W 1966 roku pojawia się w programie „Marzanioki” w TVP Katowice. Rok później otrzymuje Złotą Odznakę za zasługi dla województwa katowickiego, a w świetlicy próbuje zespół big-beatowy. Obchody dwudziestolecia prowadzą do jubileuszu w miejskim parku w 1968 roku.",
    ],
    photos: [photo("marzanioki-1966", 1601, 1140, "Wykonawczynie Halki z kukłą Marzanny w programie telewizyjnym", "1966. „Marzanioki” w TVP Katowice."), photo("tancerki-1968", 1601, 470, "Archiwalna kompozycja portretów tancerek Halki w formie klatki filmowej", "1968. Tancerki Halki w archiwalnej kompozycji fotograficznej.")],
    layout: "wide", sourcePages: [3, 4],
  },
  {
    id: "podroze", years: "1969–1979", label: "W drodze", title: "Z Lublińca w świat",
    paragraphs: [
      "W 1969 roku Halka występuje w Tbilisi w Gruzji i pojawia się w programie „Melodie od Lublińca” w TVP Katowice. Rok później tańczy na ulicach Wernigerode, odwiedza Berlin, Poczdam i Budapeszt. Wyjazdy stają się ważną częścią zespołowego kalendarza, obok koncertów w kraju.",
      "Trasa prowadzi dalej: na Węgry w 1972 roku, do Bułgarii w 1973 i Rumunii w 1974. W latach 1976–1977 archiwum odnotowuje V Międzynarodowy Festiwal Folkloru w Krems. Pomiędzy podróżami Halka świętuje 25-lecie, a w 1978 roku trzydzieste urodziny. Zdjęcia z kolejnego roku pokazują występy w Filharmonii Częstochowskiej i bułgarskim Perniku.",
    ],
    photos: [photo("wernigerode-1970", 1601, 1020, "Tancerki w wirujących spódnicach podczas występu na rynku w Wernigerode", "1970. Koncert w Wernigerode, ówczesna NRD."), photo("jubileusz-1978", 1601, 1074, "Zespół Halka na scenie podczas koncertu z okazji trzydziestolecia", "1978. Trzydzieści lat Halki na scenie.")],
    layout: "pair", sourcePages: [5, 6, 7],
  },
  {
    id: "przyjaznie", years: "1981–1988", label: "Ponad granicami", title: "Podróże, z których zostają przyjaźnie",
    paragraphs: [
      "Lata 80. dopisują do albumu kolejne spotkania. W 1981 roku Halka wraca do austriackiego Krems, a w 1982 występuje w Norwegii. Fotografie dokumentują współpracę z norweskim zespołem: wspólne portrety, stroje, instrumenty i wizyty, do których kronika będzie jeszcze powracać.",
      "Nie brakuje też występów blisko domu, między innymi na Jarmarku Jurajskim w Częstochowie i Święcie Spółdzielczości w Oleśnie. W 1983 roku zespół obchodzi 35-lecie, pięć lat później czterdziestolecie. Wśród pamiątek z tej dekady są również fotografie z Francji i Finlandii.",
    ],
    photos: [photo("krems-1981", 1601, 1049, "Członkowie Halki w strojach ludowych na ulicy austriackiego Krems", "1981. Halka w Krems, Austria."), photo("jubileusz-1983", 1601, 909, "Wspólny portret członków zespołu na scenie pod napisem 35 lat w służbie kultury", "1983. Pamiątka jubileuszu 35-lecia.")],
    layout: "pair", sourcePages: [8, 11],
  },
  {
    id: "pokolenia", years: "1990–2003", label: "Kolejne pokolenie", title: "Pół wieku i nowe twarze",
    paragraphs: [
      "Kronika organizacyjna odnotowuje prezesów Zarządu Stowarzyszenia Zespołu Pieśni i Tańca „Halka”: Tadeusza Iwaninę w latach 1990–1995 i Eugeniusza Cibę w latach 1995–1999. Wcześniej, od 1962 do 1990 roku, prezesem zespołu był Józef Gościniak. Za kolejnymi koncertami stoją także lata ich pracy dla Halki.",
      "W 1997 roku zespół odwiedza norweskie Bjørnsund, a na pięćdziesięciolecie w 1998 roku goście z Norwegii przyjeżdżają do Lublińca. Na fotografiach z 2000 roku występuje już „Mała Halka”. Obok dorosłych pojawia się następne pokolenie, a w 2003 roku zespół świętuje 55-lecie.",
    ],
    photos: [photo("norwegia-1997", 1601, 1117, "Członkowie Halki w Bjørnsund, nad morzem, pod pomnikiem niedźwiedzia polarnego", "1997. Wspólna fotografia z wyjazdu do Bjørnsund w Norwegii.")],
    sourcePages: [9, 12],
  },
  {
    id: "mala-halka", years: "2005–2010", label: "Mała Halka", title: "Własna przygoda najmłodszych",
    paragraphs: [
      "Zdjęcia z lat 2005–2007 pokazują „Małą Halkę” w Kokotku: dzieci w strojach ludowych, wspólne występy i fotografie w plenerze. Ci, którzy dopiero uczą się sceny, coraz wyraźniej zaznaczają swoją obecność w historii zespołu.",
      "W 2008 roku Halka obchodzi sześćdziesięciolecie i gości zespół z Ukrainy. W 2010 roku „Mała Halka” jedzie do Tarnopola, a kronika dokumentuje również przegląd zespołów folklorystycznych w czeskiej Opawie. Młodsze pokolenie ma już własne podróże i własne wspomnienia.",
    ],
    photos: [photo("mala-halka-2005-2007", 1601, 1101, "Dzieci z Małej Halki w strojach ludowych pozujące na trawie w Kokotku", "2005–2007. „Mała Halka” w Kokotku."), photo("opawa-2010", 1601, 1087, "Młodzi członkowie Halki w strojach ludowych z biało-czerwoną flagą w Opawie", "2010. Przegląd folklorystyczny w Opawie.")],
    layout: "pair", sourcePages: [10],
  },
  {
    id: "jubileusze", years: "2013–2018", label: "Wspólna scena", title: "Siedemdziesiąt lat razem",
    paragraphs: [
      "W 2013 roku Halka świętuje 65-lecie, a w 2018 wraca na jubileuszową scenę z okazji siedemdziesiątych urodzin. Na zdjęciach widać kolejne składy, znajome stroje i wspólny finał. Od czarno-białych fotografii z Wrocławia po barwne koncerty jubileuszowe zmieniają się twarze, ale zespół wciąż spotyka się na scenie.",
      "Na tym kończy się jubileuszowa opowieść wystawy. Zostają w niej nie tylko daty występów, lecz także wycieczki, próby, spotkania i ludzie, którzy przez kolejne dekady tworzyli Halkę.",
    ],
    photos: [photo("jubileusz-2018", 1601, 871, "Wszyscy wykonawcy koncertu jubileuszowego Halki stoją razem na oświetlonej scenie", "2018. Finał koncertu z okazji 70-lecia Halki.")],
    layout: "wide", sourcePages: [10],
  },
];
