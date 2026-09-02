export type Locale = "id" | "en" | "jv";

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "id", label: "Bahasa Indonesia" },
  { value: "en", label: "English" },
  { value: "jv", label: "Basa Jawa (Krama Inggil)" },
];

export type BentoCopy = {
  systemsEyebrow: string;
  systemsTitle: string;
  engineeringCopy: string;
  reliableEyebrow: string;
  reliableCopy: string;
  connectedEyebrow: string;
  networkStats: Array<{ label: string; value: string }>;
  trafficLabel: string;
  trafficCopy: string;
  alertsEyebrow: string;
  alertsCopy: string;
  capabilitiesEyebrow: string;
  capabilities: Array<{ title: string; copy: string }>;
};

export type LandingCopy = {
  languageLabel: string;
  mainNavigationLabel: string;
  mobileNavigationLabel: string;
  nav: {
    home: string;
    capabilities: string;
    approach: string;
    contact: string;
    portfolio: string;
  };
  themeLabel: string;
  themeLight: string;
  themeDark: string;
  themeLightMode: string;
  themeDarkMode: string;
  menuOpen: string;
  menuClose: string;
  brandHome: string;
  hero: {
    titleFirst: string;
    titleSecond: string[];
    description: string;
    startProject: string;
    exploreCapabilities: string;
  };
  capabilities: {
    title: string;
    description: string;
  };
  approach: {
    title: string;
    description: string;
    items: Array<{ id: string; title: string; content: string }>;
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
  };
  contact: {
    title: string;
    button: string;
    location: string;
  };
  bento: BentoCopy;
  metaTitle: string;
};

export const translations: Record<Locale, LandingCopy> = {
  id: {
    languageLabel: "Bahasa",
    mainNavigationLabel: "Navigasi utama",
    mobileNavigationLabel: "Navigasi seluler",
    nav: {
      home: "Beranda",
      capabilities: "Keahlian",
      approach: "Tim",
      contact: "Kontak",
      portfolio: "Portofolio",
    },
    themeLabel: "Mode Baca",
    themeLight: "Beralih ke mode terang",
    themeDark: "Beralih ke mode gelap",
    themeLightMode: "Terang",
    themeDarkMode: "Gelap",
    menuOpen: "Buka menu",
    menuClose: "Tutup menu",
    brandHome: "Beranda Nggalekco Labs",
    hero: {
      titleFirst: "Akar lokal.",
      titleSecond: ["Dampak global.", "Perangkat lunak berguna.", "Sistem yang lebih baik."],
      description:
        "Nggalekco Labs adalah perusahaan pengembangan perangkat lunak hiper-lokal yang berbasis di Trenggalek, Jawa Timur — menghadirkan keahlian nasional dan global untuk menyelesaikan persoalan setempat.",
      startProject: "Mulai proyek",
      exploreCapabilities: "Jelajahi keahlian",
    },
    capabilities: {
      title: "Teknologi secukupnya untuk kebutuhan yang tepat.",
      description:
        "Kami bekerja erat dengan orang-orang yang paling memahami masalahnya, membentuk perangkat lunak yang berguna sejak hari pertama dan siap untuk langkah berikutnya.",
    },
    approach: {
      title: "Dekat untuk peduli. Berpengalaman untuk mewujudkan.",
      description:
        "Perangkat lunak yang baik dimulai dengan mendengarkan. Kami membawa kejernihan, keterampilan, dan momentum untuk mengubah masalah yang berarti menjadi keunggulan yang bertahan lama.",
      items: [
        {
          id: "listen",
          title: "Dengarkan dengan saksama",
          content:
            "Kami memulai dari konteks di balik masalah, agar solusi pertama berpijak pada pekerjaan yang sudah dilakukan orang-orang.",
        },
        {
          id: "shape",
          title: "Bentuk sistem yang tepat",
          content:
            "Kami mengubah peluang yang paling jelas menjadi produk atau sistem yang fokus dan berguna sejak hari pertama.",
        },
        {
          id: "deliver",
          title: "Wujudkan dengan momentum",
          content:
            "Kami membangun untuk kemajuan yang konsisten, meninggalkan fondasi yang dapat beradaptasi seiring berkembangnya pekerjaan.",
        },
      ],
    },
    team: {
      eyebrow: "Tim",
      title: "Orang-orang di balik sistem yang berguna.",
      description:
        "Kami membawa perhatian, pengalaman, dan rasa ingin tahu untuk membangun perangkat lunak yang terasa berguna sejak hari pertama.",
      button: "Kenali tim",
    },
    contact: {
      title: "Punya persoalan lokal dengan peluang yang lebih besar?",
      button: "Sapa kami",
      location: "Trenggalek, Jawa Timur · Indonesia",
    },
    bento: {
      systemsEyebrow: "Sistem yang terus bergerak",
      systemsTitle: "Dibangun untuk saat ini, siap untuk langkah berikutnya.",
      engineeringCopy:
        "Rekayasa yang penuh perhatian, dari sketsa pertama hingga operasional yang stabil.",
      reliableEyebrow: "Andal sejak dirancang",
      reliableCopy:
        "Fondasi yang tenang untuk perangkat lunak yang harus mendapatkan kepercayaan setiap hari.",
      connectedEyebrow: "Cara berpikir yang terhubung",
      networkStats: [
        { label: "Pengantaran edge", value: "99,99%" },
        { label: "Layanan inti", value: "99,99%" },
        { label: "Sistem data", value: "99,99%" },
      ],
      trafficLabel: "Lonjakan trafik terdeteksi",
      trafficCopy:
        "Kami menskalakan bagian sistem yang tepat sebelum hari yang sibuk berubah menjadi masalah.",
      alertsEyebrow: "Peringatan cerdas",
      alertsCopy:
        "Sinyal yang berguna hadir lebih awal, dengan konteks yang cukup untuk ditindaklanjuti.",
      capabilitiesEyebrow: "Yang kami hadirkan",
      capabilities: [
        {
          title: "Produk digital",
          copy: "Produk yang jelas dan tangguh, terasa matang sejak interaksi pertama.",
        },
        {
          title: "Perangkat lunak khusus",
          copy: "Sistem praktis yang mengurangi hambatan dalam pekerjaan tim sehari-hari.",
        },
        {
          title: "Platform & data",
          copy: "Jaringan penghubung yang menjaga operasi, informasi, dan orang-orang tetap bergerak.",
        },
      ],
    },
    metaTitle: "Akar lokal. Dampak global.",
  },
  en: {
    languageLabel: "Language",
    mainNavigationLabel: "Main navigation",
    mobileNavigationLabel: "Mobile navigation",
    nav: {
      home: "Home",
      capabilities: "Capabilities",
      approach: "Team",
      contact: "Contact",
      portfolio: "Portfolio",
    },
    themeLabel: "Reading Mode",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    themeLightMode: "Light",
    themeDarkMode: "Dark",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    brandHome: "Nggalekco Labs home",
    hero: {
      titleFirst: "Local roots.",
      titleSecond: ["Global impact.", "Useful software.", "Better systems."],
      description:
        "Nggalekco Labs is a hyperlocal software development company based in Trenggalek, East Java — bringing national and global expertise to solve local problems.",
      startProject: "Start a project",
      exploreCapabilities: "Explore capabilities",
    },
    capabilities: {
      title: "The right amount of technology for the job.",
      description:
        "We work closely with people who understand the problem best, shaping software that is useful on day one and ready for what comes next.",
    },
    approach: {
      title: "Close enough to care. Experienced enough to deliver.",
      description:
        "Good software starts with listening. We bring the clarity, craft, and momentum to turn a meaningful problem into a lasting advantage.",
      items: [
        {
          id: "listen",
          title: "Listen closely",
          content:
            "We start with the context around the problem, so the first solution is grounded in the work people already do.",
        },
        {
          id: "shape",
          title: "Shape the right system",
          content:
            "We turn the clearest opportunity into a focused product or system that is useful from day one.",
        },
        {
          id: "deliver",
          title: "Deliver with momentum",
          content:
            "We build for steady progress, leaving you with a foundation that can adapt as the work grows.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "The people behind useful systems.",
      description:
        "We bring care, experience, and curiosity to build software that feels useful from the first day.",
      button: "Meet the team",
    },
    contact: {
      title: "Have a local problem with a bigger opportunity?",
      button: "Say hello",
      location: "Trenggalek, East Java · Indonesia",
    },
    bento: {
      systemsEyebrow: "Systems that keep moving",
      systemsTitle: "Built for the moment, ready for what comes next.",
      engineeringCopy: "Thoughtful engineering, from first sketch to steady operation.",
      reliableEyebrow: "Reliable by design",
      reliableCopy: "Calm foundations for software that has to earn trust every day.",
      connectedEyebrow: "Connected thinking",
      networkStats: [
        { label: "Edge delivery", value: "99.99%" },
        { label: "Core services", value: "99.99%" },
        { label: "Data systems", value: "99.99%" },
      ],
      trafficLabel: "Traffic spike detected",
      trafficCopy: "We scale the right parts of the system before a busy day becomes a problem.",
      alertsEyebrow: "Smart alerts",
      alertsCopy: "Useful signals arrive early, with enough context to act on them.",
      capabilitiesEyebrow: "What we bring",
      capabilities: [
        {
          title: "Digital products",
          copy: "Clear, resilient products that feel considered from the first interaction.",
        },
        {
          title: "Custom software",
          copy: "Practical systems that remove friction from the work your team does every day.",
        },
        {
          title: "Platforms & data",
          copy: "The connective tissue that keeps operations, information, and people moving.",
        },
      ],
    },
    metaTitle: "Local roots. Global impact.",
  },
  jv: {
    languageLabel: "Basa",
    mainNavigationLabel: "Navigasi utama",
    mobileNavigationLabel: "Navigasi seluler",
    nav: {
      home: "Kaca ngarep",
      capabilities: "Kaprigelan",
      approach: "Tim",
      contact: "Kontak",
      portfolio: "Portofolio",
    },
    themeLabel: "Mode maca",
    themeLight: "Ngalih menyang mode padhang",
    themeDark: "Ngalih menyang mode peteng",
    themeLightMode: "Padhang",
    themeDarkMode: "Peteng",
    menuOpen: "Bukak menu",
    menuClose: "Tutup menu",
    brandHome: "Kaca ngarep Nggalekco Labs",
    hero: {
      titleFirst: "Oyod lokal.",
      titleSecond: [
        "Dampak global.",
        "Piranti lunak ingkang migunani.",
        "Sistem ingkang langkung sae.",
      ],
      description:
        "Nggalekco Labs punika perusahaan pangembangan piranti lunak hiper-lokal ingkang mapan wonten ing Trenggalek, Jawa Timur — ngaturaken kawruh saha pengalaman nasional lan global kangge ngrampungaken perkawis lokal.",
      startProject: "Miwiti proyek",
      exploreCapabilities: "Jelajahi kaprigelan",
    },
    capabilities: {
      title: "Teknologi ingkang cekap kangge pakaryan ingkang trep.",
      description:
        "Kawula makarya raket kaliyan para tiyang ingkang paling mangertos perkawisipun, mbentuk piranti lunak ingkang migunani wiwit dinten kapisan lan siap tumrap langkah salajengipun.",
    },
    approach: {
      title: "Caket supados saged nggatekaken. Mumpuni supados saged nglantaraken.",
      description:
        "Piranti lunak ingkang sae kawiwitan saking mirengaken. Kawula ngaturaken kajelasan, kawruh pakaryan, saha daya panggulawenthah kangge ndadosaken perkawis ingkang wigatos dados kaunggulan ingkang lestari.",
      items: [
        {
          id: "listen",
          title: "Mirengaken kanthi permati",
          content:
            "Kawula miwiti saking konteks ing sakitering perkawis, supados solusi kapisan adhedhasar pakaryan ingkang sampun katindakaken.",
        },
        {
          id: "shape",
          title: "Mujudaken sistem ingkang leres",
          content:
            "Kawula ngowahi kalodhangan ingkang paling cetha dados produk utawi sistem ingkang fokus saha migunani wiwit dinten kapisan.",
        },
        {
          id: "deliver",
          title: "Nglantaraken kanthi teteg",
          content:
            "Kawula mbangun kangge kamajuan ingkang ajeg, kanthi landhesan ingkang saged nyelarasaken kaliyan tuwuhipun pakaryan.",
        },
      ],
    },
    team: {
      eyebrow: "Tim",
      title: "Para tiyang ing wingking sistem ingkang migunani.",
      description:
        "Kawula ngaturaken kawigatosan, pengalaman, saha raos kepengin mangertosi kangge mbangun piranti lunak ingkang migunani wiwit dinten kapisan.",
      button: "Mangertosi tim",
    },
    contact: {
      title: "Wonten perkawis lokal kanthi kalodhangan ingkang langkung ageng?",
      button: "Sumangga nyarios",
      location: "Trenggalek, Jawa Wétan · Indonesia",
    },
    bento: {
      systemsEyebrow: "Sistem ingkang tansah lumampah",
      systemsTitle: "Dibangun kangge sapunika, siyap tumrap langkah salajengipun.",
      engineeringCopy:
        "Rekayasa ingkang dipun-gatosaken, wiwit sketsa kapisan dumugi operasional ingkang ajeg.",
      reliableEyebrow: "Andal wiwit dirancang",
      reliableCopy:
        "Landhesan ingkang tentrem kangge piranti lunak ingkang kedah pikantuk kapitadosan saben dinten.",
      connectedEyebrow: "Pamanggih ingkang sambung",
      networkStats: [
        { label: "Pangiriman edge", value: "99,99%" },
        { label: "Layanan inti", value: "99,99%" },
        { label: "Sistem data", value: "99,99%" },
      ],
      trafficLabel: "Lonjakan trafik kapranggokaken",
      trafficCopy:
        "Kawula nyelarasaken pérangan sistem ingkang trep sadèrèngipun dinten ingkang rame dados perkawis.",
      alertsEyebrow: "Pènget cerdas",
      alertsCopy:
        "Pratandha ingkang migunani rawuh langkung wiwitan, kanthi konteks ingkang cekap kangge tumindak.",
      capabilitiesEyebrow: "Ingkang kawula aturaken",
      capabilities: [
        {
          title: "Produk digital",
          copy: "Produk ingkang cetha saha tangguh, sampun katingal mateng wiwit interaksi kapisan.",
        },
        {
          title: "Piranti lunak khusus",
          copy: "Sistem praktis ingkang nyuda alangan wonten ing pakaryan tim saben dinten.",
        },
        {
          title: "Platform & data",
          copy: "Jaringan panyambung ingkang njagi operasi, informasi, saha para tiyang tansah obah.",
        },
      ],
    },
    metaTitle: "Oyod lokal. Dampak global.",
  },
};
