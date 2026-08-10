export type CostumeLook = {
  title: string;
  eyebrow: string;
  description: string;
  images: string[];
  details: string[];
};

export type CostumeFact = {
  image: string;
  title: string;
  region: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const costumeLooks: CostumeLook[] = [
  {
    title: "Strój cieszyński",
    eyebrow: "Śląsk Cieszyński",
    description:
      "Elegancka, oszczędna kolorystycznie sylwetka zyskuje blask dzięki biżuteryjnym zapięciom, koronce i bogato opracowanemu żywotkowi. W zestawie Halki pokazujemy zarówno kobiecą całość, jak i detale damskie oraz męskie.",
    images: ["cieszyn-worn-1", "cieszyn-worn-2", "cieszyn-female-detail", "cieszyn-female-detail-2", "cieszyn-male-detail"],
    details: ["żywotek i kabotek", "koronkowe wykończenia", "biżuteryjne hoczki", "damska i męska sylwetka"],
  },
  {
    title: "Krakowiacy Zachodni",
    eyebrow: "Ziemia Krakowska",
    description:
      "Jedna z najbardziej rozpoznawalnych polskich tradycji kostiumowych, lecz znacznie bardziej różnorodna niż jej popularny wizerunek. W scenicznej kolekcji Halki spotykają się bogato zdobione gorsety, czerwone chusty, granatowe warstwy i szeroki pas.",
    images: ["krakow-worn-1", "krakow-worn-2", "krakow-worn-3", "krakow-female-detail", "krakow-male-detail", "krakow-turon"],
    details: ["gorset i czerwona chusta", "granatowa sukmana", "szeroki pas", "kostium obrzędowy z turoniem"],
  },
  {
    title: "Strój krzczonowski",
    eyebrow: "Lubelszczyzna",
    description:
      "Strój kojarzony z okolicami Krzczonowa wyróżnia rytmiczna kompozycja wielobarwnych taśm, haftów i koronek. Na tancerzach Halki najlepiej widać, jak pionowe zdobienia odpowiadają na ruch szerokich spódnic.",
    images: ["lublin-worn-1", "lublin-worn-2", "lublin-worn-3", "lublin-female-detail", "lublin-female-detail-2", "lublin-male-detail"],
    details: ["wielobarwne taśmy", "haft krzczonowski", "korale i koronki", "rytmiczne podziały stroju"],
  },
  {
    title: "Strój rzeszowski",
    eyebrow: "Rzeszowszczyzna",
    description:
      "Kontrast błękitu, czerwieni i bieli tworzy bardzo czytelny obraz sceniczny. Męską sylwetkę porządkują kamizola oraz pas, a kobiecą — haftowana koszula, gorset, korale i starannie opracowane nakrycie głowy.",
    images: ["rzeszow-worn-1", "rzeszow-worn-2", "rzeszow-female-detail", "rzeszow-male-detail", "rzeszow-male-detail-2"],
    details: ["niebieska kamizola", "czerwone obszycia", "haftowana koszula", "korale i nakrycie głowy"],
  },
  {
    title: "Górale Żywieccy",
    eyebrow: "Beskid Żywiecki",
    description:
      "Kostium Górali Żywieckich łączy wyraźną linię skórzanego pasa, ciemne kamizelki i białe płótno z kobiecą, kwiatową kompozycją spódnicy i fartucha. Zestaw jest mocny w portrecie i wyjątkowo czytelny w parze.",
    images: ["zywiec-worn-1", "zywiec-worn-2", "zywiec-worn-3", "zywiec-female-detail", "zywiec-male-detail"],
    details: ["szeroki skórzany pas", "białe płótno", "kwiatowy fartuch", "kontrast pary tanecznej"],
  },
  {
    title: "Strój pszczyński",
    eyebrow: "Ziemia Pszczyńska",
    description:
      "W kobiecej sylwetce uwagę przyciąga kwiecisty oplecek, jasny fartuch, kabotek i sznury korali. Fotografie Halki pokazują ten kostium od pełnej, lekkiej sylwetki aż po drobne złote obszycia i ażurową koronkę.",
    images: ["pszczyna-worn-1", "pszczyna-worn-2", "pszczyna-worn-3", "pszczyna-detail-1", "pszczyna-detail-2"],
    details: ["oplecek zszyty ze spódnicą", "kabotek", "jasny fartuch", "korale i złote obszycia"],
  },
  {
    title: "Strój rozbarski",
    eyebrow: "Górny Śląsk",
    description:
      "Strój rozbarski, nazywany również bytomskim, opiera się na mocnym kontraście bieli, ciemnych warstw oraz tkanin w kwiaty. W tej części kolekcji skupiamy się przede wszystkim na detalach kobiecych i męskich.",
    images: ["rozbark-detail-1", "rozbark-detail-2", "rozbark-detail-3", "rozbark-male-detail"],
    details: ["kwiatyste tkaniny", "korale i koronka", "damskie detale", "męskie wykończenia"],
  },
  {
    title: "Mundur górniczy",
    eyebrow: "Śląsk przemysłowy",
    description:
      "Galowy mundur górniczy wnosi na scenę czerń, złoto i wyrazistą linię ramion. W zestawieniu z kostiumem pszczyńskim tworzy charakterystyczny obraz śląskiej opowieści zespołu.",
    images: ["mining-worn-1", "mining-worn-2", "mining-detail-1", "mining-detail-2"],
    details: ["czarna sukienna forma", "złote obszycia", "dekoracyjne guziki", "galowa sylwetka"],
  },
  {
    title: "Księstwo Warszawskie",
    eyebrow: "Kostium historyczny",
    description:
      "Historyzujący zestaw z okresu Księstwa Warszawskiego poszerza repertuar Halki poza stroje regionalne. Empire'owa linia sukni, futrzane nakrycia głowy i mundur ułański budują obraz konkretnej epoki.",
    images: ["national-worn-1", "national-worn-2", "national-worn-3", "national-uniform-detail"],
    details: ["suknia o linii empire", "futrzane nakrycia głowy", "mundur ułański", "złoty epolet"],
  },
];

export const costumeFacts: CostumeFact[] = [
  {
    image: "cieszyn-female-detail",
    title: "Żywotek",
    region: "Cieszyn",
    description:
      "To ozdobny stanik cieszyńskiej sukni. Muzealne egzemplarze wykonywano m.in. z aksamitu, płótna i usztywniającej tektury, a dekorowano metalową nicią, cekinami oraz koralikami.",
    sourceLabel: "Muzeum Narodowe we Wrocławiu",
    sourceUrl: "https://muzeumcyfrowe.mnwr.pl/obiekt/stanik-zywotek",
  },
  {
    image: "lublin-female-detail-2",
    title: "Haft krzczonowski",
    region: "Lubelszczyzna",
    description:
      "Łączy nasycone barwy z motywami roślinnymi i geometrycznymi. Ściegi prowadzone pionowo i poziomo budują rytmiczne grupy — dlatego ornament tak dobrze pracuje na scenie.",
    sourceLabel: "Muzeum Wsi Lubelskiej",
    sourceUrl: "https://skansen.lublin.pl/pl/aktualnosci/zapraszamy-na-warsztaty-z-rekodziela-2-2-2/",
  },
  {
    image: "rzeszow-male-detail",
    title: "Kamizola",
    region: "Rzeszów",
    description:
      "Niebieska, wełniana kamizola i sukieniaki są jednym z najbardziej charakterystycznych męskich zestawień regionu. Badacze wskazują w ich formie także inspiracje wojskowe.",
    sourceLabel: "Muzeum Etnograficzne w Rzeszowie",
    sourceUrl: "https://muzeumetnograficzne.rzeszow.pl/1015/11/27/watki-narodowe-w-stroju-rzeszowskim/",
  },
  {
    image: "pszczyna-detail-1",
    title: "Oplecek i kabotek",
    region: "Pszczyna",
    description:
      "Oplecek jest doszywany do spódnicy i porządkuje górną część kobiecej sylwetki. Zestawia się go z białą koszulą — kabotkiem — oraz koralami i jasnym fartuchem.",
    sourceLabel: "Powiat Pszczyński",
    sourceUrl: "https://www.powiat.pszczyna.pl/powiat/o-powiecie/tradycja-pszczynskiego-stroju",
  },
  {
    image: "krakow-male-detail",
    title: "Lokalna odmiana",
    region: "Krakowiacy Zachodni",
    description:
      "Nie istnieje jeden, niezmienny „strój krakowski”. Materiały, układ zdobień i bogactwo haftu różniły się nawet między blisko położonymi miejscowościami i mówiły o lokalnej tożsamości.",
    sourceLabel: "Muzeum Etnograficzne w Krakowie",
    sourceUrl: "https://etnomuzeum.eu/projekty-badawcze/stroj-krakowiakow-zachodnich-badania-monografia-upowszechnienie",
  },
  {
    image: "national-uniform-detail",
    title: "Epolet",
    region: "Kostium historyczny",
    description:
      "Złoty epolet wzmacnia linię ramion munduru ułańskiego i pozwala odczytać wojskowy charakter postaci jeszcze zanim tancerz wykona pierwszy gest.",
    sourceLabel: "Kolekcja sceniczna Halki",
    sourceUrl: "#kolekcja",
  },
];
