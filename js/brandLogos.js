/**
 * ELVAN FOODS - BRAND LOGOS & MARKS (SVG)
 * High-fidelity vector representations matching the 7 brand identities from the official brand identity guide.
 */

export const BRANDS = [
  {
    id: "crimson",
    name: "Crimson™",
    tagline: "Gourmet Sauces, Ketchup & Condiments",
    color: "#B31329",
    bgColor: "#FFF0F2",
    accentColor: "#E2213D",
    category: "sauces",
    description: "Premium rich tomato ketchups, continental sauces, mayonnaise, dips and gourmet culinary dressings.",
    svg: `
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#9C0D20"/>
            <stop offset="50%" stop-color="#C51630"/>
            <stop offset="100%" stop-color="#8A0A1A"/>
          </linearGradient>
          <filter id="crimsonShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="#55000C" flood-opacity="0.35"/>
          </filter>
        </defs>
        <!-- Crimson script text with tomato & chilli accents -->
        <g filter="url(#crimsonShadow)">
          <!-- Dynamic Swoosh underline -->
          <path d="M 40 85 C 90 92 180 82 280 68 C 240 76 160 96 40 85 Z" fill="url(#crimsonGrad)"/>
          
          <!-- Stylized Text 'Crimson' -->
          <text x="30" y="72" font-family="'Brush Script MT', 'Dancing Script', 'Playfair Display', cursive, serif" font-size="62" font-weight="bold" fill="url(#crimsonGrad)" font-style="italic" letter-spacing="-1">
            Crimson
          </text>

          <!-- Chilli on the dot of 'i' -->
          <path d="M 104 30 C 104 22 108 17 114 16 C 111 23 108 28 104 30 Z" fill="#E82020"/>
          <path d="M 114 16 C 115 13 118 13 118 15 C 117 18 114 18 114 16 Z" fill="#2E7D32"/>

          <!-- Tomato accent on the 'o' -->
          <circle cx="218" cy="46" r="8" fill="#D31828"/>
          <circle cx="216" cy="44" r="2.5" fill="#FFA5A5" opacity="0.8"/>
          <!-- Tomato Green Calyx -->
          <path d="M 218 38 L 216 35 L 218 36 L 220 35 L 218 38 Z" fill="#2E7D32"/>
          <path d="M 218 36 C 218 32 222 31 223 33" stroke="#2E7D32" stroke-width="1.2" fill="none"/>

          <!-- TM Mark -->
          <text x="272" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="bold" fill="#333333">TM</text>
        </g>
      </svg>
    `
  },
  {
    id: "spice-dragon",
    name: "Spice Dragon™",
    tagline: "Fire Up Your Taste...!",
    color: "#9A1016",
    bgColor: "#FFF4E8",
    accentColor: "#FF8C00",
    category: "chinese",
    description: "Fiery Schezwan, hot garlic sauces, Pan-Asian chilli condiments, dark soya, vinegar, and Chinese noodles.",
    svg: `
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <radialGradient id="dragonCircle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#B2181E"/>
            <stop offset="85%" stop-color="#800D12"/>
            <stop offset="100%" stop-color="#55070A"/>
          </radialGradient>
        </defs>
        <!-- Background circular disc -->
        <circle cx="160" cy="85" r="68" fill="url(#dragonCircle)" stroke="#E09F3E" stroke-width="2.5"/>
        
        <!-- Golden Asian Dragon Crest -->
        <path d="M 140 24 C 160 18 190 28 200 48 C 210 65 200 75 190 70 C 180 65 185 52 175 48 C 165 44 150 48 140 24 Z" fill="#F42B2B" stroke="#FFD166" stroke-width="1.5"/>
        <!-- Dragon Whiskers & Horns -->
        <path d="M 180 32 Q 192 18 202 22 M 175 35 Q 190 30 200 36 M 168 28 Q 165 14 155 12" stroke="#FFD166" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Dragon Claws -->
        <path d="M 115 52 Q 100 50 105 65 M 120 58 Q 110 65 116 72" stroke="#FFD166" stroke-width="2" fill="none"/>
        <path d="M 215 125 Q 228 135 220 148 M 205 130 Q 212 144 205 150" stroke="#FFD166" stroke-width="2" fill="none"/>
        <!-- Dragon Tail flame -->
        <path d="M 125 128 C 115 145 130 160 155 158 C 140 150 142 135 125 128 Z" fill="#F42B2B" stroke="#FFD166" stroke-width="1.5"/>

        <!-- Text Banner: SPICE -->
        <g transform="translate(160, 80)">
          <!-- Red chili icon as the 'I' in SPICE -->
          <rect x="-95" y="-22" width="190" height="32" rx="4" fill="#B2181E" stroke="#E09F3E" stroke-width="2"/>
          <text x="-80" y="2" font-family="'Impact', 'Arial Black', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="3">SP</text>
          <!-- Chili as 'I' -->
          <path d="M -30 -16 C -26 -16 -24 -2 -28 10 C -30 14 -32 10 -31 2 C -32 -6 -32 -16 -30 -16 Z" fill="#FF1E00" stroke="#FFD166" stroke-width="1"/>
          <path d="M -30 -16 Q -28 -20 -24 -19" stroke="#00A86B" stroke-width="2" fill="none"/>
          <text x="-16" y="2" font-family="'Impact', 'Arial Black', sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="3">CE</text>
          <text x="56" y="-10" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="bold" fill="#FFD166">TM</text>
        </g>

        <!-- Text Banner: DRAGON -->
        <g transform="translate(160, 116)">
          <rect x="-110" y="-18" width="220" height="36" rx="5" fill="#800D12" stroke="#E09F3E" stroke-width="2.5"/>
          <text x="0" y="9" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" letter-spacing="4">DRAGON</text>
        </g>

        <!-- Slogan -->
        <text x="160" y="148" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11.5" font-weight="bold" fill="#FFD166" letter-spacing="1">
          Fire Up Your Taste...!
        </text>
      </svg>
    `
  },
  {
    id: "ambar-masale",
    name: "Ambar Masale (अम्बर मसाले)™",
    tagline: "Pure Aromas & Cooking Pastes",
    color: "#D3101E",
    bgColor: "#FFF2F2",
    accentColor: "#DAA520",
    category: "pastes",
    description: "Cold-crushed authentic ginger garlic pastes, rich aromatic cooking bases, garlic chutney, and pure kitchen spices.",
    svg: `
      <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <linearGradient id="ambarRedGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stop-color="#FF2E3E"/>
            <stop offset="45%" stop-color="#D70C1B"/>
            <stop offset="100%" stop-color="#8E040E"/>
          </linearGradient>
          <linearGradient id="ambarGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#B8860B"/>
            <stop offset="50%" stop-color="#F3C649"/>
            <stop offset="100%" stop-color="#B8860B"/>
          </linearGradient>
        </defs>
        <!-- 3D Glossy Oval Shape -->
        <g transform="translate(160, 75) rotate(-6)">
          <ellipse cx="0" cy="0" rx="125" ry="62" fill="url(#ambarRedGrad)" stroke="#FFFFFF" stroke-width="3.5"/>
          <!-- Gloss highlight -->
          <path d="M -90 -25 C -50 -50 40 -50 90 -20 C 60 -38 -20 -44 -90 -25 Z" fill="#FFFFFF" opacity="0.35"/>
          
          <!-- Hindi Script: अम्बर -->
          <text x="0" y="14" text-anchor="middle" font-family="'Yatra One', 'Rozha One', 'Noto Sans Devanagari', 'Cinzel', serif" font-size="52" font-weight="bold" fill="#FFFFFF" stroke="#8E040E" stroke-width="2.5" paint-order="stroke fill">
            अम्बर
          </text>
          <text x="110" y="-30" font-family="sans-serif" font-size="10" font-weight="bold" fill="#333333">TM</text>
          
          <!-- Golden Ribbon below: मसाले -->
          <path d="M -75 22 Q 0 42 75 22 Q 25 45 -75 22 Z" fill="url(#ambarGoldGrad)"/>
          <text x="0" y="42" text-anchor="middle" font-family="'Noto Sans Devanagari', sans-serif" font-size="20" font-weight="900" fill="#222222" letter-spacing="2">
            मसाले
          </text>
        </g>
      </svg>
    `
  },
  {
    id: "raghunandan",
    name: "Raghunandan (रघुनंदन)™",
    tagline: "हर स्वाद में परम्परा...",
    color: "#2C6B2F",
    bgColor: "#F1F8F2",
    accentColor: "#E5A018",
    category: "pickles",
    description: "Traditional mustard-oil cured pickles, sundried mango, spicy green chilli, lime, amla, and tangy imli chutney.",
    svg: `
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <!-- Circular Mascot Badge -->
        <g transform="translate(130, 62)">
          <circle cx="0" cy="0" r="38" fill="#F4BA28" stroke="#255C27" stroke-width="3"/>
          <!-- Pickle Jar / Barni Mascot with sunglasses and big spoon -->
          <!-- Barni Jar Body -->
          <rect x="-14" y="-18" width="28" height="34" rx="6" fill="#FBF8EE" stroke="#333" stroke-width="1.8"/>
          <path d="M -14 -18 C -14 -24 14 -24 14 -18 Z" fill="#C47D2B" stroke="#333" stroke-width="1.8"/>
          <!-- Cool Sunglasses -->
          <rect x="-11" y="-12" width="10" height="7" rx="2" fill="#111"/>
          <rect x="1" y="-12" width="10" height="7" rx="2" fill="#111"/>
          <line x1="-1" y1="-9" x2="1" y2="-9" stroke="#111" stroke-width="2"/>
          <!-- Smile -->
          <path d="M -5 3 Q 0 7 5 3" stroke="#222" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <!-- Running legs -->
          <path d="M -6 16 L -10 26 M 6 16 L 10 26" stroke="#222" stroke-width="2"/>
          <!-- Big Spoon in hand -->
          <path d="M 12 -4 Q 24 -15 26 -28 C 30 -24 24 -12 14 0 Z" fill="#DDD" stroke="#444" stroke-width="1.5"/>
        </g>

        <!-- Bold Hindi Typographic Logo: रघुनंदन -->
        <g transform="translate(160, 118)">
          <!-- Green background drop -->
          <text x="0" y="0" text-anchor="middle" font-family="'Yatra One', 'Rozha One', 'Noto Sans Devanagari', serif" font-size="54" font-weight="900" fill="#255C27" stroke="#F4BA28" stroke-width="5" paint-order="stroke fill">
            रघुनंदन
          </text>
          <text x="0" y="0" text-anchor="middle" font-family="'Yatra One', 'Rozha One', 'Noto Sans Devanagari', serif" font-size="54" font-weight="900" fill="#FFFFFF">
            रघुनंदन
          </text>
          <text x="110" y="-36" font-family="sans-serif" font-size="10" font-weight="bold" fill="#333333">TM</text>
        </g>

        <!-- Slogan -->
        <text x="175" y="152" text-anchor="middle" font-family="'Noto Sans Devanagari', sans-serif" font-size="14" font-weight="bold" fill="#222222" letter-spacing="1">
          हर स्वाद में परम्परा...
        </text>
      </svg>
    `
  },
  {
    id: "hridaya-ram",
    name: "Hridaya Ram (हृदयराम)™",
    tagline: "स्वाद जो दिल जीत ले",
    color: "#8B0E1E",
    bgColor: "#FDF2F4",
    accentColor: "#DFB035",
    category: "namkeen",
    description: "Crispy Aloo Bhujia, Besan Bhujia, Moong Dal, spiced peanuts, crunchy mixtures, and wholesome royal namkeens.",
    svg: `
      <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <linearGradient id="hridayaRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#B2182B"/>
            <stop offset="50%" stop-color="#800C19"/>
            <stop offset="100%" stop-color="#55050F"/>
          </linearGradient>
        </defs>
        <!-- Heart-Shaped Royal Crest -->
        <g transform="translate(160, 78) rotate(-4)">
          <path d="M 0 -45 C -45 -85 -125 -40 -105 30 C -90 75 -20 100 0 115 C 20 100 90 75 105 30 C 125 -40 45 -85 0 -45 Z" fill="url(#hridayaRed)" stroke="#DFB035" stroke-width="4.5" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"/>
          <path d="M 0 -38 C -38 -72 -108 -34 -90 25 C -78 64 -18 85 0 98 C 18 85 78 64 90 25 C 108 -34 38 -72 0 -38 Z" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.6"/>

          <!-- Hindi Script: हृदयराम -->
          <text x="0" y="22" text-anchor="middle" font-family="'Yatra One', 'Rozha One', 'Noto Sans Devanagari', serif" font-size="44" font-weight="900" fill="#FFFFFF" stroke="#440209" stroke-width="1.5">
            हृदयराम
          </text>
          <text x="82" y="-15" font-family="sans-serif" font-size="9" font-weight="bold" fill="#DFB035">TM</text>
          
          <!-- Tagline: स्वाद जो दिल जीत ले -->
          <text x="0" y="55" text-anchor="middle" font-family="'Noto Sans Devanagari', sans-serif" font-size="12" font-weight="bold" fill="#DFB035" letter-spacing="0.5">
            स्वाद जो दिल जीत ले
          </text>
        </g>
      </svg>
    `
  },
  {
    id: "nandan",
    name: "Nandan (નંદન)™",
    tagline: "Sweet Delights, Jams & Tutti Frutti",
    color: "#E51E2B",
    bgColor: "#FFF3EE",
    accentColor: "#2E7D32",
    category: "jams",
    description: "Luscious Mixed Fruit Jam, baker's choice vibrant Tutti Frutti, fruit toppings, and confectionery treats.",
    svg: `
      <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <linearGradient id="nandanGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stop-color="#FF3848"/>
            <stop offset="60%" stop-color="#E51424"/>
            <stop offset="100%" stop-color="#B70A18"/>
          </linearGradient>
        </defs>
        <!-- Apple / Fruit Crest -->
        <g transform="translate(160, 80)">
          <!-- Fruit Body -->
          <path d="M -90 -20 C -95 -60 -40 -65 -15 -40 C 20 -65 80 -55 90 -10 C 100 40 40 70 -10 65 C -65 60 -85 20 -90 -20 Z" fill="url(#nandanGrad)" stroke="#2E7D32" stroke-width="2.5" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.18))"/>
          <!-- Green Leaf -->
          <path d="M 0 -45 C 10 -75 55 -70 65 -50 C 45 -40 20 -40 0 -45 Z" fill="#388E3C" stroke="#1B5E20" stroke-width="1.5"/>

          <!-- Stylized Script: નંદન -->
          <text x="-5" y="18" text-anchor="middle" font-family="'Gujarati Sangam MN', 'Shruti', 'Noto Sans Gujarati', sans-serif" font-size="52" font-weight="bold" fill="#FFFFFF" stroke="#A80714" stroke-width="2" letter-spacing="2">
            નંદન
          </text>
          <text x="80" y="-28" font-family="sans-serif" font-size="10" font-weight="bold" fill="#333333">TM</text>
        </g>
      </svg>
    `
  },
  {
    id: "farm-feast",
    name: "Farm Feast™",
    tagline: "Farm-Fresh Frozen Foods & Italian Pasta",
    color: "#1E6838",
    bgColor: "#F0F9F3",
    accentColor: "#2F9E58",
    category: "frozen",
    description: "IQF Frozen Green Peas, American Sweet Corn, Hara Matar, Gourmet Italian Pasta, and Macaroni.",
    svg: `
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <linearGradient id="farmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2DA856"/>
            <stop offset="100%" stop-color="#145228"/>
          </linearGradient>
        </defs>
        <!-- Circular Green Farm Emblem -->
        <g transform="translate(160, 85)">
          <circle cx="0" cy="0" r="68" fill="url(#farmGrad)" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.2))"/>
          <!-- Farmland crop field lines -->
          <path d="M -30 40 Q 0 30 35 48 M -20 48 Q 0 40 25 56 M -10 56 Q 0 50 15 62" stroke="#FFFFFF" stroke-width="2.8" fill="none" stroke-linecap="round"/>

          <!-- Retro Puffy Typography: Farm Feast -->
          <text x="0" y="-12" text-anchor="middle" font-family="'Cooper Black', 'Paytone One', 'Fredoka One', 'Arial Black', sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" stroke="#0C381A" stroke-width="2.5" paint-order="stroke fill">
            Farm
          </text>
          <text x="0" y="24" text-anchor="middle" font-family="'Cooper Black', 'Paytone One', 'Fredoka One', 'Arial Black', sans-serif" font-size="36" font-weight="900" fill="#FFFFFF" stroke="#0C381A" stroke-width="2.5" paint-order="stroke fill">
            Feast
          </text>
          <text x="56" y="-38" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF">TM</text>
        </g>
      </svg>
    `
  }
];
