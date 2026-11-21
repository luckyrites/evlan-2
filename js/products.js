/**
 * ELVAN FOODS - PRODUCT CATALOG DATA
 * Authentic Organic Sicilian Citrus & Artisanal Pantry Creations
 */

export const PRODUCTS = [
  {
    id: "marmellata-limone-siracusa",
    sku: "ELV-MAR-01",
    category: "marmalades",
    badge: "IGP Certified",
    badgeType: "citrus",
    price: 9.80,
    weight: "220g",
    rating: 4.9,
    reviewsCount: 142,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "November – May",
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Artisanal Organic Siracusa Lemon Marmalade",
    en: {
      name: "Organic Siracusa Lemon Marmalade IGP",
      subname: "Femminello Siracusano • Slow-Cooked with Peels",
      shortDesc: "Handcrafted from tree-ripened Femminello lemons with fine julienne peel ribbons. Intense aromatic brightness with balanced crisp acidity.",
      description: "Harvested directly from our groves along the Anapo river in Syracuse. The Femminello lemon is world-renowned for having the highest concentration of fragrant essential oils. We slow-cook the fruit at 55°C under low pressure without commercial pectin, retaining natural vitamin C and the pure brightness of the Sicilian sun.",
      tastingNotes: "Vibrant zesty upfront, delicate floral lemon blossom, gentle pleasant bitterness on the finish.",
      pairings: ["Aged Sicilian Caciocavallo", "Fresh Sheep's Milk Ricotta", "Morning Brioche col Tuppo", "Roasted Wild Sea Bass glaze"],
      ingredients: "Organic Siracusa IGP Lemons with peel (65%), Organic Italian Cane Sugar (35%). Made with 100g of fruit per 100g.",
      nutritional: { energy: "185 kcal", carbs: "44g", sugars: "42g", fat: "0.2g", fiber: "2.4g" }
    },
    it: {
      name: "Marmellata di Limone di Siracusa IGP Bio",
      subname: "Femminello Siracusano • Con Scorze a Filetto",
      shortDesc: "Lavorata artigianalmente da limoni Femminello raccolti a mano con scorzette fini. Aromi intensi e viva freschezza.",
      description: "Coltivata nei nostri agrumeti lungo la valle dell'Anapo a Siracusa. Il limone Femminello è celebre per l'elevato contenuto di oli essenziali nobili. La cottura sottovuoto a bassa temperatura (55°C) preserva la fragranza del frutto appena colto senza l'aggiunta di pectina industriale.",
      tastingNotes: "Note agrumate vivaci, sentori di zagara fiorita e un finale delicatamente aromatico.",
      pairings: ["Caciocavallo Ragusano DOP", "Ricotta fresca di pecora", "Brioche col tuppo calda", "Glassatura per spigola al forno"],
      ingredients: "Limoni di Siracusa IGP Biologici con scorza (65%), Zucchero di canna bio (35%). Frutta utilizzata: 100g per 100g.",
      nutritional: { energy: "185 kcal", carbs: "44g", sugars: "42g", fat: "0.2g", fiber: "2.4g" }
    },
    sensory: {
      acidity: 88,
      sweetness: 60,
      bitterness: 35,
      aroma: 95
    }
  },
  {
    id: "marmellata-arance-rosse-moro",
    sku: "ELV-MAR-02",
    category: "marmalades",
    badge: "Signature Reserve",
    badgeType: "burgundy",
    price: 10.50,
    weight: "220g",
    rating: 5.0,
    reviewsCount: 218,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "January – March",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Organic Blood Orange Marmalade Moro and Tarocco",
    en: {
      name: "Organic Moro Blood Orange Marmalade",
      subname: "Volcanic Crimson Pigment • Anthocyanin-Rich",
      shortDesc: "Deep ruby marmalade made from Mount Etna microclimate blood oranges. Rich berry-like undertones with caramelized citrus nuances.",
      description: "Our signature preserve. The sharp day-to-night thermal swings between Mount Etna and the Syracuse plain stimulate natural anthocyanin pigments, giving the Moro orange its intense crimson flesh. A sensory feast that combines caramelized peel richness with wild raspberry nuances.",
      tastingNotes: "Candied blood orange peel, wild pomegranate, black cherry warmth, silky smooth finish.",
      pairings: ["Castelmagno or Gorgonzola Dolce", "70% Modica Dark Chocolate", "Butter-toasted Sourdough", "Duck Breast Glaze"],
      ingredients: "Organic Moro Blood Oranges with peel (70%), Organic Cane Sugar (30%). Prepared with 110g of fruit per 100g.",
      nutritional: { energy: "192 kcal", carbs: "46g", sugars: "44g", fat: "0.1g", fiber: "2.1g" }
    },
    it: {
      name: "Marmellata di Arance Rosse Moro Bio",
      subname: "Antociani dell'Etna • Colore Rubino Intenso",
      shortDesc: "Marmellata rubino scuro da arance Moro coltivate alle falde del vulcano. Note di frutti di bosco e caramello agrumato.",
      description: "La nostra creazione simbolo. L'escursione termica tra l'Etna e la piana siracusana esalta la naturale pigmentazione antocianica della varietà Moro. Una marmellata vellutata e complessa, ricca di antiossidanti naturali e priva di addensanti artificiali.",
      tastingNotes: "Scorza candita naturale, note di melograno e amarena con una trama setosa e avvolgente.",
      pairings: ["Formaggi erborinati dolci", "Cioccolato di Modica 70%", "Pane rustico a lievitazione naturale", "Carni nobili e selvaggina"],
      ingredients: "Arance Rosse Moro Biologiche con scorza (70%), Zucchero di canna bio (30%). Frutta utilizzata: 110g per 100g.",
      nutritional: { energy: "192 kcal", carbs: "46g", sugars: "44g", fat: "0.1g", fiber: "2.1g" }
    },
    sensory: {
      acidity: 65,
      sweetness: 78,
      bitterness: 22,
      aroma: 92
    }
  },
  {
    id: "confettura-mandarino-tardivo-ciaculli",
    sku: "ELV-MAR-03",
    category: "marmalades",
    badge: "Rare Heirloom",
    badgeType: "citrus",
    price: 11.20,
    weight: "220g",
    rating: 4.9,
    reviewsCount: 89,
    isOrganic: true,
    isIGP: false,
    harvestPeriod: "February – April",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Late Ciaculli Mandarin Jam with Zest",
    en: {
      name: "Late Ciaculli Mandarin Jam with Zest",
      subname: "Slow Food Presidium Heritage • Intoxicating Perfume",
      shortDesc: "Crafted from late-ripening Sicilian mandarins prized for extraordinary aromatic bouquet and delicate sweet character.",
      description: "The Tardivo di Ciaculli ripens naturally between February and April under pure sunshine. Its thin skin is deeply saturated with limonene and rare terpenes. We gently hand-slice the whole fruit, capturing its heady aromatic floral soul in every jar.",
      tastingNotes: "Exotic floral mandarin blossom, honeysuckle, gentle sweet citrus with zero harsh bitterness.",
      pairings: ["Goat Cheese Crotin", "Sicilian Cannolo filling", "Panna Cotta", "Fine Champagne Cocktail"],
      ingredients: "Organic Late Ciaculli Mandarins (72%), Organic Cane Sugar (28%). Prepared with 105g fruit per 100g.",
      nutritional: { energy: "188 kcal", carbs: "45g", sugars: "43g", fat: "0.2g", fiber: "1.9g" }
    },
    it: {
      name: "Confettura di Mandarino Tardivo di Ciaculli",
      subname: "Presidio della Biodiversità • Profumo Inebriante",
      shortDesc: "Da mandarini a maturazione tardiva rinomati per il bouquet aromatico straordinario e la dolcezza naturale.",
      description: "Il Tardivo di Ciaculli matura con calma tra febbraio e aprile sotto il sole pieno. La buccia sottile e ricchissima di terpeni rari dona a questa confettura un profumo che riempie la stanza non appena si svita il sigillo di ceralacca.",
      tastingNotes: "Zagara in fiore, sentori di miele di zagara e mandarino fresco senza alcuna asprezza pungente.",
      pairings: ["Caprino fresco", "Farcitura di cannoli siciliani", "Panna cotta alla vaniglia", "Cocktail con bollicine"],
      ingredients: "Mandarini Tardivi di Ciaculli Bio (72%), Zucchero di canna bio (28%). Frutta: 105g per 100g.",
      nutritional: { energy: "188 kcal", carbs: "45g", sugars: "43g", fat: "0.2g", fiber: "1.9g" }
    },
    sensory: {
      acidity: 45,
      sweetness: 85,
      bitterness: 15,
      aroma: 98
    }
  },
  {
    id: "crema-pistacchio-bronte-dop",
    sku: "ELV-CRE-01",
    category: "creams",
    badge: "DOP Bronte 65%",
    badgeType: "olive",
    price: 14.50,
    weight: "200g",
    rating: 5.0,
    reviewsCount: 340,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "September (Biennial)",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Pure Bronte DOP Pistachio Cream",
    en: {
      name: "Stone-Ground Bronte DOP Pistachio Cream",
      subname: "65% Green Pistachio • Organic Cold-Pressed Olive Oil",
      shortDesc: "Silky, emerald-hued pistachio spread crafted from volcanic-soil nuts, slow roasted and stone-milled with extra virgin olive oil.",
      description: "Grown on the jagged lava slopes of Bronte where mechanical harvesting is impossible. Every pistachio is hand-picked at peak ripeness. We slow stone-grind the nuts for 18 hours until friction naturally releases creamy plant butter, finishing with our cold-pressed EVO oil and a hint of Trapani sea salt.",
      tastingNotes: "Intense toasted volcanic green nut, buttery smooth texture, mineral finish with zero palm oil.",
      pairings: ["Fresh Brioche", "Artisanal Gelato", "Morning Crepes", "Gourmet Panettone Spread"],
      ingredients: "Roasted Bronte DOP Pistachios (65%), Organic Cane Sugar, Organic Extra Virgin Olive Oil Elvan Foods (12%), Trapani Sea Salt.",
      nutritional: { energy: "560 kcal", carbs: "38g", sugars: "32g", fat: "41g", fiber: "6.8g" }
    },
    it: {
      name: "Crema di Pistacchio di Bronte DOP a Pietra",
      subname: "65% Pistacchio Verde • Olio EVO Biologico",
      shortDesc: "Vellutata e smeraldina, ricavata dai pistacchi delle lave etnee macinati a freddo con il nostro olio extravergine.",
      description: "Cresciuto sulle ripide balze laviche di Bronte dove ogni frutto viene staccato a mano. La lenta raffinazione a pietra per 18 ore rilascia i burri naturali del pistacchio verde smeraldo, uniti all'olio extravergine Elvan Foods senza alcun grasso idrogenato o olio di palma.",
      tastingNotes: "Gusto pieno di pistacchio tostato, mineralità vulcanica, consistenza vellutata e persistente.",
      pairings: ["Brioche col tuppo", "Gelato fior di latte", "Farcitura di croissant", "Degustazione al cucchiaio"],
      ingredients: "Pistacchio di Bronte DOP tostato (65%), Zucchero di canna bio, Olio Extra Vergine di Oliva Bio Elvan Foods (12%), Sale marino di Trapani.",
      nutritional: { energy: "560 kcal", carbs: "38g", sugars: "32g", fat: "41g", fiber: "6.8g" }
    },
    sensory: {
      acidity: 10,
      sweetness: 72,
      bitterness: 10,
      aroma: 94
    }
  },
  {
    id: "pasta-mandorla-avola-bio",
    sku: "ELV-CRE-02",
    category: "creams",
    badge: "Avola Tuono",
    badgeType: "citrus",
    price: 12.80,
    weight: "200g",
    rating: 4.8,
    reviewsCount: 94,
    isOrganic: true,
    isIGP: false,
    harvestPeriod: "August – September",
    image: "https://images.unsplash.com/photo-1508061252445-8450f3ff91f1?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Artisanal Avola Sweet Almond Paste",
    en: {
      name: "Avola Sweet Almond Silk Cream",
      subname: "70% Single-Estate Tuono Almonds • Infused with Lemon Blossom",
      shortDesc: "Delicate, velvety spread made from cold-milled Syracuse almonds kissed with cold-pressed lemon peel essence.",
      description: "Our almonds grow adjacent to the citrus groves, absorbing the microclimate of the Ionian sea breeze. The Tuono variety gives an incomparable sweetness and fine marzipan elegance without bitterness. Stone-ground and lightly emulsified with floral citrus honey.",
      tastingNotes: "Marzipan elegance, sweet almond milk essence, delicate citrus blossom undertone.",
      pairings: ["Espresso Macchiato", "Fresh Figs", "Oatmeal Bowl", "Tart Shell Base"],
      ingredients: "Organic Syracuse Tuono Almonds (70%), Organic Cane Sugar, Organic Citrus Blossom Honey, Cold-pressed Lemon Oil.",
      nutritional: { energy: "545 kcal", carbs: "36g", sugars: "29g", fat: "39g", fiber: "7.2g" }
    },
    it: {
      name: "Pasta Reale di Mandorla di Avola Bio",
      subname: "70% Mandorle Tuono • Con Olio Essenziale di Limone",
      shortDesc: "Delicata crema di mandorle siracusane macinate a freddo con un tocco aromatico di scorza di limone.",
      description: "Le nostre mandorle fioriscono a febbraio accanto agli agrumeti, nutrendosi dell'aria iodata del Mar Ionio. La cultivar Tuono dona una dolcezza nobile senza note amare. Macinata lentamente a pietra ed emulsionata con miele di zagara.",
      tastingNotes: "Eleganza di marzapane fresco, latte di mandorla e sfumatura fiorita di agrumi.",
      pairings: ["Caffè espresso siciliano", "Fichi freschi settembrini", "Biscotti di frolla", "Crostata di frutta"],
      ingredients: "Mandorle Tuono di Siracusa Bio (70%), Zucchero di canna bio, Miele di zagara biologico, Olio essenziale di limone bio.",
      nutritional: { energy: "545 kcal", carbs: "36g", sugars: "29g", fat: "39g", fiber: "7.2g" }
    },
    sensory: {
      acidity: 15,
      sweetness: 80,
      bitterness: 5,
      aroma: 86
    }
  },
  {
    id: "pesto-trapanese-agrumi-basilico",
    sku: "ELV-PES-01",
    category: "creams",
    badge: "Artisan Savory",
    badgeType: "olive",
    price: 9.90,
    weight: "190g",
    rating: 4.9,
    reviewsCount: 112,
    isOrganic: true,
    isIGP: false,
    harvestPeriod: "June – October",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Trapanese Citrus and Fresh Basil Pesto",
    en: {
      name: "Trapanese Citrus & Crushed Almond Pesto",
      subname: "Sun-Ripened Lemons • Sicilian Basil • Extra Virgin Olive Oil",
      shortDesc: "An invigorating coastal pesto blending fresh basil, sweet crushed almonds, garlic, and cold-pressed citrus zest in EVO oil.",
      description: "A tribute to western Sicily's culinary heritage reimagined with Syracuse citrus grove bounty. Hand-crushed raw almonds meet fresh sweet basil and grated candied lemon rind in our own single-estate olive oil. Ready to toss with traditional Busiate pasta.",
      tastingNotes: "Fresh herbaceous basil, nutty almond creaminess, crisp citrus lift, savory sea salt warmth.",
      pairings: ["Handmade Busiate Pasta", "Grilled Swordfish", "Burrata Pugliese", "Bruschetta Tartines"],
      ingredients: "Organic Extra Virgin Olive Oil (45%), Fresh Basil (28%), Crushed Almonds (15%), Organic Siracusa Lemon Zest (7%), Garlic, Trapani Sea Salt.",
      nutritional: { energy: "490 kcal", carbs: "6g", sugars: "3g", fat: "52g", fiber: "3.5g" }
    },
    it: {
      name: "Pesto Trapanese agli Agrumi e Mandorle",
      subname: "Basilico Fresco • Scorze di Limone • Olio Extravergine",
      shortDesc: "Vibrante pesto estivo che unisce basilico appena raccolto, mandorle dolci tritate e scorzette di limone in olio EVO.",
      description: "Omaggio alla grande tradizione costiera siciliana arricchita dalla freschezza degli agrumeti siracusani. Il basilico fresco incontra le mandorle Tuono macinate e la scorza grattugiata dei nostri limoni Femminello.",
      tastingNotes: "Basilico fresco balsamico, mandorla croccante e la freschezza pulita della scorza di limone.",
      pairings: ["Busiate fresche trapanesi", "Pesce spada alla griglia", "Burrata fresca", "Crostini di pane di grano duro"],
      ingredients: "Olio Extra Vergine di Oliva Bio (45%), Basilico fresco (28%), Mandorle tritate (15%), Scorza di limone di Siracusa (7%), Aglio rosso, Sale marino.",
      nutritional: { energy: "490 kcal", carbs: "6g", sugars: "3g", fat: "52g", fiber: "3.5g" }
    },
    sensory: {
      acidity: 60,
      sweetness: 30,
      bitterness: 15,
      aroma: 96
    }
  },
  {
    id: "arance-rosse-moro-cassa-fresca",
    sku: "ELV-FRE-01",
    category: "fresh",
    badge: "Direct From Grove",
    badgeType: "citrus",
    price: 24.00,
    weight: "5 kg Crate",
    rating: 5.0,
    reviewsCount: 420,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "January – March",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Fresh Organic Blood Oranges Moro and Tarocco Crate",
    en: {
      name: "Fresh Organic Blood Oranges Box (5kg)",
      subname: "Direct Harvest • Dispatched within 24 Hours of Plucking",
      shortDesc: "Unwaxed, edible-peel certified organic Moro & Tarocco blood oranges packed in eco-straw wooden orchard crates.",
      description: "Enjoy citrus as nature intended. Hand-clipped with pruning shears straight into wooden field boxes, never washed with synthetic antifungals, never waxed. High juice yield (over 45%), ideal for antioxidant morning pressing or zesting over desserts.",
      tastingNotes: "Explosive sweet-tart juice, berry notes, crisp aromatic oils in the peel.",
      pairings: ["Morning Cold-Pressed Juice", "Fennel & Black Olive Sicilian Salad", "Cocktail Mixology", "Citrus Duck"],
      ingredients: "100% Certified Organic Sicilian Blood Oranges (Moro / Tarocco). Untreated, edible peel.",
      nutritional: { energy: "47 kcal/100g", carbs: "11.7g", sugars: "9.3g", fat: "0.1g", fiber: "2.4g" }
    },
    it: {
      name: "Cassa Arance Rosse Biologiche (5kg)",
      subname: "Spedizione entro 24 ore dalla raccolta sull'albero",
      shortDesc: "Arance Moro e Tarocco 100% bio con buccia edibile, raccolte a mano e spedite nella classica cassetta in legno e paglia.",
      description: "Il sapore autentico dell'agrume appena staccato dal ramo. Raccolte con forbici a mano, non trattate in superficie con cere o conservanti di sintesi chimica. Ricchissime di succo antocianico e oli essenziali nella buccia profumatissima.",
      tastingNotes: "Succo esplosivo tra dolcezza e acidità vivace, note di lampone e buccia aromaticamente balsamica.",
      pairings: ["Spremuta fresca mattutina", "Insalata siciliana con finocchi e olive nere", "Cocktail signature", "Canditura casalinga"],
      ingredients: "100% Arance Rosse di Sicilia Bio (Moro/Tarocco). Buccia edibile non trattata.",
      nutritional: { energy: "47 kcal/100g", carbs: "11.7g", sugars: "9.3g", fat: "0.1g", fiber: "2.4g" }
    },
    sensory: {
      acidity: 75,
      sweetness: 80,
      bitterness: 10,
      aroma: 99
    }
  },
  {
    id: "limoni-siracusa-femminello-cassa",
    sku: "ELV-FRE-02",
    category: "fresh",
    badge: "Tree-Ripened",
    badgeType: "citrus",
    price: 22.00,
    weight: "4 kg Crate",
    rating: 4.9,
    reviewsCount: 185,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "November – May",
    image: "https://images.unsplash.com/photo-1568569350062-ebfa3cb195df?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Organic Siracusa IGP Lemons Crate",
    en: {
      name: "Siracusa IGP Organic Lemons Crate (4kg)",
      subname: "Femminello Siracusano • 34% Higher Juice Yield",
      shortDesc: "Treasured across Europe for perfumed zest and abundant, clean-tasting citric juice. 100% untreated peel.",
      description: "Siracusa Femminello accounts for the finest Italian lemon heritage. Its skin yields exquisite essential oils for Limoncello, marinades, and baking. Cultivated using regenerative organic biodynamics under the Sicilian sunshine.",
      tastingNotes: "Electric citric brightness, floral zest perfume, clean mineral finish without sharp astringency.",
      pairings: ["Authentic Limoncello Liqueur", "Cured Fish Carpaccio", "Lemon Tart Meringue", "Daily Detox Infusion"],
      ingredients: "100% Certified Organic Siracusa IGP Lemons. Edible untreated peel.",
      nutritional: { energy: "29 kcal/100g", carbs: "9.3g", sugars: "2.5g", fat: "0.3g", fiber: "2.8g" }
    },
    it: {
      name: "Cassa Limoni di Siracusa IGP Bio (4kg)",
      subname: "Femminello Siracusano • Ricchissimo di Succo",
      shortDesc: "Il limone più nobile d'Italia, celebre per la buccia profumatissima e il succo limpido e minerale. Buccia edibile.",
      description: "Il Femminello Siracusano è rinomato in tutta Europa per la qualità dei suoi oli essenziali, ideali per la preparazione del vero Limoncello, marinature di mare e pasticceria fine. Raccolto su ordinazione nei nostri frutteti.",
      tastingNotes: "Acidità pura ed elettrizzante, profumo inebriante di scorza fresca, persistenza minerale.",
      pairings: ["Limoncello artigianale", "Carpaccio di spigola o ricciola", "Torta al limone meringata", "Acqua aromatizzata"],
      ingredients: "100% Limoni di Siracusa IGP Biologici. Buccia edibile naturale.",
      nutritional: { energy: "29 kcal/100g", carbs: "9.3g", sugars: "2.5g", fat: "0.3g", fiber: "2.8g" }
    },
    sensory: {
      acidity: 96,
      sweetness: 25,
      bitterness: 30,
      aroma: 97
    }
  },
  {
    id: "olio-evo-nocellara-bio",
    sku: "ELV-OIL-01",
    category: "oils",
    badge: "Cold-Extracted",
    badgeType: "olive",
    price: 18.50,
    weight: "500 ml Glass",
    rating: 5.0,
    reviewsCount: 165,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "October – November",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Elvan Foods Organic Extra Virgin Olive Oil Monocultivar",
    en: {
      name: "Organic Monocultivar EVO Oil (500ml)",
      subname: "Nocellara del Belice • Cold-Pressed Within 6 Hours",
      shortDesc: "Single-estate extra virgin olive oil cold-extracted at 22°C. Herbaceous notes of green tomato leaf and fresh artichoke heart.",
      description: "Harvested by hand from centuries-old olive trees intercropped between our citrus groves. The olives are rushed to the continuous-cycle cold mill within 6 hours of picking to guarantee polyphenol integrity (>520 mg/kg) and negligible acidity (<0.18%).",
      tastingNotes: "Freshly cut grass, green tomato leaf, medium peppery punch with artichoke finish.",
      pairings: ["Warm Crusty Bread", "Burrata & Citrus Salad", "Grilled Fiorentina Steak", "Vanilla Ice Cream drizzle"],
      ingredients: "100% Cold-Pressed Organic Extra Virgin Olive Oil (Monocultivar Nocellara del Belice).",
      nutritional: { energy: "824 kcal/100ml", carbs: "0g", sugars: "0g", fat: "91.6g", fiber: "0g" }
    },
    it: {
      name: "Olio Extra Vergine di Oliva Bio Monocultivar (500ml)",
      subname: "Nocellara del Belice • Estratto a Freddo in 6 Ore",
      shortDesc: "Olio EVO di tenuta estratto a freddo a 22°C. Spiccati sentori erbacei di pomodoro verde e carciofo.",
      description: "Raccolto a mano dagli olivi secolari che ombreggiano gli agrumi della tenuta. La frangitura entro 6 ore dalla raccolta garantisce un patrimonio polifenolico superiore a 520 mg/kg e un'acidità libera inferiore allo 0,18%.",
      tastingNotes: "Erba sfalciata, foglia di pomodoro verde, amaro elegante e un finale piacevolmente piccante.",
      pairings: ["Pane casereccio caldo", "Insalata di agrumi e finocchi", "Zuppe di legumi siciliani", "Filo a crudo su carni"],
      ingredients: "100% Olio Extra Vergine di Oliva Biologico (Nocellara del Belice). Estratto a freddo.",
      nutritional: { energy: "824 kcal/100ml", carbs: "0g", sugars: "0g", fat: "91.6g", fiber: "0g" }
    },
    sensory: {
      acidity: 20,
      sweetness: 10,
      bitterness: 65,
      aroma: 92
    }
  },
  {
    id: "cofanetto-gran-cru-elvan",
    sku: "ELV-GFT-01",
    category: "oils",
    badge: "Luxury Gift Chest",
    badgeType: "burgundy",
    price: 58.00,
    weight: "Complete Vault",
    rating: 5.0,
    reviewsCount: 76,
    isOrganic: true,
    isIGP: true,
    harvestPeriod: "Year-Round Curation",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Elvan Foods Grand Cru Sicilian Citrus Gift Vault",
    en: {
      name: "The Elvan Foods Grand Cru Sicilian Vault",
      subname: "Artisan Preserves, Pistachio Cream, EVO Oil & Citrus Tea",
      shortDesc: "A handcrafted wooden keepsake box containing our master cellar creations, tied with natural Sicilian linen rope and wax seal.",
      description: "The ultimate journey into Sicilian gastronomy. Contains 1x Siracusa Lemon Marmalade (220g), 1x Moro Blood Orange Marmalade (220g), 1x Bronte Pistachio Cream (200g), 1x Nocellara EVO Oil (500ml), and a jar of sun-dried orange blossom herbal infusion.",
      tastingNotes: "A complete tasting spectrum from bright citrus acidity to opulent velvety pistachio and olive grove richness.",
      pairings: ["Gourmet Holiday Banquets", "Luxury Corporate Gifting", "Sicilian Culinary Discovery Tasting"],
      ingredients: "Curated selection of our finest certified organic preserves, spreads, and cold-pressed oil in sustainable luxury packaging.",
      nutritional: { energy: "Assorted gourmet values", carbs: "See items", sugars: "See items", fat: "See items", fiber: "See items" }
    },
    it: {
      name: "Cofanetto Gran Cru Elvan Foods",
      subname: "Tre Marmellate di Tenuta, Crema Pistacchio, Olio EVO e Infuso",
      shortDesc: "Cassetta artigianale in legno con i capolavori della dispensa Elvan Foods, sigillata con corda di lino e ceralacca.",
      description: "L'esperienza completa del gusto siciliano. Include: 1x Marmellata Limone Siracusa (220g), 1x Marmellata Arance Moro (220g), 1x Crema Pistacchio Bronte (200g), 1x Olio EVO Nocellara (500ml) e un vaso di fiori di zagara essiccati al sole per infusi.",
      tastingNotes: "Tutti i profumi della tenuta: dalla freschezza vivace degli agrumi alla morbidezza del pistacchio fino alla fragranza dell'olio novo.",
      pairings: ["Grandi occasioni conviviali", "Regali esclusivi d'autore", "Degustazione sensoriale completa"],
      ingredients: "Selezione delle migliori specialità biologiche certificate in confezione regalo sostenibile riutilizzabile.",
      nutritional: { energy: "Valori assortiti", carbs: "Vedi singoli prodotti", sugars: "Vedi singoli prodotti", fat: "Vedi singoli", fiber: "Vedi" }
    },
    sensory: {
      acidity: 70,
      sweetness: 75,
      bitterness: 30,
      aroma: 99
    }
  }
];

export const CATEGORIES = [
  { id: "all", en: "All Pantry Creations", it: "Tutte le Creazioni" },
  { id: "marmalades", en: "Artisanal Marmalades", it: "Marmellate & Confetture" },
  { id: "creams", en: "Gourmet Creams & Pestos", it: "Creme & Pesti d'Autore" },
  { id: "fresh", en: "Fresh Orchard Harvest", it: "Raccolta Fresca dell'Orto" },
  { id: "oils", en: "EVO Oil & Gift Vaults", it: "Olio Extra Vergine & Cofanetti" },
];

export const FLAVOR_PROFILES = [
  {
    id: "zesty",
    en: { name: "Zesty & Sun-Bright", desc: "Electric citrus acidity with floral lemon and mandarin blossom top-notes." },
    it: { name: "Vivace & Solare", desc: "Spiccata freschezza agrumata con sentori floreali di zagara e mandarino." },
    color: "#E84E1B",
    matchIds: ["marmellata-limone-siracusa", "confettura-mandarino-tardivo-ciaculli", "limoni-siracusa-femminello-cassa"]
  },
  {
    id: "crimson",
    en: { name: "Crimson & Berry Sweet", desc: "Caramelized blood orange rind with wild forest fruit and pomegranate undertones." },
    it: { name: "Rubino & Frutti di Bosco", desc: "Scorza caramellata di arance rosse con sfumature di melograno e frutti silvestri." },
    color: "#762530",
    matchIds: ["marmellata-arance-rosse-moro", "arance-rosse-moro-cassa-fresca", "cofanetto-gran-cru-elvan"]
  },
  {
    id: "velvety",
    en: { name: "Velvety & Volcanic Nut", desc: "Opulent stone-ground roasted nuts with creamy natural plant butters and honey." },
    it: { name: "Vellutato & Vulcanico", desc: "Tostatura lenta a pietra di frutta secca vulcanica con burri naturali e miele." },
    color: "#2D4A3E",
    matchIds: ["crema-pistacchio-bronte-dop", "pasta-mandorla-avola-bio"]
  },
  {
    id: "herbaceous",
    en: { name: "Herbaceous & Savory", desc: "Cold-pressed extra virgin olive oil with freshly crushed basil and tomato leaf." },
    it: { name: "Erbaceo & Saporito", desc: "Olio extravergine franto a freddo con basilico pesto fresco e pomodoro verde." },
    color: "#C86446",
    matchIds: ["pesto-trapanese-agrumi-basilico", "olio-evo-nocellara-bio"]
  }
];

export const HARVEST_CALENDAR = [
  { month: "Jan", fruitEn: "Moro & Tarocco Blood Oranges", fruitIt: "Arance Moro & Tarocco", active: true },
  { month: "Feb", fruitEn: "Tarocco & Ciaculli Mandarin", fruitIt: "Tarocco & Mandarino Ciaculli", active: true },
  { month: "Mar", fruitEn: "Late Ciaculli & Primofiore Lemons", fruitIt: "Tardivo Ciaculli & Limoni Primofiore", active: true },
  { month: "Apr", fruitEn: "Spring Blossom Honey & Bianchetto", fruitIt: "Miele di Zagara & Bianchetto", active: false },
  { month: "May", fruitEn: "Verdello Summer Lemons", fruitIt: "Limoni Verdelli Estivi", active: false },
  { month: "Jun", fruitEn: "Citrus Grove Irrigation & Pruning", fruitIt: "Cura delle chiome e irrigazione", active: false },
  { month: "Jul", fruitEn: "Sun-Drying of Organic Pachino", fruitIt: "Essiccazione al sole dei pomodori", active: false },
  { month: "Aug", fruitEn: "Tuono & Pizzuta Almond Harvest", fruitIt: "Raccolta Mandorle Tuono & Pizzuta", active: false },
  { month: "Sep", fruitEn: "Bronte Pistachio & Pomegranate", fruitIt: "Pistacchio di Bronte & Melograni", active: false },
  { month: "Oct", fruitEn: "Nocellara Olive Cold-Pressing", fruitIt: "Frangitura Olive Nocellara del Belice", active: false },
  { month: "Nov", fruitEn: "Femminello Siracusa Lemon Prime", fruitIt: "Limone Femminello di Siracusa IGP", active: true },
  { month: "Dec", fruitEn: "Navelina & Early Blood Oranges", fruitIt: "Arance Navelina & Moro Novelle", active: true },
];
