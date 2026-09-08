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
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    ctaLabel: string;
    image: CmsImage;
    imageLabel: string;
    imageCaption: string;
  };
  archive: {
    eyebrow: string;
    title: string;
    lead: string;
    allYearsLabel: string;
    emptyLabel: string;
  };
  home: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    albumCtaLabel: string;
    eventLabel: string;
  };
  return: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaLabel: string;
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
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    facts: Array<{ value: string; label: string }>;
    image: CmsImage;
    imageLabel: string;
    imageMeta: string;
    noteLabel: string;
    noteText: string;
  };
  how: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    steps: TextItem[];
  };
  groups: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    paths: Array<{ eyebrow: string; title: string; text: string; href: string }>;
    items: Array<{
      id: string;
      name: string;
      meta: string;
      schedule: string;
      description: string;
      statusLabel: string;
      image: CmsImage;
    }>;
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
  };
};

export type InvitePageContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    titleSuffix: string;
    lead: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    image: CmsImage;
    noteLabel: string;
    noteText: string;
  };
  formats: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    items: IconTextItem[];
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
  stage: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    image: CmsImage;
    eventTitle: string;
    eventText: string;
    ctaLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    hint: string;
    socialPrompt: string;
  };
};

