import type { City } from "@/data/types"

export const melbourne: City = {
  slug: "melbourne",
  name: "Melbourne",
  country: "Australia",
  tagline: "Livable, creative, and cafe-forward coastal city.",
  atAGlance: {
    continent: "Oceania",
    population: "5.3M (metro)",
    languages: "English (highly multicultural city)",
    currency: "AUD (Australian Dollar)",
    timezone: "AEST (UTC+10), AEDT in daylight period",
    emergency: "000",
    dialingCode: "+61",
  },
  climate: {
    bestMonths: "Mar-May, Sep-Nov",
    rainySeason: "No strict monsoon; showers can occur year-round",
    seasonNotes: [
      "Weather can change quickly in one day.",
      "Summer can include heatwaves; UV index can be high.",
      "Winters are cool, damp, and breezy rather than freezing.",
    ],
    monthly: [
      { month: "Jan", highC: 26, lowC: 14, rainLevel: "Low" },
      { month: "Feb", highC: 26, lowC: 14, rainLevel: "Low" },
      { month: "Mar", highC: 24, lowC: 13, rainLevel: "Low" },
      { month: "Apr", highC: 20, lowC: 11, rainLevel: "Medium" },
      { month: "May", highC: 16, lowC: 9, rainLevel: "Medium" },
      { month: "Jun", highC: 14, lowC: 7, rainLevel: "Medium" },
      { month: "Jul", highC: 13, lowC: 6, rainLevel: "Medium" },
      { month: "Aug", highC: 15, lowC: 7, rainLevel: "Medium" },
      { month: "Sep", highC: 17, lowC: 8, rainLevel: "Medium" },
      { month: "Oct", highC: 20, lowC: 10, rainLevel: "Medium" },
      { month: "Nov", highC: 22, lowC: 12, rainLevel: "Medium" },
      { month: "Dec", highC: 24, lowC: 13, rainLevel: "Low" },
    ],
  },
  costOfLiving: {
    budgetTiers: [
      {
        item: "Backpacker",
        price: "$65-95/day",
        note: "Hostel + transit + simple meals",
      },
      {
        item: "Mid-range",
        price: "$140-220/day",
        note: "3-star hotel + mixed dining",
      },
      {
        item: "Comfort",
        price: "$280+/day",
        note: "4-5 star + premium experiences",
      },
    ],
    dailyEssentials: [
      { item: "Quick meal", price: "$10-16" },
      { item: "Casual restaurant meal", price: "$18-32" },
      { item: "Coffee", price: "$3.5-5.5" },
      { item: "Beer (pint)", price: "$8-12" },
      { item: "Water (500ml)", price: "$2-3.5" },
    ],
    monthlyNomad: [
      { item: "Studio rent (central)", price: "$1,450-2,200" },
      { item: "Studio rent (outer)", price: "$1,050-1,600" },
      { item: "Groceries", price: "$320-500" },
      { item: "Transit pass/top-up", price: "$120-180" },
    ],
    comparisonAnchor:
      "Usually cheaper than central London, but can be pricier than many Asian hubs.",
  },
  gettingAround: {
    airports: [
      {
        item: "MEL - Melbourne Airport",
        price: "25-40 min to CBD",
        note: "SkyBus + taxi/rideshare",
      },
      {
        item: "AVV - Avalon Airport",
        price: "50-75 min to CBD",
        note: "Airport coach + transfer",
      },
    ],
    visaSnapshot:
      "Most visitors need a visa or eVisitor/ETA before arrival; verify official Australian immigration requirements early.",
    localTransport: [
      {
        item: "Tram network",
        price: "Excellent",
        note: "Large city network, free tram zone in CBD",
      },
      {
        item: "Train and bus",
        price: "High",
        note: "Strong suburban coverage",
      },
      { item: "Transit fare", price: "Myki-based", note: "Daily caps apply" },
    ],
    rideHailingApps: ["Uber", "DiDi", "13cabs"],
    walkability: "High",
    bikeability: "Medium",
  },
  connectivity: {
    averageSpeedMbps: "50-110 Mbps typical fixed broadband",
    simOptions: [
      {
        item: "Tourist SIM plans",
        price: "$20-45",
        note: "Optus, Telstra, Vodafone common",
      },
      {
        item: "eSIM options",
        price: "$15-40",
        note: "Widely available online",
      },
    ],
    wifiAvailability: "High",
    coworkingDayPass: "$25-45/day typical",
    coworkingExamples: [
      "Hub Melbourne",
      "The Commons",
      "WeWork Collins Street",
    ],
  },
  neighborhoods: [
    {
      name: "CBD",
      vibe: "Convenient central base with transit access.",
      bestFor: ["short stays", "business", "first-timers"],
    },
    {
      name: "Fitzroy",
      vibe: "Creative, vintage, and cafe heavy.",
      bestFor: ["cafes", "nightlife", "design"],
    },
    {
      name: "South Yarra",
      vibe: "Upscale shopping and dining.",
      bestFor: ["shopping", "comfort stays", "food"],
    },
    {
      name: "Carlton",
      vibe: "University energy and Italian dining pockets.",
      bestFor: ["students", "food", "walkability"],
    },
    {
      name: "St Kilda",
      vibe: "Beachside with relaxed nightlife.",
      bestFor: ["beach", "weekends", "backpackers"],
    },
    {
      name: "Richmond",
      vibe: "Sports venues and broad food mix.",
      bestFor: ["sports", "food", "mid-term stays"],
    },
  ],
  foodDrink: {
    mustTry: [
      { item: "Flat white", price: "Signature coffee staple." },
      { item: "Brunch plates", price: "City-wide cafe culture highlight." },
      { item: "Meat pie", price: "Classic takeaway snack." },
      { item: "Chicken parmigiana", price: "Pub favorite." },
      { item: "Lamington", price: "Chocolate-coconut sponge dessert." },
      {
        item: "Multicultural tasting",
        price: "Greek, Vietnamese, Italian, and more.",
      },
    ],
    cultureNotes: [
      "Cafe culture is a major part of daily life.",
      "Reservations are recommended for trending restaurants.",
      "Portion sizes are often generous in brunch spots.",
    ],
    dietary: [
      {
        item: "Vegetarian",
        price: "High",
        note: "Easy options in most districts",
      },
      { item: "Vegan", price: "High", note: "Strong dedicated scene" },
      {
        item: "Halal",
        price: "Medium",
        note: "Good options, especially in diverse suburbs",
      },
      {
        item: "Gluten-free",
        price: "High",
        note: "Clearly labeled menus are common",
      },
    ],
    tapWaterSafe: "Safe to drink city-wide.",
    tippingNorm: "Not mandatory; optional for exceptional service.",
  },
  languageCulture: {
    englishLevel: "Excellent",
    phrases: [
      {
        local: "How are you going?",
        romanization: "N/A",
        english: "How are you doing?",
      },
      {
        local: "No worries",
        romanization: "N/A",
        english: "It is okay / no problem",
      },
      { local: "Cheers", romanization: "N/A", english: "Thanks" },
      { local: "Arvo", romanization: "N/A", english: "Afternoon" },
      { local: "Takeaway", romanization: "N/A", english: "To-go food" },
      { local: "Myki", romanization: "N/A", english: "Public transport card" },
      { local: "Servo", romanization: "N/A", english: "Gas station" },
      { local: "Ta", romanization: "N/A", english: "Thanks (casual)" },
    ],
    dos: [
      "Queue politely and respect personal space.",
      "Use sunscreen in summer and high UV days.",
      "Carry a light layer due to fast weather changes.",
    ],
    donts: [
      "Do not ignore tram crossing rules and signals.",
      "Avoid loud behavior in quiet residential areas at night.",
      "Do not underestimate distance between suburbs.",
    ],
  },
  safetyHealth: {
    overallSafety: "High",
    commonScams: [
      "Occasional fake charity collection attempts.",
      "Taxi route padding in tourist-heavy times.",
      "Ticket resale scams for major events.",
    ],
    healthcareLevel: "Excellent",
    recommendedVaccinations: [
      "Routine vaccines",
      "Seasonal influenza",
      "Hepatitis A (for some travelers)",
    ],
    emergencyContacts: [
      { item: "Police / Fire / Ambulance", price: "000" },
      { item: "Non-urgent police", price: "131 444" },
      { item: "Healthdirect", price: "1800 022 222" },
    ],
  },
  practicalInfo: {
    plugType: "Type I",
    voltage: "230V, 50Hz",
    paymentCulture:
      "Card and contactless dominant; cash accepted but less common.",
    usefulApps: [
      { name: "PTV", purpose: "Public transport planning" },
      { name: "Uber", purpose: "Rideshare" },
      { name: "DiDi", purpose: "Rideshare alternative" },
      { name: "Google Maps", purpose: "Navigation" },
      { name: "OpenTable", purpose: "Restaurant booking" },
      { name: "BOM Weather", purpose: "Official weather updates" },
    ],
    businessHours:
      "Typical retail 10:00-18:00, late-night dining available in key areas, weekend markets common.",
  },
}
