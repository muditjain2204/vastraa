export interface ProductItem {
  id: string;
  category: string;
  subCategory: 'men' | 'women' | 'accessories' | 'couture';
  title: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  displayPrice: string;
  image: string;
  description: string;
  fabric: string;
  details: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  frameIndex?: number; // 1 to 4 if featured in 3D tunnel
  side?: 'left' | 'right';
}

export interface ShowcasePair {
  frameNumber: string; // "01", "02", "03", "04"
  leftItem: ProductItem;
  rightItem: ProductItem;
  themeTitle: string;
  zDistance: number;
}

export const SHOWCASE_PAIRS: ShowcasePair[] = [
  {
    frameNumber: "01",
    themeTitle: "THE SIGNATURE SILHOUETTES",
    zDistance: 0,
    leftItem: {
      id: "men-01",
      category: "MEN",
      subCategory: "men",
      title: "The Riviera Overshirt Ensemble",
      badge: "Iconic Look",
      price: 285,
      originalPrice: 340,
      currency: "USD",
      displayPrice: "$285",
      image: "/images/models/men_01.jpg",
      description: "Tailored in a luxurious Italian linen-cotton blend. Features an effortless relaxed overshirt silhouette, soft combed t-shirt, relaxed pleated wide-leg trousers, and hand-finished minimalist sneakers.",
      fabric: "100% Breathable Italian Linen & Organic Combed Cotton",
      details: [
        "Unstructured soft drape collar",
        "Deep patch utility chest pocket",
        "Double pleat fluid trousers with hidden drawstring",
        "Dry clean or delicate cold wash"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Oatmeal Sand", "Chalk White", "Espresso"],
      inStock: true,
      frameIndex: 1,
      side: "left"
    },
    rightItem: {
      id: "women-01",
      category: "WOMEN",
      subCategory: "women",
      title: "Crimson Heritage Silk Lehenga Set",
      badge: "Signature Collection",
      price: 540,
      originalPrice: 620,
      currency: "USD",
      displayPrice: "$540",
      image: "/images/models/women_01.jpg",
      description: "A dramatic, floor-sweeping vermilion silhouette featuring an intricately hand-embroidered crop choli, long sleeves with gold bullion accents, and voluminous pleated palazzo trousers.",
      fabric: "Pure Raw Silk Crepe & Chiffon Drapes",
      details: [
        "Hand-rendered antique gold zardozi and beadwork",
        "High-waisted knife-pleated palazzo flare",
        "Concealed side zipper with gold filigree latkan",
        "Specialist bridal dry clean only"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["Crimson Red", "Terracotta Gold", "Royal Emerald"],
      inStock: true,
      frameIndex: 1,
      side: "right"
    }
  },
  {
    frameNumber: "02",
    themeTitle: "AUTUMN ARCHITECTURAL EDIT",
    zDistance: -20,
    leftItem: {
      id: "men-02",
      category: "NEW ARRIVALS",
      subCategory: "men",
      title: "Espresso Suede Field Jacket & Trousers",
      badge: "New Release",
      price: 390,
      originalPrice: 450,
      currency: "USD",
      displayPrice: "$390",
      image: "/images/models/men_02.jpg",
      description: "Crafted from buttery soft goatskin suede in rich espresso brown, paired with crisp ivory double-pleated cotton trousers and handcrafted two-tone leather court sneakers.",
      fabric: "Fine Goatskin Suede & Egyptian Giza Cotton",
      details: [
        "Quad utility box-pleat pockets with horn buttons",
        "Bemberg cupro satin interior lining",
        "High-rise structured waist with side adjusters",
        "Leather specialist care"
      ],
      sizes: ["M", "L", "XL"],
      colors: ["Espresso Brown", "Tobacco Tan", "Midnight Noir"],
      inStock: true,
      frameIndex: 2,
      side: "left"
    },
    rightItem: {
      id: "women-02",
      category: "ETHNIC WEAR",
      subCategory: "women",
      title: "Terracotta Antique Anarkali Gown",
      badge: "Artisanal Craft",
      price: 620,
      originalPrice: 700,
      currency: "USD",
      displayPrice: "$620",
      image: "/images/models/women_02.jpg",
      description: "A royal floor-length anarkali in heritage rust terracotta raw silk, accented with intricate Kashmiri tilla embroidery and floral botanical kalis.",
      fabric: "100% Banarasi Katan Silk with Metallic Weave",
      details: [
        "32-kali voluminous flared hemline with micro-zari edging",
        "Heritage scooped neckline with artisanal border work",
        "Includes sheer dupatta with gold scallop hem",
        "Dry clean only"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Terracotta Rust", "Deep Saffron", "Maroon Crimson"],
      inStock: true,
      frameIndex: 2,
      side: "right"
    }
  },
  {
    frameNumber: "03",
    themeTitle: "CEREMONIAL & NOCTURNE",
    zDistance: -40,
    leftItem: {
      id: "men-03",
      category: "FORMAL EDIT",
      subCategory: "men",
      title: "Nocturne Minimalist Tuxedo Suit",
      badge: "Bespoke Cut",
      price: 480,
      originalPrice: 550,
      currency: "USD",
      displayPrice: "$480",
      image: "/images/models/men_03.jpg",
      description: "Architectural modern evening tailoring in midnight obsidian virgin wool. Single-breasted peak lapel with silk satin face, styled with a charcoal luxury tee and Oxford dress shoes.",
      fabric: "Super 130s Merino Virgin Wool & Mulberry Silk Satin",
      details: [
        "Full floating canvas chest piece for perfect drape",
        "Hand-stitched pick stitch detailing",
        "Satin side stripe on flat-front trousers",
        "Dry clean only"
      ],
      sizes: ["38R", "40R", "42R", "44R"],
      colors: ["Obsidian Black", "Midnight Blue"],
      inStock: true,
      frameIndex: 3,
      side: "left"
    },
    rightItem: {
      id: "women-03",
      category: "ROYAL COUTURE",
      subCategory: "couture",
      title: "Kanchipuram Sungold Silk Saree",
      badge: "Heritage Masterpiece",
      price: 710,
      originalPrice: 820,
      currency: "USD",
      displayPrice: "$710",
      image: "/images/models/women_03.jpg",
      description: "Woven by generational master weavers in pure mulberry silk, boasting real electroplated silver and gold zari brocade motifs with an opulent heavy pallu.",
      fabric: "Pure Handloom Kanchipuram Mulberry Silk (Silk Mark Certified)",
      details: [
        "Traditional Korvai weaving technique",
        "Heavy temple architecture border motif",
        "Includes matching unstitched embroidered blouse piece (80cm)",
        "Store in breathable muslin cloth"
      ],
      sizes: ["Free Size"],
      colors: ["Sungold Ochre", "Temple Ruby", "Peacock Blue"],
      inStock: true,
      frameIndex: 3,
      side: "right"
    }
  },
  {
    frameNumber: "04",
    themeTitle: "GRAND HERITAGE & BRIDAL",
    zDistance: -60,
    leftItem: {
      id: "men-04",
      category: "HERITAGE",
      subCategory: "men",
      title: "Emerald Raw Silk Bandhgala Ensemble",
      badge: "Royal Edition",
      price: 450,
      originalPrice: 520,
      currency: "USD",
      displayPrice: "$450",
      image: "/images/models/men_04.jpg",
      description: "Regal jewel-toned emerald jacket crafted in thick raw textured slub silk, finished with hand-carved gold buttons and paired with tailored ivory silk trousers.",
      fabric: "Pure Raw Slub Silk & Tropical Wool",
      details: [
        "Mandarin stand collar with reinforced canvas",
        "Custom engraved antique gold crest buttons",
        "Welt pocket with integrated pocket square slot",
        "Dry clean only"
      ],
      sizes: ["38R", "40R", "42R", "44R"],
      colors: ["Imperial Emerald", "Royal Navy", "Burgundy"],
      inStock: true,
      frameIndex: 4,
      side: "left"
    },
    rightItem: {
      id: "women-04",
      category: "BRIDAL EDIT",
      subCategory: "couture",
      title: "Champagne Ivory Embellished Bridal Lehenga",
      badge: "Couture Masterpiece",
      price: 950,
      originalPrice: 1100,
      currency: "USD",
      displayPrice: "$950",
      image: "/images/models/women_04.jpg",
      description: "A bridal vision in warm champagne and ivory, adorned with micro-pearls, cut-dana, Swarovski crystals and antique dabka embroidery on handwoven silk tissue.",
      fabric: "Pure Tissue Silk, Organza & French Tulle",
      details: [
        "Over 300 hours of artisanal hand craftsmanship",
        "Double dupatta set in delicate embroidered net and tissue",
        "Grand can-can layered flair for regal volume",
        "Custom bespoke fitting included"
      ],
      sizes: ["Bespoke / Custom", "XS", "S", "M", "L"],
      colors: ["Champagne Ivory", "Blush Petal", "Gilded Gold"],
      inStock: true,
      frameIndex: 4,
      side: "right"
    }
  }
];

export const ALL_PRODUCTS: ProductItem[] = [
  ...SHOWCASE_PAIRS.flatMap(p => [p.leftItem, p.rightItem]),
  {
    id: "catalog-01",
    category: "MEN",
    subCategory: "men",
    title: "Sandstone Relaxed Linen Kurta Shirt",
    price: 165,
    currency: "USD",
    displayPrice: "$165",
    image: "/images/models/men_01.jpg",
    description: "Breathable sand linen kurta with band collar and roll-up sleeves for modern casual styling.",
    fabric: "100% Pure Normandy Linen",
    details: ["Hidden mother-of-pearl button placket", "Side slit hem"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sandstone", "White", "Navy"],
    inStock: true
  },
  {
    id: "catalog-02",
    category: "WOMEN",
    subCategory: "women",
    title: "Scarlet Chiffon Draped Cape Set",
    price: 320,
    currency: "USD",
    displayPrice: "$320",
    image: "/images/models/women_01.jpg",
    description: "Fluid scarlet red cape set with micro pleats and sequin scattered bustier.",
    fabric: "Georgette Chiffon & Satin Lining",
    details: ["Flowing sheer capelet", "Elasticated high waist pants"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Scarlet Red", "Midnight", "Olive"],
    inStock: true
  },
  {
    id: "catalog-03",
    category: "MEN",
    subCategory: "men",
    title: "Caramel Suede Chelsea Boot",
    price: 240,
    currency: "USD",
    displayPrice: "$240",
    image: "/images/models/men_02.jpg",
    description: "Italian calf suede Chelsea boots with Goodyear welted leather soles.",
    fabric: "Full Grain Italian Suede",
    details: ["Elasticated side gusset", "Durable Vibram rubber heel cap"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Caramel", "Dark Chocolate", "Black"],
    inStock: true
  },
  {
    id: "catalog-04",
    category: "WOMEN",
    subCategory: "couture",
    title: "Marigold Silk Organza Dupatta",
    price: 190,
    currency: "USD",
    displayPrice: "$190",
    image: "/images/models/women_03.jpg",
    description: "Hand-painted floral motifs on sheer marigold silk organza with scalloped gota patti borders.",
    fabric: "100% Pure Silk Organza",
    details: ["2.5 meters length", "Handcrafted gota embroidery"],
    sizes: ["One Size"],
    colors: ["Marigold Yellow", "Blush Pink", "Sage Green"],
    inStock: true
  }
];
