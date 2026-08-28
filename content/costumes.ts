export type CostumeLook = {
  title: string;
  eyebrow: string;
  description: string;
  galleryKey: string;
  genders?: Array<"female" | "male">;
  images: string[];
  femaleImages?: string[];
  maleImages?: string[];
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
    galleryKey: "cieszyn",
    description:
      "Elegancka, oszczędna kolorystycznie sylwetka zyskuje blask dzięki biżuteryjnym zapięciom, koronce i bogato opracowanemu żywotkowi. W zestawie Halki pokazujemy zarówno kobiecą całość, jak i detale damskie oraz męskie.",
    images: ["cieszyn-worn-1", "cieszyn-worn-2", "cieszyn-female-detail", "cieszyn-female-detail-2", "cieszyn-male-detail"],
    femaleImages: ["cieszyn-worn-1", "cieszyn-worn-2", "cieszyn-female-detail", "cieszyn-female-detail-2", "cieszyn-female-detail-3"],
    maleImages: ["cieszyn-male-detail", "cieszyn-male-detail-2", "cieszyn-male-detail-3"],
    details: ["żywotek i kabotek", "koronkowe wykończenia", "biżuteryjne hoczki", "damska i męska sylwetka"],
  },
  {
    title: "Krakowiacy Zachodni",
    eyebrow: "Ziemia Krakowska",
    galleryKey: "krakow",
    description:
      "Jedna z najbardziej rozpoznawalnych polskich tradycji kostiumowych, lecz znacznie bardziej różnorodna niż jej popularny wizerunek. W scenicznej kolekcji Halki spotykają się bogato zdobione gorsety, czerwone chusty, granatowe warstwy i szeroki pas.",
    images: ["krakow-worn-1", "krakow-worn-2", "krakow-worn-3", "krakow-female-detail", "krakow-male-detail", "krakow-turon"],
    femaleImages: ["krakow-worn-1", "krakow-worn-2", "krakow-worn-3", "krakow-female-detail", "krakow-female-detail-2", "krakow-female-detail-3"],
    maleImages: ["krakow-worn-1", "krakow-worn-2", "krakow-male-detail", "krakow-male-detail-2", "krakow-male-detail-3", "krakow-turon"],
    details: ["gorset i czerwona chusta", "granatowa sukmana", "szeroki pas", "kostium obrzędowy z turoniem"],
  },
  {
    title: "Strój krzczonowski",
    eyebrow: "Lubelszczyzna",
    galleryKey: "lublin",
    description:
      "Strój kojarzony z okolicami Krzczonowa wyróżnia rytmiczna kompozycja wielobarwnych taśm, haftów i koronek. Na tancerzach Halki najlepiej widać, jak pionowe zdobienia odpowiadają na ruch szerokich spódnic.",
    images: ["lublin-worn-1", "lublin-worn-2", "lublin-worn-3", "lublin-female-detail", "lublin-female-detail-2", "lublin-male-detail"],
    femaleImages: ["lublin-worn-1", "lublin-worn-2", "lublin-worn-3", "lublin-worn-female", "lublin-female-detail", "lublin-female-detail-2", "lublin-female-detail-3"],
    maleImages: ["lublin-worn-male", "lublin-male-detail", "lublin-male-detail-2", "lublin-male-detail-3"],
    details: ["wielobarwne taśmy", "haft krzczonowski", "korale i koronki", "rytmiczne podziały stroju"],
  },
  {
    title: "Strój rzeszowski",
    eyebrow: "Rzeszowszczyzna",
    galleryKey: "rzeszow",
    description:
      "Kontrast błękitu, czerwieni i bieli tworzy bardzo czytelny obraz sceniczny. Męską sylwetkę porządkują kamizola oraz pas. Kobiecą tworzą haftowana koszula, gorset, korale i starannie opracowane nakrycie głowy.",
    images: ["rzeszow-worn-1", "rzeszow-worn-2", "rzeszow-female-detail", "rzeszow-male-detail", "rzeszow-male-detail-2"],
    femaleImages: ["rzeszow-worn-1", "rzeszow-worn-2", "rzeszow-female-detail", "rzeszow-female-detail-2", "rzeszow-female-detail-3"],
    maleImages: ["rzeszow-male-detail", "rzeszow-male-detail-2", "rzeszow-male-detail-3"],
    details: ["niebieska kamizola", "czerwone obszycia", "haftowana koszula", "korale i nakrycie głowy"],
  },
  {
    title: "Górale Żywieccy",
    eyebrow: "Beskid Żywiecki",
    galleryKey: "zywiec",
    description:
      "Kostium Górali Żywieckich łączy wyraźną linię skórzanego pasa, ciemne kamizelki i białe płótno z kobiecą, kwiatową kompozycją spódnicy i fartucha. Zestaw jest mocny w portrecie i wyjątkowo czytelny w parze.",
    images: ["zywiec-worn-1", "zywiec-worn-2", "zywiec-worn-3", "zywiec-female-detail", "zywiec-male-detail"],
    femaleImages: ["zywiec-worn-1", "zywiec-worn-3", "zywiec-female-detail", "zywiec-female-detail-2", "zywiec-female-detail-3"],
    maleImages: ["zywiec-worn-1", "zywiec-worn-2", "zywiec-male-detail", "zywiec-male-detail-2", "zywiec-male-detail-3"],
    details: ["szeroki skórzany pas", "białe płótno", "kwiatowy fartuch", "kontrast pary tanecznej"],
  },
  {
    title: "Strój pszczyński",
    eyebrow: "Ziemia Pszczyńska",
    galleryKey: "slask-pszczyna",
    genders: ["female"],
    description:
      "W kobiecej sylwetce uwagę przyciąga kwiecisty oplecek, jasny fartuch, kabotek i sznury korali. Fotografie Halki pokazują ten kostium od pełnej, lekkiej sylwetki aż po drobne złote obszycia i ażurową koronkę.",
    images: ["pszczyna-worn-1", "pszczyna-worn-2", "pszczyna-worn-3", "pszczyna-detail-1", "pszczyna-detail-2"],
    femaleImages: ["pszczyna-worn-1", "pszczyna-worn-2", "pszczyna-worn-3", "pszczyna-detail-1", "pszczyna-detail-2", "pszczyna-detail-3"],
    details: ["oplecek zszyty ze spódnicą", "kabotek", "jasny fartuch", "korale i złote obszycia"],
  },
  {
    title: "Strój rozbarski",
    eyebrow: "Górny Śląsk",
    galleryKey: "slask-rozbark",
    description:
      "Strój rozbarski, nazywany również bytomskim, opiera się na mocnym kontraście bieli, ciemnych warstw oraz tkanin w kwiaty. W tej części kolekcji skupiamy się przede wszystkim na detalach kobiecych i męskich.",
    images: ["modal-slask-rozbark-female-16", "rozbark-detail-2", "rozbark-detail-3", "rozbark-male-detail"],
    femaleImages: ["rozbark-detail-1", "rozbark-detail-2", "rozbark-detail-3", "rozbark-detail-4"],
    maleImages: ["rozbark-male-detail", "rozbark-male-detail-2", "rozbark-male-detail-3"],
    details: ["kwiatyste tkaniny", "korale i koronka", "damskie detale", "męskie wykończenia"],
  },
  {
    title: "Mundur górniczy",
    eyebrow: "Śląsk przemysłowy",
    galleryKey: "slask-pszczyna",
    genders: ["male"],
    description:
      "Galowy mundur górniczy wnosi na scenę czerń, złoto i wyrazistą linię ramion. W zestawieniu z kostiumem pszczyńskim tworzy charakterystyczny obraz śląskiej opowieści zespołu.",
    images: ["mining-worn-1", "mining-worn-2", "mining-detail-1", "mining-detail-2"],
    maleImages: ["mining-worn-1", "mining-worn-2", "mining-detail-1", "mining-detail-2", "mining-detail-3"],
    details: ["czarna sukienna forma", "złote obszycia", "dekoracyjne guziki", "galowa sylwetka"],
  },
  {
    title: "Księstwo Warszawskie",
    eyebrow: "Kostium historyczny",
    galleryKey: "narodowe",
    genders: ["male"],
    description:
      "Historyzujący strój inspirowany umundurowaniem z okresu Księstwa Warszawskiego. Mundur ułański, charakterystyczne nakrycie głowy i ozdobne detale nawiązują do wojskowej tradycji początku XIX wieku.",    images: ["national-worn-1", "national-worn-2", "national-worn-3", "national-uniform-detail"],
    femaleImages: ["national-worn-1", "national-worn-2", "national-worn-3"],
    maleImages: ["national-worn-1", "national-uniform-detail", "national-uniform-detail-2", "national-uniform-detail-3"],
    details: ["czapka polska - czako", "ozdobne wykończenia munduru", "spodnie zdobione lampasami", "buty - sztyblety lub oficerki"],
  },
  {
    title: "Kontusz szlachecki",
    eyebrow: "Kostium historyczny",
    galleryKey: "narodowe",
    genders: ["female"],
    description:
      "Damski kostium inspirowany strojem polskiej szlachty, nawiązujący do tradycji dawnej Rzeczypospolitej. Charakterystyczny kontusz, dekoracyjne wykończenia i bogate tkaniny nadają całości reprezentacyjny, historyczny charakter.",    images: ["national-worn-1", "national-worn-2", "national-worn-3", "national-uniform-detail"],
    femaleImages: ["national-worn-1", "national-worn-2", "national-worn-3"],
    details: ["kontusz o dekoracyjnym kroju", "bogato zdobiona tkanina", "ozdobne wykończenia", "aksamitna czapka z futrem"],  
  },
];

export const costumeFacts: CostumeFact[] = [
  {
    image: "rozbark-purpurka",
    title: "Purpurka",
    region: "Górny Śląsk",
    description:
      "Purpurka to charakterystyczna dla stroju rozbarskiego czerwona, płócienna chusta nagłowna zdobiona motywem kwiatowym. Mężatki zakładały ją na upięte w kok włosy i wiązały z tyłu głowy.",
    sourceLabel: "Muzeum Miejskie w Rudzie Śląskiej",
    sourceUrl: "https://muzeum.rsl.pl/wystawy/zbiory/stroj-damski-rozbarski",
  },
  {
    image: "lublin-female-detail-2",
    title: "Haft krzczonowski",
    region: "Lubelszczyzna",
    description:
      "Łączy nasycone barwy z motywami roślinnymi i geometrycznymi. Ściegi prowadzone pionowo i poziomo budują rytmiczne grupy, dlatego ornament tak dobrze pracuje na scenie.",
    sourceLabel: "Muzeum Wsi Lubelskiej",
    sourceUrl: "https://skansen.lublin.pl/pl/aktualnosci/zapraszamy-na-warsztaty-z-rekodziela-2-2-2/",
  },
  {
    image: "rzeszow-male-detail",
    title: "Katana krakowska",
    region: "Kraków",
    description:
      "Katana krakowska wywodzi się z męskich kaftanów noszonych przez Krakowiaków. W wersjach z rękawami pełniła rolę okrycia wierzchniego, a jej granatowe sukno, czerwone podszycie, guziki i chwosty mocno budowały sceniczny charakter stroju.",
    sourceLabel: "Stroje ludowe",
    sourceUrl: "https://strojeludowe.net/stroje/krakowski/",
  },
  {
    image: "pszczyna-detail-1",
    title: "Oplecek i kabotek",
    region: "Pszczyna",
    description:
      "Oplecek jest doszywany do spódnicy i porządkuje górną część kobiecej sylwetki. Zestawia się go z białą koszulą zwaną kabotkiem, koralami i jasnym fartuchem.",
    sourceLabel: "Powiat Pszczyński",
    sourceUrl: "https://www.powiat.pszczyna.pl/powiat/o-powiecie/tradycja-pszczynskiego-stroju",
  },
  {
    image: "modal-zywiec-male-05",
    title: "Trzos",
    region: "Górale Żywieccy",
    description:
      "Szeroki pas z grubej skóry zakładano na portki i koszulę. Żywiecki trzos zapinano na trzy lub cztery metalowe sprzączki, a jego powierzchnię zdobiły tłoczone ornamenty i metalowe guzy.",
    sourceLabel: "Polska Tradycja",
    sourceUrl: "https://www.polskatradycja.pl/folklor/stroje-ludowe/gory/stroj-gorali-zywieckich.html",
  },
  {
    image: "modal-rzeszow-female-09",
    title: "Gorset rzeszowski",
    region: "Rzeszowszczyzna",
    description:
      "Czarny aksamit zdobiono cekinami i kwiatowym haftem ze szklanych koralików. Po I wojnie światowej dekoracja stawała się tak gęsta, że niemal całkowicie przesłaniała tkaninę gorsetu.",
    sourceLabel: "Muzeum Etnograficzne w Rzeszowie",
    sourceUrl: "https://ubioryludowe.muzeumetnograficzne.rzeszow.pl/zdobnictwo/",
  },
];
