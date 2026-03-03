import type { City } from "@/data/types"

export const seoul: City = {
  slug: "seoul",
  name: "서울",
  country: "대한민국",
  tagline: "빠르고 안전하며 초연결된 메가시티.",
  atAGlance: {
    continent: "아시아",
    population: "940만 명(서울시)",
    languages: "한국어(주요 지역에서는 영어 사용 가능)",
    currency: "KRW(대한민국 원)",
    timezone: "KST(UTC+9)",
    emergency: "112(경찰), 119(소방/구급)",
    dialingCode: "+82",
  },
  climate: {
    bestMonths: "4-6월, 9-10월",
    rainySeason: "6월 하순-7월 하순",
    seasonNotes: [
      "여름은 덥고 습하며, 겨울은 매우 추울 수 있습니다.",
      "봄과 가을이 대체로 가장 쾌적합니다.",
      "봄에는 대기질 변동이 커서 미세먼지 예보 확인이 중요합니다.",
    ],
    monthly: [
      { month: "1월", highC: 1, lowC: -7, rainLevel: "low" },
      { month: "2월", highC: 4, lowC: -4, rainLevel: "low" },
      { month: "3월", highC: 10, lowC: 1, rainLevel: "low" },
      { month: "4월", highC: 17, lowC: 7, rainLevel: "low" },
      { month: "5월", highC: 23, lowC: 13, rainLevel: "medium" },
      { month: "6월", highC: 27, lowC: 18, rainLevel: "medium" },
      { month: "7월", highC: 29, lowC: 22, rainLevel: "high" },
      { month: "8월", highC: 30, lowC: 23, rainLevel: "high" },
      { month: "9월", highC: 26, lowC: 18, rainLevel: "medium" },
      { month: "10월", highC: 20, lowC: 11, rainLevel: "low" },
      { month: "11월", highC: 12, lowC: 3, rainLevel: "low" },
      { month: "12월", highC: 4, lowC: -4, rainLevel: "low" },
    ],
  },
  costOfLiving: {
    budgetTiers: [
      {
        item: "백패커",
        price: "$45-70/일",
        note: "호스텔 + 간단한 식사 + 대중교통",
      },
      {
        item: "중간 예산",
        price: "$95-160/일",
        note: "3성급 호텔 + 카페/레스토랑",
      },
      {
        item: "여유 예산",
        price: "$200+/일",
        note: "4-5성급 + 택시 자주 이용 + 프리미엄 식사",
      },
    ],
    dailyEssentials: [
      { item: "길거리/간편식", price: "$6-10" },
      { item: "캐주얼 레스토랑", price: "$10-18" },
      { item: "커피", price: "$3.5-5.5" },
      { item: "맥주(파인트)", price: "$4-7" },
      { item: "생수(500ml)", price: "$0.8-1.3" },
    ],
    monthlyNomad: [
      { item: "원룸 월세(도심)", price: "$900-1,600" },
      { item: "원룸 월세(외곽)", price: "$600-1,050" },
      { item: "식료품", price: "$280-430" },
      { item: "교통 패스/충전", price: "$55-85" },
    ],
    comparisonAnchor:
      "일상 지출 기준으로 도쿄 중심부보다 보통 20-30% 저렴한 편입니다.",
  },
  gettingAround: {
    airports: [
      {
        item: "ICN - 인천국제공항",
        price: "도심까지 50-70분",
        note: "AREX + 공항버스 + 택시",
      },
      {
        item: "GMP - 김포공항",
        price: "도심까지 25-40분",
        note: "지하철 + 택시",
      },
    ],
    visaSnapshot:
      "많은 국적이 단기 체류 시 무비자 입국이 가능하지만, 예약 전 반드시 최신 공식 정책을 확인하세요.",
    localTransport: [
      {
        item: "지하철",
        price: "최상",
        note: "빠르고 깨끗하며 노선이 촘촘함",
      },
      {
        item: "버스망",
        price: "최상",
        note: "배차가 촘촘하고 환승요금 체계가 우수",
      },
      {
        item: "기본 요금",
        price: "약 $1.1-1.3",
        note: "T-money/Cashbee 카드",
      },
    ],
    rideHailingApps: ["Kakao T", "UT"],
    walkability: "high",
    bikeability: "medium",
  },
  connectivity: {
    averageSpeedMbps: "고정 인터넷 평균 120-220 Mbps",
    simOptions: [
      {
        item: "관광 eSIM/SIM 요금제",
        price: "$20-45",
        note: "5-15일권이 일반적",
      },
      { item: "주요 통신사", price: "SK Telecom, KT, LG U+" },
    ],
    wifiAvailability: "excellent",
    coworkingDayPass: "코워킹 데이패스 보통 $20-35/일",
    coworkingExamples: ["WeWork 을지로", "FastFive", "Impact Hub Seoul"],
  },
  neighborhoods: [
    {
      name: "명동",
      vibe: "쇼핑 중심의 핵심 도심.",
      bestFor: ["첫 방문", "쇼핑", "푸드코트"],
    },
    {
      name: "홍대",
      vibe: "젊고 활기찬 밤문화와 인디 문화.",
      bestFor: ["나이트라이프", "학생", "카페"],
    },
    {
      name: "강남",
      vibe: "비즈니스와 고급 상권이 결합된 지역.",
      bestFor: ["비즈니스", "쇼핑", "다이닝"],
    },
    {
      name: "이태원",
      vibe: "국제적이고 다양한 분위기.",
      bestFor: ["외국인", "글로벌 음식", "심야 활동"],
    },
    {
      name: "종로",
      vibe: "궁궐 인근의 역사 중심지.",
      bestFor: ["문화", "산책", "박물관"],
    },
    {
      name: "성수",
      vibe: "창고 재생 공간과 디자인 신.",
      bestFor: ["카페", "디자인", "원격근무"],
    },
  ],
  foodDrink: {
    mustTry: [
      { item: "비빔밥", price: "채소/단백질이 들어간 대표 혼합 밥요리." },
      {
        item: "삼겹살",
        price: "테이블에서 구워 먹는 한국식 돼지고기 BBQ.",
      },
      { item: "김치찌개", price: "매콤하고 든든한 스튜." },
      { item: "떡볶이", price: "대표적인 매운 길거리 간식." },
      { item: "칼국수", price: "칼국수 면이 들어간 따뜻한 국물 요리." },
      { item: "빙수", price: "토핑을 올린 한국식 빙과 디저트." },
    ],
    cultureNotes: [
      "키오스크 주문을 포함해 서비스가 빠르고 효율적인 편입니다.",
      "번화가에서는 심야 식사 선택지가 많습니다.",
      "인기 매장과 카페는 대기줄이 흔합니다.",
    ],
    dietary: [
      {
        item: "채식",
        price: "중간",
        note: "주요 지역 중심으로 선택지가 늘고 있음",
      },
      {
        item: "비건",
        price: "중간",
        note: "전용 매장은 있으나 도심 외 지역은 제한적",
      },
      { item: "할랄", price: "중간", note: "이태원 인근에 집중" },
      {
        item: "글루텐 프리",
        price: "낮음",
        note: "사전 조사와 번역 지원이 필요",
      },
    ],
    tapWaterSafe:
      "대체로 안전하지만, 여행자는 정수/병입수를 선호하기도 합니다.",
    tippingNorm: "대부분 상황에서 팁 문화가 없습니다.",
  },
  languageCulture: {
    englishLevel: "medium",
    phrases: [
      {
        local: "안녕하세요",
        romanization: "annyeonghaseyo",
        english: "안녕하세요",
      },
      {
        local: "감사합니다",
        romanization: "gamsahamnida",
        english: "감사합니다",
      },
      {
        local: "죄송합니다",
        romanization: "joesonghamnida",
        english: "죄송합니다/실례합니다",
      },
      {
        local: "이거 얼마예요?",
        romanization: "igeo eolmayeyo?",
        english: "이거 얼마예요?",
      },
      {
        local: "화장실 어디예요?",
        romanization: "hwajangsil eodiyeyo?",
        english: "화장실이 어디예요?",
      },
      {
        local: "지하철역 어디예요?",
        romanization: "jihacheol-yeok eodiyeyo?",
        english: "지하철역이 어디예요?",
      },
      {
        local: "도와주세요",
        romanization: "dowajuseyo",
        english: "도와주세요",
      },
      {
        local: "괜찮아요",
        romanization: "gwaenchanayo",
        english: "괜찮아요",
      },
    ],
    dos: [
      "격식 있는 상황에서는 물건을 주고받을 때 두 손을 사용하는 것이 좋습니다.",
      "대중교통에서는 목소리를 낮게 유지하세요.",
      "줄서는 순서를 지키는 문화가 강합니다.",
    ],
    donts: [
      "모든 사람이 영어 대화에 익숙할 것이라고 가정하지 마세요.",
      "조용한 공공장소에서 큰 소리 통화는 피하세요.",
      "허용 안내가 없다면 실내에서 신발 착용을 피하세요.",
    ],
  },
  safetyHealth: {
    overallSafety: "excellent",
    commonScams: [
      "유흥가 주변의 바가지 택시 요금.",
      "심야 시간대 바 결제 금액 오해.",
      "주요 관광지 주변 호객행위.",
    ],
    healthcareLevel: "excellent",
    recommendedVaccinations: ["기초 예방접종", "A형 간염", "계절성 독감"],
    emergencyContacts: [
      { item: "경찰", price: "112" },
      { item: "소방/구급", price: "119" },
      { item: "관광통역안내", price: "1330" },
    ],
  },
  practicalInfo: {
    plugType: "Type C / F",
    voltage: "220V, 60Hz",
    paymentCulture:
      "카드 결제가 중심이며, 전통시장이나 소규모 매장에서는 현금이 유용할 수 있습니다.",
    usefulApps: [
      { name: "Naver Map", purpose: "지도 및 로컬 검색" },
      { name: "KakaoMap", purpose: "대체 지도/대중교통 검색" },
      { name: "Kakao T", purpose: "택시 및 이동" },
      { name: "Papago", purpose: "번역" },
      { name: "Coupang Eats", purpose: "배달" },
      { name: "Subway Korea", purpose: "지하철 경로 검색" },
    ],
    businessHours:
      "일반 상점 10:00-21:00, 카페는 08:00-22:00가 흔하고, 식당은 심야 영업이 많은 편입니다.",
  },
  ruleTraps: [
    {
      rule: "기후동행카드 이용 시 하차 태그 의무",
      riskLevel: "high",
      triggerScenario: "지하철/버스 하차 시 반복적으로 태그아웃 누락",
      penaltyOrLoss:
        "반복 위반 시 카드 혜택이 제한되고 일반 요금이 적용될 수 있습니다.",
      howToAvoid:
        "하차 태그를 필수로 인식하고, 개찰구/단말 확인 후 이동하세요.",
      sourceUrl:
        "https://english.seoul.go.kr/policy/transportation/climate-card/",
      lastVerified: "2026-03-02",
    },
    {
      rule: "비공식 공항 택시 호객 탑승 주의",
      riskLevel: "high",
      triggerScenario: "공식 택시 승차줄 전에 제안되는 차량 탑승",
      penaltyOrLoss:
        "과다요금 및 우회 경로 위험이 있고 분쟁 회복이 어렵습니다.",
      howToAvoid:
        "공식 택시 라인, Kakao T 호출, 공항 표지된 버스 카운터를 이용하세요.",
      sourceUrl: "https://english.visitseoul.net/transportation",
      lastVerified: "2026-03-02",
    },
    {
      rule: "유흥가 심야 바 결제 분쟁",
      riskLevel: "medium",
      triggerScenario: "추가 주문 전에 메뉴/가격 확인 없이 진행",
      penaltyOrLoss:
        "예상보다 큰 청구 금액과 분쟁 시간 손실이 발생할 수 있습니다.",
      howToAvoid:
        "사전 가격 확인 후 항목별 영수증으로 라운드 단위 결제를 권장합니다.",
      sourceUrl: "https://english.visitkorea.or.kr/",
      lastVerified: "2026-03-01",
    },
  ],
  livePulse: [
    {
      name: "transport",
      status:
        "환승 전 TOPIS 주요 축 사고/정체 정보를 확인하면 이동 지연을 줄일 수 있습니다.",
      updatedAt: "2026-03-03T08:40:00+09:00",
      sourceUrl: "https://topis.seoul.go.kr/openEngBigData.do",
      staleAfterMinutes: 120,
    },
    {
      name: "uv",
      status:
        "봄철 자외선은 급변할 수 있어, 한낮 야외 일정에는 자외선 차단 준비가 필요합니다.",
      updatedAt: "2026-03-03T08:00:00+09:00",
      sourceUrl: "https://www.weather.go.kr/",
      staleAfterMinutes: 180,
    },
    {
      name: "aqi",
      status:
        "미세먼지와 오존은 구역별 변동이 커 장시간 야외 이동 전 지수 확인이 좋습니다.",
      updatedAt: "2026-03-02T18:00:00+09:00",
      sourceUrl: "https://open-meteo.com/en/docs/air-quality-api",
      staleAfterMinutes: 180,
    },
    {
      name: "advisory",
      status:
        "광역 이동이나 근교 여행 전 최신 여행 권고 수준 확인을 권장합니다.",
      updatedAt: "2026-02-28T10:00:00+09:00",
      sourceUrl:
        "https://travel.state.gov/en/international-travel/travel-advisories.html",
      staleAfterMinutes: 1440,
    },
  ],
  neighborhoodFit: [
    {
      archetype: "first_timer",
      bestAreas: ["명동", "종로", "홍대"],
      cautionAreas: ["심야 대중교통이 약한 외곽 지역"],
      notes: "호텔 등급보다 지하철 접근성을 우선하면 이동 효율이 높습니다.",
      timeFit: {
        day: ["종로", "명동"],
        lateNight: ["홍대", "이태원"],
      },
    },
    {
      archetype: "family",
      bestAreas: ["잠실", "종로", "여의도"],
      cautionAreas: ["22:00 이후 밀집 유흥가 거리"],
      notes:
        "유모차 이용 시 엘리베이터 접근성과 경사가 완만한 동선을 우선 확인하세요.",
      timeFit: {
        day: ["종로", "여의도"],
        lateNight: ["잠실"],
      },
    },
    {
      archetype: "night_owl",
      bestAreas: ["홍대", "이태원", "을지로"],
      cautionAreas: ["공항행 첫차 전 최종차가 빠른 구간"],
      notes:
        "01:00 이후 귀가 가능성이 높다면 심야버스 축 인근 숙소가 유리합니다.",
      timeFit: {
        day: ["성수", "을지로"],
        lateNight: ["홍대", "이태원"],
      },
    },
    {
      archetype: "remote_worker",
      bestAreas: ["성수", "강남", "마포"],
      cautionAreas: ["10:00 이전 카페 선택지가 적은 블록"],
      notes:
        "주간 카페 밀도와 도보권 코워킹 백업 공간을 기준으로 지역을 선택하세요.",
      timeFit: {
        day: ["성수", "강남"],
        lateNight: ["마포"],
      },
    },
  ],
  accessibility: {
    wheelchairTransitCoverage:
      "핵심 지하철 축은 높지만, 노후 역사는 편차가 있습니다",
    stepFreeConfidence: "medium",
    unknownDataRatio: "POI의 약 20-30%는 휠체어 접근 태그 신뢰도가 낮습니다",
    notes: [
      "출퇴근 혼잡 시간 전후에는 역별 엘리베이터 운영 상태를 개별 확인하세요.",
      "저상버스 보급은 넓지만, 정류장 플랫폼 품질은 구별 편차가 큽니다.",
      "구도심 골목은 경사와 턱이 많아 이동 난이도가 올라갈 수 있습니다.",
      "지도의 미확인 접근성 라벨은 확인 전까지 비접근으로 가정하는 것이 안전합니다.",
    ],
  },
}
