export type Locale = "id" | "en" | "jv";

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "id", label: "Bahasa Indonesia" },
  { value: "en", label: "English" },
  { value: "jv", label: "Basa Jawa" },
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
  id: {
    languageLabel: "Bahasa",
    mainNavigationLabel: "Navigasi utama",
    mobileNavigationLabel: "Navigasi seluler",

    nav: {
      home: "Beranda",
      capabilities: "Keahlian",
      approach: "Pendekatan",
      contact: "Kontak",
      portfolio: "Portofolio",
    },

    themeLabel: "Tampilan",
    themeLight: "Gunakan mode terang",
    themeDark: "Gunakan mode gelap",
    themeLightMode: "Terang",
    themeDarkMode: "Gelap",

    menuOpen: "Buka menu",
    menuClose: "Tutup menu",
    brandHome: "Beranda Nggalekco Labs",

    hero: {
      titleFirst: "Teknologi",
      titleSecond: [
        "yang dibangun dengan pemahaman lokal.",
        "sesuai kebutuhan pengguna.",
        "untuk berkembang bersama.",
      ],
      description:
        "Nggalekco Labs adalah perusahaan pengembangan perangkat lunak yang berbasis di Trenggalek, Jawa Timur. Kami bekerja dekat dengan pengguna untuk memahami kebutuhan, proses kerja, dan konteks setempat sebelum merancang solusi yang tepat.",
      startProject: "Mulai proyek",
      exploreCapabilities: "Lihat keahlian kami",
    },

    capabilities: {
      title: "Solusi yang berangkat dari pemahaman lokal.",
      description:
        "Setiap organisasi memiliki kebutuhan dan cara kerja yang berbeda. Kami memahami konteks pengguna terlebih dahulu, kemudian menentukan teknologi yang paling sesuai untuk mendukungnya.",
    },

    approach: {
      title: "Pemahaman lokal untuk solusi yang tepat.",
      description:
        "Pendekatan hyperlocal kami berangkat dari kedekatan dengan pengguna dan lingkungan tempat mereka bekerja. Kami memahami konteks, kebutuhan, serta proses yang berjalan sebelum menentukan bagaimana teknologi dapat membantu.",

      items: [
        {
          id: "listen",
          title: "Memahami konteks",
          content:
            "Kami mempelajari pengguna, proses kerja, kebutuhan, keterbatasan, dan kondisi setempat sebelum mengambil keputusan teknis.",
        },
        {
          id: "shape",
          title: "Merancang solusi",
          content:
            "Dari pemahaman tersebut, kami merancang sistem yang sesuai dengan kebutuhan tanpa menambahkan kompleksitas yang tidak diperlukan.",
        },
        {
          id: "deliver",
          title: "Membangun bersama",
          content:
            "Kami mengembangkan sistem secara bertahap, mengevaluasinya bersama pengguna, dan menyesuaikannya seiring berkembangnya kebutuhan.",
        },
      ],
    },

    team: {
      eyebrow: "Tim",
      title: "Tim yang memahami sebelum membangun.",
      description:
        "Kami menggabungkan pengalaman teknis dengan pemahaman terhadap pengguna dan konteks setempat untuk menghasilkan perangkat lunak yang tepat guna dan dapat diandalkan.",
      button: "Lihat pendekatan",
    },

    contact: {
      title: "Mari memahami kebutuhan Anda.",
      button: "Hubungi kami",
      location: "Trenggalek, Jawa Timur · Indonesia",
    },

    bento: {
      systemsEyebrow: "Dibangun sesuai kebutuhan",
      systemsTitle: "Teknologi yang mengikuti konteks, bukan sebaliknya.",

      engineeringCopy:
        "Kami memahami bagaimana sebuah sistem akan digunakan sebelum menentukan bagaimana sistem tersebut perlu dibangun.",

      reliableEyebrow: "Andal sejak awal",
      reliableCopy:
        "Fondasi teknis yang baik membantu sistem tetap stabil, aman, dan siap dikembangkan.",

      connectedEyebrow: "Sistem yang terhubung",

      networkStats: [
        {
          label: "Edge delivery",
          value: "99,99%",
        },
        {
          label: "Layanan inti",
          value: "99,99%",
        },
        {
          label: "Sistem data",
          value: "99,99%",
        },
      ],

      trafficLabel: "Peningkatan trafik terdeteksi",
      trafficCopy:
        "Kapasitas sistem dapat disesuaikan seiring meningkatnya penggunaan agar layanan tetap berjalan dengan baik.",

      alertsEyebrow: "Pemantauan sistem",
      alertsCopy:
        "Informasi penting tersedia lebih awal agar permasalahan dapat segera diketahui dan ditangani.",

      capabilitiesEyebrow: "Keahlian kami",

      capabilities: [
        {
          title: "Produk digital",
          copy: "Produk digital yang dirancang berdasarkan kebutuhan pengguna dan konteks penggunaannya.",
        },
        {
          title: "Perangkat lunak khusus",
          copy: "Sistem yang dibangun mengikuti kebutuhan dan proses kerja organisasi.",
        },
        {
          title: "Platform & data",
          copy: "Infrastruktur, integrasi, dan pengelolaan data yang menghubungkan sistem dan proses kerja.",
        },
      ],
    },

    metaTitle: "Teknologi dengan pemahaman lokal.",
  },

  jv: {
    languageLabel: "Basa",
    mainNavigationLabel: "Navigasi utama",
    mobileNavigationLabel: "Navigasi seluler",

    nav: {
      home: "Beranda",
      capabilities: "Keahlian",
      approach: "Pendekatan",
      contact: "Kontak",
      portfolio: "Portofolio",
    },

    themeLabel: "Tampilan",
    themeLight: "Gunakake mode padhang",
    themeDark: "Gunakake mode peteng",
    themeLightMode: "Padhang",
    themeDarkMode: "Peteng",

    menuOpen: "Bukak menu",
    menuClose: "Tutup menu",
    brandHome: "Beranda Nggalekco Labs",

    hero: {
      titleFirst: "Teknologi ingkang dipunbangun",
      titleSecond: [
        "kanthi pemahaman lokal.",
        "manut kabutuhan pengguna.",
        "kangge berkembang sesarengan.",
      ],
      description:
        "Nggalekco Labs minangka perusahaan pangembangan software ingkang mapan wonten ing Trenggalek, Jawa Wétan. Kita makarya cedhak kaliyan pengguna kangge mangertosi kabutuhan, proses kerja, lan konteks setempat sadèrèngipun ngrancang solusi ingkang trep.",
      startProject: "Miwiti proyek",
      exploreCapabilities: "Priksa keahlian kita",
    },

    capabilities: {
      title: "Solusi ingkang dipunwiwiti saking pemahaman lokal.",
      description:
        "Saben organisasi gadhah kabutuhan lan cara kerja ingkang beda. Kita mangertosi konteks pengguna rumiyin, lajeng nemtokaken teknologi ingkang paling trep kangge ndhukung kabutuhan kasebut.",
    },

    approach: {
      title: "Pemahaman lokal, solusi ingkang trep.",
      description:
        "Pendekatan hyperlocal kita dipunwiwiti saking kedekatan kaliyan pengguna lan lingkungan papan piyambakipun makarya. Kita mangertosi konteks, kabutuhan, lan proses ingkang sampun lumampah sadèrèngipun nemtokaken peran teknologi.",

      items: [
        {
          id: "listen",
          title: "Mangertosi konteks",
          content:
            "Kita nyinau pengguna, proses kerja, kabutuhan, keterbatasan, lan kondisi setempat sadèrèngipun nemtokaken keputusan teknis.",
        },
        {
          id: "shape",
          title: "Ngrancang solusi",
          content:
            "Saking pemahaman kasebut, kita ngrancang sistem ingkang trep kaliyan kabutuhan tanpa nambah kerumitan ingkang boten dipunperlokaken.",
        },
        {
          id: "deliver",
          title: "Mbangun sesarengan",
          content:
            "Kita ngembangaken sistem kanthi bertahap, ngevaluasi sesarengan kaliyan pengguna, lan nyelarasaken kaliyan kabutuhan ingkang terus berkembang.",
        },
      ],
    },

    team: {
      eyebrow: "Tim",
      title: "Tim ingkang mangertosi sadèrèngipun mbangun.",
      description:
        "Kita nggabungaken pengalaman teknis kaliyan pemahaman tumrap pengguna lan konteks setempat kangge ngasilaken software ingkang trep lan saged dipunandelaken.",
      button: "Kenali tim kita",
    },

    contact: {
      title: "Sumangga kita mangertosi kabutuhan panjenengan.",
      button: "Hubungi kita",
      location: "Trenggalek, Jawa Wétan · Indonesia",
    },

    bento: {
      systemsEyebrow: "Dibangun manut kabutuhan",
      systemsTitle: "Teknologi ingkang manut konteks, boten kosok wangsulipun.",

      engineeringCopy:
        "Kita mangertosi rumiyin kados pundi sistem badhe dipunginakaken sadèrèngipun nemtokaken kados pundi sistem kasebut kedah dipunbangun.",

      reliableEyebrow: "Andal wiwit awal",
      reliableCopy:
        "Pondasi teknis ingkang sae mbiyantu sistem tetep stabil, aman, lan siap dipunkembangaken.",

      connectedEyebrow: "Sistem ingkang terhubung",

      networkStats: [
        {
          label: "Edge delivery",
          value: "99,99%",
        },
        {
          label: "Layanan inti",
          value: "99,99%",
        },
        {
          label: "Sistem data",
          value: "99,99%",
        },
      ],

      trafficLabel: "Peningkatan trafik terdeteksi",
      trafficCopy:
        "Kapasitas sistem saged dipunsesuaikaken kaliyan tambahing panggunaan supados layanan tetep lumampah kanthi sae.",

      alertsEyebrow: "Pemantauan sistem",
      alertsCopy:
        "Informasi penting saged dipunmangertosi langkung rumiyin supados permasalahan saged enggal dipuntangani.",

      capabilitiesEyebrow: "Keahlian kita",

      capabilities: [
        {
          title: "Produk digital",
          copy: "Produk digital ingkang dipunrancang adhedhasar kabutuhan pengguna lan konteks panggunaanipun.",
        },
        {
          title: "Software khusus",
          copy: "Sistem ingkang dipunbangun manut kabutuhan lan proses kerja organisasi.",
        },
        {
          title: "Platform & data",
          copy: "Infrastruktur, integrasi, lan pengelolaan data ingkang nyambungaken sistem kaliyan proses kerja.",
        },
      ],
    },

    metaTitle: "Teknologi kanthi pemahaman lokal.",
  },
};
