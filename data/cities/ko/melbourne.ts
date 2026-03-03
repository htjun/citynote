import type { City } from "@/data/types"

export const melbourne: City = {
  slug: "melbourne",
  name: "멜버른",
  country: "호주",
  tagline: "살기 좋고 창의적이며 카페 문화가 강한 해안 도시.",
  atAGlance: {
    continent: "오세아니아",
    population: "530만 명(광역권)",
    languages: "영어(매우 다문화적인 도시)",
    currency: "AUD(호주 달러)",
    timezone: "AEST(UTC+10), 서머타임 기간 AEDT",
    emergency: "000",
    dialingCode: "+61",
  },
  climate: {
    bestMonths: "3-5월, 9-11월",
    rainySeason: "뚜렷한 우기는 없고 연중 소나기 가능",
    seasonNotes: [
      "하루 안에서도 날씨 변화가 빠를 수 있습니다.",
      "여름에는 폭염이 있고 자외선 지수가 높아질 수 있습니다.",
      "겨울은 혹한보다는 서늘하고 습하며 바람이 잦습니다.",
    ],
    monthly: [
      { month: "1월", highC: 26, lowC: 14, rainLevel: "low" },
      { month: "2월", highC: 26, lowC: 14, rainLevel: "low" },
      { month: "3월", highC: 24, lowC: 13, rainLevel: "low" },
      { month: "4월", highC: 20, lowC: 11, rainLevel: "medium" },
      { month: "5월", highC: 16, lowC: 9, rainLevel: "medium" },
      { month: "6월", highC: 14, lowC: 7, rainLevel: "medium" },
      { month: "7월", highC: 13, lowC: 6, rainLevel: "medium" },
      { month: "8월", highC: 15, lowC: 7, rainLevel: "medium" },
      { month: "9월", highC: 17, lowC: 8, rainLevel: "medium" },
      { month: "10월", highC: 20, lowC: 10, rainLevel: "medium" },
      { month: "11월", highC: 22, lowC: 12, rainLevel: "medium" },
      { month: "12월", highC: 24, lowC: 13, rainLevel: "low" },
    ],
  },
  costOfLiving: {
    budgetTiers: [
      {
        item: "백패커",
        price: "$65-95/일",
        note: "호스텔 + 교통 + 간단한 식사",
      },
      {
        item: "중간 예산",
        price: "$140-220/일",
        note: "3성급 호텔 + 혼합 외식",
      },
      {
        item: "여유 예산",
        price: "$280+/일",
        note: "4-5성급 + 프리미엄 경험",
      },
    ],
    dailyEssentials: [
      { item: "간편식", price: "$10-16" },
      { item: "캐주얼 레스토랑", price: "$18-32" },
      { item: "커피", price: "$3.5-5.5" },
      { item: "맥주(파인트)", price: "$8-12" },
      { item: "생수(500ml)", price: "$2-3.5" },
    ],
    monthlyNomad: [
      { item: "원룸 월세(도심)", price: "$1,450-2,200" },
      { item: "원룸 월세(외곽)", price: "$1,050-1,600" },
      { item: "식료품", price: "$320-500" },
      { item: "교통 패스/충전", price: "$120-180" },
    ],
    comparisonAnchor:
      "런던 중심부보다는 대체로 저렴하지만, 아시아 주요 도시보다는 비쌀 수 있습니다.",
  },
  gettingAround: {
    airports: [
      {
        item: "MEL - 멜버른 공항",
        price: "CBD까지 25-40분",
        note: "SkyBus + 택시/라이드셰어",
      },
      {
        item: "AVV - 아발론 공항",
        price: "CBD까지 50-75분",
        note: "공항 코치 + 환승",
      },
    ],
    visaSnapshot:
      "대부분의 방문객은 입국 전 비자 또는 eVisitor/ETA가 필요하므로, 공식 이민 요건을 미리 확인하세요.",
    localTransport: [
      {
        item: "트램 네트워크",
        price: "최상",
        note: "도시 전역을 덮고 CBD 무료 트램 구간 운영",
      },
      {
        item: "기차/버스",
        price: "높음",
        note: "교외 접근성이 좋음",
      },
      {
        item: "대중교통 요금",
        price: "Myki 기반",
        note: "일일 상한 요금 적용",
      },
    ],
    rideHailingApps: ["Uber", "DiDi", "13cabs"],
    walkability: "high",
    bikeability: "medium",
  },
  connectivity: {
    averageSpeedMbps: "고정 인터넷 평균 50-110 Mbps",
    simOptions: [
      {
        item: "관광 SIM 요금제",
        price: "$20-45",
        note: "Optus, Telstra, Vodafone가 일반적",
      },
      {
        item: "eSIM 옵션",
        price: "$15-40",
        note: "온라인 구매가 널리 가능",
      },
    ],
    wifiAvailability: "high",
    coworkingDayPass: "코워킹 데이패스 보통 $25-45/일",
    coworkingExamples: [
      "Hub Melbourne",
      "The Commons",
      "WeWork Collins Street",
    ],
  },
  neighborhoods: [
    {
      name: "CBD",
      vibe: "교통 접근성이 좋은 중심 숙박 거점.",
      bestFor: ["단기 체류", "비즈니스", "첫 방문"],
    },
    {
      name: "Fitzroy",
      vibe: "창의적이고 빈티지한 카페 중심 지역.",
      bestFor: ["카페", "나이트라이프", "디자인"],
    },
    {
      name: "South Yarra",
      vibe: "고급 쇼핑과 다이닝 중심지.",
      bestFor: ["쇼핑", "편안한 숙박", "미식"],
    },
    {
      name: "Carlton",
      vibe: "대학가 분위기와 이탈리안 음식 거리.",
      bestFor: ["학생", "음식", "도보 이동"],
    },
    {
      name: "St Kilda",
      vibe: "해변과 여유로운 야간 분위기.",
      bestFor: ["해변", "주말", "백패커"],
    },
    {
      name: "Richmond",
      vibe: "스포츠 경기장과 다양한 음식 선택지.",
      bestFor: ["스포츠", "음식", "중기 체류"],
    },
  ],
  foodDrink: {
    mustTry: [
      { item: "플랫화이트", price: "멜버른을 대표하는 커피 메뉴." },
      { item: "브런치 플레이트", price: "도시 전역 카페 문화의 핵심." },
      { item: "미트파이", price: "호주식 클래식 테이크아웃 간식." },
      { item: "치킨 파르미지아나", price: "펍에서 인기 있는 대표 메뉴." },
      { item: "라밍턴", price: "초콜릿-코코넛 스펀지 디저트." },
      {
        item: "다문화 미식",
        price: "그리스, 베트남, 이탈리아 등 다양한 음식권의 조합.",
      },
    ],
    cultureNotes: [
      "카페 문화가 일상의 중요한 부분입니다.",
      "인기 레스토랑은 예약을 권장합니다.",
      "브런치 매장은 양이 넉넉한 경우가 많습니다.",
    ],
    dietary: [
      {
        item: "채식",
        price: "높음",
        note: "대부분 지역에서 찾기 쉬움",
      },
      { item: "비건", price: "높음", note: "전문 매장 생태계가 강함" },
      {
        item: "할랄",
        price: "중간",
        note: "다문화 교외를 중심으로 선택지 양호",
      },
      {
        item: "글루텐 프리",
        price: "높음",
        note: "메뉴 표기가 비교적 명확함",
      },
    ],
    tapWaterSafe: "도시 전역에서 수돗물 음용이 가능합니다.",
    tippingNorm: "필수는 아니며, 매우 좋은 서비스에 선택적으로 팁을 남깁니다.",
  },
  languageCulture: {
    englishLevel: "excellent",
    phrases: [
      {
        local: "How are you going?",
        romanization: "N/A",
        english: "어떻게 지내요?",
      },
      {
        local: "No worries",
        romanization: "N/A",
        english: "괜찮아요/문제없어요",
      },
      { local: "Cheers", romanization: "N/A", english: "고마워요" },
      { local: "Arvo", romanization: "N/A", english: "오후" },
      { local: "Takeaway", romanization: "N/A", english: "포장 음식" },
      { local: "Myki", romanization: "N/A", english: "교통카드" },
      { local: "Servo", romanization: "N/A", english: "주유소" },
      { local: "Ta", romanization: "N/A", english: "고마워(구어체)" },
    ],
    dos: [
      "질서 있게 줄을 서고 개인 공간을 존중하세요.",
      "여름과 고자외선일에는 자외선 차단을 습관화하세요.",
      "날씨 급변에 대비해 가벼운 겉옷을 챙기세요.",
    ],
    donts: [
      "트램 교차 규칙과 신호를 무시하지 마세요.",
      "야간 주거 지역에서 큰 소음은 피하세요.",
      "교외 간 이동 거리를 과소평가하지 마세요.",
    ],
  },
  safetyHealth: {
    overallSafety: "high",
    commonScams: [
      "가짜 자선 모금 시도.",
      "관광 시간대 택시 우회 운행.",
      "대형 이벤트 티켓 재판매 사기.",
    ],
    healthcareLevel: "excellent",
    recommendedVaccinations: [
      "기초 예방접종",
      "계절성 독감",
      "A형 간염(일부 여행자)",
    ],
    emergencyContacts: [
      { item: "경찰/소방/구급", price: "000" },
      { item: "비긴급 경찰", price: "131 444" },
      { item: "Healthdirect", price: "1800 022 222" },
    ],
  },
  practicalInfo: {
    plugType: "Type I",
    voltage: "230V, 50Hz",
    paymentCulture:
      "카드 및 비접촉 결제가 주류이며, 현금도 가능하지만 사용 빈도는 낮은 편입니다.",
    usefulApps: [
      { name: "PTV", purpose: "대중교통 경로 계획" },
      { name: "Uber", purpose: "라이드셰어" },
      { name: "DiDi", purpose: "대체 라이드셰어" },
      { name: "Google Maps", purpose: "내비게이션" },
      { name: "OpenTable", purpose: "레스토랑 예약" },
      { name: "BOM Weather", purpose: "공식 기상 정보" },
    ],
    businessHours:
      "소매점은 보통 10:00-18:00, 주요 지역은 심야 식사 가능, 주말 마켓이 흔합니다.",
  },
  ruleTraps: [
    {
      rule: "myki 승하차 태그 규정 준수",
      riskLevel: "high",
      triggerScenario: "트램/기차 이용 시 필요한 태그온/태그오프를 누락",
      penaltyOrLoss: "무임승차 과태료 및 이동 지연으로 이어질 수 있습니다.",
      howToAvoid:
        "모든 이동에서 태그온을 기본으로 하고, 교통수단별 태그오프 규칙을 확인하세요.",
      sourceUrl:
        "https://transport.vic.gov.au/tickets-and-myki/myki/tap-on-and-off-with-myki",
      lastVerified: "2026-03-02",
    },
    {
      rule: "검표원 티켓 유효성 점검",
      riskLevel: "high",
      triggerScenario: "유효 티켓/할인 증빙/정상 검증 없이 탑승하는 경우",
      penaltyOrLoss:
        "위반 고지 금액이 실제 이동 요금보다 크게 높을 수 있습니다.",
      howToAvoid: "활성 티켓 상태와 해당 시 증빙 신분증을 항상 지참하세요.",
      sourceUrl:
        "https://transport.vic.gov.au/plan-a-journey/public-transport-tools-and-resources/travel-tips-and-resources/public-transport-safety-and-security/fines-and-authorised-officers-on-public-transport",
      lastVerified: "2026-03-02",
    },
    {
      rule: "차내 반입 금지 물품 및 기기 규정",
      riskLevel: "medium",
      triggerScenario: "허용되지 않는 전동 이동기기/장치를 반입",
      penaltyOrLoss:
        "탑승 거부, 과태료 가능성, 이동 일정 차질이 발생할 수 있습니다.",
      howToAvoid: "전동기기 휴대 시 최신 대중교통 반입 규정을 사전 확인하세요.",
      sourceUrl:
        "https://transport.vic.gov.au/news-and-resources/news/changes-to-the-way-you-use-public-transport-and-the-rules-for-travelling-on-board",
      lastVerified: "2026-03-02",
    },
  ],
  livePulse: [
    {
      name: "transport",
      status:
        "Southern Cross/Flinders Street 환승 전 공사 및 운행 중단 공지를 확인하세요.",
      updatedAt: "2026-03-03T07:35:00+11:00",
      sourceUrl: "https://www.ptv.vic.gov.au/disruptions/",
      staleAfterMinutes: 120,
    },
    {
      name: "uv",
      status:
        "기온이 낮아도 자외선은 높을 수 있어, 더위와 별도로 자외선 위험을 관리하세요.",
      updatedAt: "2026-03-03T07:00:00+11:00",
      sourceUrl:
        "https://www.bom.gov.au/resources/learn-and-explore/uv-knowledge-centre/about-the-uv-index",
      staleAfterMinutes: 180,
    },
    {
      name: "aqi",
      status:
        "연무/연기 이벤트 시 대기질이 급변할 수 있어 야외 일정 전 지수 확인이 필요합니다.",
      updatedAt: "2026-03-02T15:20:00+11:00",
      sourceUrl: "https://open-meteo.com/en/docs/air-quality-api",
      staleAfterMinutes: 180,
    },
    {
      name: "advisory",
      status: "근교/해외 사이드트립 전 Smartraveller 공지를 확인하세요.",
      updatedAt: "2026-03-01T09:00:00+11:00",
      sourceUrl: "https://www.smartraveller.gov.au/vi/advice-explained",
      staleAfterMinutes: 1440,
    },
  ],
  neighborhoodFit: [
    {
      archetype: "first_timer",
      bestAreas: ["CBD", "Carlton", "Southbank"],
      cautionAreas: ["심야 교통만 의존 시 외곽 지역"],
      notes: "초행자는 트램/기차 환승 거점 근처 숙소가 이동 실패를 줄입니다.",
      timeFit: {
        day: ["CBD", "Carlton"],
        lateNight: ["CBD", "Southbank"],
      },
    },
    {
      archetype: "family",
      bestAreas: ["South Yarra", "Carlton", "Docklands"],
      cautionAreas: ["주말 밤 유흥 밀집 스트립"],
      notes: "트램 직결성과 슈퍼마켓 도보 거리 중심으로 숙소를 고르세요.",
      timeFit: {
        day: ["Carlton", "South Yarra"],
        lateNight: ["Docklands"],
      },
    },
    {
      archetype: "night_owl",
      bestAreas: ["Fitzroy", "CBD", "St Kilda"],
      cautionAreas: ["최종차 이후 환승이 긴 구간"],
      notes: "자정 이후 이동이 잦다면 라이드 옵션이 많은 구역이 유리합니다.",
      timeFit: {
        day: ["Fitzroy", "CBD"],
        lateNight: ["St Kilda", "CBD"],
      },
    },
    {
      archetype: "remote_worker",
      bestAreas: ["Fitzroy", "Richmond", "CBD"],
      cautionAreas: ["도시 횡단 미팅 시 교통축이 얇은 구역"],
      notes: "카페 밀도와 코워킹 백업, 트램 접근성이 높은 구역을 우선하세요.",
      timeFit: {
        day: ["CBD", "Richmond"],
        lateNight: ["Fitzroy"],
      },
    },
  ],
  accessibility: {
    wheelchairTransitCoverage:
      "핵심 트램/기차 허브는 양호하지만 정류장 단위 편차가 남아 있습니다",
    stepFreeConfidence: "medium",
    unknownDataRatio: "지역 정류장/플랫폼 세부 정보는 15-25% 공백 가능",
    notes: [
      "역·정류장 업그레이드가 진행 중이라 출발 전 노선별 접근성 재확인이 필요합니다.",
      "Free Tram Zone이라도 무단차 승하차 품질이 균일하다고 보장되지 않습니다.",
      "대형 이벤트일에는 표면상 접근 가능 구간도 실제 이동 난도가 올라갈 수 있습니다.",
      "핵심 환승역의 엘리베이터/에스컬레이터 장애 공지를 별도 확인하세요.",
    ],
  },
}
