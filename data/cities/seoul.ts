import type { City } from "@/data/types"

export const seoul: City = {
  slug: "seoul",
  name: "Seoul",
  country: "South Korea",
  tagline: "Fast, safe, and highly connected megacity.",
  atAGlance: {
    continent: "Asia",
    population: "9.4M (city)",
    languages: "Korean (English available in major districts)",
    currency: "KRW (Korean Won)",
    timezone: "KST (UTC+9)",
    emergency: "112 (police), 119 (fire/ambulance)",
    dialingCode: "+82",
  },
  climate: {
    bestMonths: "Apr-Jun, Sep-Oct",
    rainySeason: "Late Jun to late Jul",
    seasonNotes: [
      "Summer is hot and humid, winter can be very cold.",
      "Spring and autumn are generally the most comfortable.",
      "Air quality can vary in spring; check PM forecasts.",
    ],
    monthly: [
      { month: "Jan", highC: 1, lowC: -7, rainLevel: "Low" },
      { month: "Feb", highC: 4, lowC: -4, rainLevel: "Low" },
      { month: "Mar", highC: 10, lowC: 1, rainLevel: "Low" },
      { month: "Apr", highC: 17, lowC: 7, rainLevel: "Low" },
      { month: "May", highC: 23, lowC: 13, rainLevel: "Medium" },
      { month: "Jun", highC: 27, lowC: 18, rainLevel: "Medium" },
      { month: "Jul", highC: 29, lowC: 22, rainLevel: "High" },
      { month: "Aug", highC: 30, lowC: 23, rainLevel: "High" },
      { month: "Sep", highC: 26, lowC: 18, rainLevel: "Medium" },
      { month: "Oct", highC: 20, lowC: 11, rainLevel: "Low" },
      { month: "Nov", highC: 12, lowC: 3, rainLevel: "Low" },
      { month: "Dec", highC: 4, lowC: -4, rainLevel: "Low" },
    ],
  },
  costOfLiving: {
    budgetTiers: [
      {
        item: "Backpacker",
        price: "$45-70/day",
        note: "Hostel + simple meals + transit",
      },
      {
        item: "Mid-range",
        price: "$95-160/day",
        note: "3-star hotel + cafe/restaurants",
      },
      {
        item: "Comfort",
        price: "$200+/day",
        note: "4-5 star + frequent taxi + premium dining",
      },
    ],
    dailyEssentials: [
      { item: "Street or quick meal", price: "$6-10" },
      { item: "Casual restaurant meal", price: "$10-18" },
      { item: "Coffee", price: "$3.5-5.5" },
      { item: "Beer (pint)", price: "$4-7" },
      { item: "Water (500ml)", price: "$0.8-1.3" },
    ],
    monthlyNomad: [
      { item: "Studio rent (central)", price: "$900-1,600" },
      { item: "Studio rent (outer)", price: "$600-1,050" },
      { item: "Groceries", price: "$280-430" },
      { item: "Transit pass/top-up", price: "$55-85" },
    ],
    comparisonAnchor:
      "Typically 20-30% cheaper than central Tokyo for day-to-day spending.",
  },
  gettingAround: {
    airports: [
      {
        item: "ICN - Incheon Intl",
        price: "50-70 min to center",
        note: "AREX + airport bus + taxi",
      },
      {
        item: "GMP - Gimpo",
        price: "25-40 min to center",
        note: "Metro + taxi",
      },
    ],
    visaSnapshot:
      "Many nationalities can enter visa-free for short stays; always verify latest official policy before booking.",
    localTransport: [
      { item: "Subway", price: "Excellent", note: "Fast, clean, extensive" },
      {
        item: "Bus network",
        price: "Excellent",
        note: "Frequent and integrated fares",
      },
      {
        item: "Transit base fare",
        price: "About $1.1-1.3",
        note: "T-money/Cashbee card",
      },
    ],
    rideHailingApps: ["Kakao T", "UT"],
    walkability: "High",
    bikeability: "Medium",
  },
  connectivity: {
    averageSpeedMbps: "120-220 Mbps typical fixed broadband",
    simOptions: [
      {
        item: "eSIM / SIM tourist plans",
        price: "$20-45",
        note: "5-15 days common bundles",
      },
      { item: "Major providers", price: "SK Telecom, KT, LG U+" },
    ],
    wifiAvailability: "Excellent",
    coworkingDayPass: "$20-35/day typical",
    coworkingExamples: ["WeWork Euljiro", "FastFive", "Impact Hub Seoul"],
  },
  neighborhoods: [
    {
      name: "Myeongdong",
      vibe: "Retail-heavy and central.",
      bestFor: ["first-timers", "shopping", "food courts"],
    },
    {
      name: "Hongdae",
      vibe: "Youthful, nightlife, indie culture.",
      bestFor: ["nightlife", "students", "cafes"],
    },
    {
      name: "Gangnam",
      vibe: "Polished business and upscale hubs.",
      bestFor: ["business", "shopping", "dining"],
    },
    {
      name: "Itaewon",
      vibe: "International and diverse.",
      bestFor: ["expats", "global food", "late nights"],
    },
    {
      name: "Jongno",
      vibe: "Historic core near palaces.",
      bestFor: ["culture", "walks", "museums"],
    },
    {
      name: "Seongsu",
      vibe: "Converted warehouses and design scene.",
      bestFor: ["cafes", "design", "remote work"],
    },
  ],
  foodDrink: {
    mustTry: [
      { item: "Bibimbap", price: "Mixed rice bowl with vegetables/protein." },
      {
        item: "Samgyeopsal",
        price: "Korean BBQ pork belly, grill-at-table style.",
      },
      { item: "Kimchi-jjigae", price: "Spicy kimchi stew comfort meal." },
      { item: "Tteokbokki", price: "Spicy rice cakes, iconic street snack." },
      { item: "Kalguksu", price: "Knife-cut noodle soup." },
      { item: "Bingsu", price: "Shaved ice dessert with toppings." },
    ],
    cultureNotes: [
      "Many places offer fast, efficient service with self-order kiosks.",
      "Late-night food options are easy to find in busy districts.",
      "Queues are common at trending restaurants and cafes.",
    ],
    dietary: [
      {
        item: "Vegetarian",
        price: "Medium",
        note: "Growing options in major areas",
      },
      {
        item: "Vegan",
        price: "Medium",
        note: "Dedicated spots exist but limited outside center",
      },
      { item: "Halal", price: "Medium", note: "Clusters around Itaewon" },
      {
        item: "Gluten-free",
        price: "Low",
        note: "Requires planning and translation support",
      },
    ],
    tapWaterSafe:
      "Generally safe, but many travelers still prefer filtered/bottled water.",
    tippingNorm: "No tipping expected in most situations.",
  },
  languageCulture: {
    englishLevel: "Medium",
    phrases: [
      { local: "안녕하세요", romanization: "annyeonghaseyo", english: "Hello" },
      {
        local: "감사합니다",
        romanization: "gamsahamnida",
        english: "Thank you",
      },
      {
        local: "죄송합니다",
        romanization: "joesonghamnida",
        english: "Sorry / excuse me",
      },
      {
        local: "이거 얼마예요?",
        romanization: "igeo eolmayeyo?",
        english: "How much is this?",
      },
      {
        local: "화장실 어디예요?",
        romanization: "hwajangsil eodiyeyo?",
        english: "Where is the restroom?",
      },
      {
        local: "지하철역 어디예요?",
        romanization: "jihacheol-yeok eodiyeyo?",
        english: "Where is the subway station?",
      },
      {
        local: "도와주세요",
        romanization: "dowajuseyo",
        english: "Please help me",
      },
      {
        local: "괜찮아요",
        romanization: "gwaenchanayo",
        english: "It is okay",
      },
    ],
    dos: [
      "Use two hands when giving or receiving items in formal contexts.",
      "Keep voices moderate in public transport.",
      "Follow queue order carefully.",
    ],
    donts: [
      "Do not assume everyone is comfortable speaking English.",
      "Avoid loud phone calls in quiet public settings.",
      "Do not enter homes in shoes unless explicitly allowed.",
    ],
  },
  safetyHealth: {
    overallSafety: "Excellent",
    commonScams: [
      "Overpriced tourist taxis around nightlife zones.",
      "Bar tab misunderstandings in late-night areas.",
      "Street touts near major tourist hubs.",
    ],
    healthcareLevel: "Excellent",
    recommendedVaccinations: [
      "Routine vaccines",
      "Hepatitis A",
      "Seasonal influenza",
    ],
    emergencyContacts: [
      { item: "Police", price: "112" },
      { item: "Fire / Ambulance", price: "119" },
      { item: "Tourist helpline", price: "1330" },
    ],
  },
  practicalInfo: {
    plugType: "Type C / F",
    voltage: "220V, 60Hz",
    paymentCulture:
      "Card-first economy; cash still useful for small markets and top-ups.",
    usefulApps: [
      { name: "Naver Map", purpose: "Navigation and local search" },
      { name: "KakaoMap", purpose: "Alternative mapping and transit" },
      { name: "Kakao T", purpose: "Taxi and mobility" },
      { name: "Papago", purpose: "Translation" },
      { name: "Coupang Eats", purpose: "Food delivery" },
      { name: "Subway Korea", purpose: "Metro route planning" },
    ],
    businessHours:
      "Typical shops 10:00-21:00, cafes often 08:00-22:00, many restaurants open late.",
  },
}
