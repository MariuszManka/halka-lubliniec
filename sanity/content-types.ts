export type CmsImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type GalleryImage = CmsImage & {
  caption?: string;
};

export type GalleryEvent = {
  id: string;
  year: number;
  pinned: boolean;
  title: string;
  date: string;
  location: string;
  description: string;
  credit: string;
  tags: string[];
  coverFocus?: string;
  images: GalleryImage[];
};

export type GalleryPageContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    ctaLabel: string;
    image: CmsImage;
  };
  archive: {
    eyebrow: string;
    title: string;
    lead: string;
    allYearsLabel: string;
    emptyLabel: string;
  };
  ui: {
    resultsOne: string;
    resultsMany: string;
    cardCta: string;
    cardOpenLabel: string;
    close: string;
    previous: string;
    next: string;
    place: string;
    photos: string;
    author: string;
    hint: string;
    filterLabel: string;
    choosePhoto: string;
  };
};

export type TextItem = {
  title: string;
  text: string;
};

export type IconTextItem = TextItem & {
  icon: "calendar" | "check" | "clock" | "location" | "people";
};

export type JoinPageContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    facts: Array<{ value: string; label: string }>;
    image: CmsImage;
    noteLabel: string;
    noteText: string;
    accessibilityLabel: string;
  };
  groups: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    items: Array<{
      id: string;
      name: string;
      meta: string;
      schedule: string;
      description: string;
      statusLabel: string;
      image: CmsImage;
    }>;
    scheduleFixedLabel: string;
    nextPracticesLabel: string;
    locationLabel: string;
  };
  firstVisit: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    text: string;
    benefits: TextItem[];
  };
  location: {
    eyebrow: string;
    title: string;
    mapCtaLabel: string;
    emailCtaLabel: string;
    mapTitle: string;
  };
};

export type InvitePageContent = {
  meta: {
    title: string;
    description: string;
  };
  skipLabel: string;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    primaryCtaLabel: string;
    image: CmsImage;
    noteLabel: string;
    noteText: string;
    phoneLabel: string;
    fact1Title: string;
    fact1Text: string;
    fact2Title: string;
    fact2Text: string;
    fact3Title: string;
    fact3Text: string;
  };
  formats: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    items: Array<TextItem & { image: CmsImage }>;
  };
  suites: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    items: Array<{
      id: string;
      name: string;
      label: string;
      description: string;
      image: CmsImage;
    }>;
    costumesCtaLabel: string;
  };
  process: {
    eyebrow: string;
    title: string;
    image: CmsImage;
    items: IconTextItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    hint: string;
    socialPrompt: string;
    titleAccent: string;
    emailLabel: string;
    phoneLabel: string;
    messengerLabel: string;
    instagramLabel: string;
  };
  booking: {
    subject: string;
    body: string;
  };
};

