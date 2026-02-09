// 다양한 강점 조합 테스트 스크립트
// 실행: node test-scenarios.mjs

const API_URL = "http://localhost:3000/api/analyze";

const scenarios = [
  {
    name: "시나리오 1: 전략가 + 공감형 (밸런스 좋음)",
    partner1: {
      name: "김전략",
      strengths: [
        "전략 (Strategic)",
        "발상 (Ideation)",
        "미래지향 (Futuristic)",
        "성취자 (Achiever)",
        "행동 (Activator)",
      ],
    },
    partner2: {
      name: "이공감",
      strengths: [
        "공감 (Empathy)",
        "커뮤니케이션 (Communication)",
        "개발 (Developer)",
        "절친 (Relator)",
        "화합 (Harmony)",
      ],
    },
    businessIdea: "AI 기반 멘탈 헬스케어 앱",
  },
  {
    name: "시나리오 2: 분석가 + 분석가 (편중)",
    partner1: {
      name: "박분석",
      strengths: [
        "분석 (Analytical)",
        "심사숙고 (Deliberative)",
        "맥락 (Context)",
        "배움 (Learner)",
        "지적사고 (Intellection)",
      ],
    },
    partner2: {
      name: "최연구",
      strengths: [
        "수집 (Input)",
        "분석 (Analytical)",
        "전략 (Strategic)",
        "심사숙고 (Deliberative)",
        "체계 (Discipline)",
      ],
    },
    businessIdea: "B2B SaaS 데이터 분석 플랫폼",
  },
  {
    name: "시나리오 3: 실행형 + 실행형 (액션 중심)",
    partner1: {
      name: "정실행",
      strengths: [
        "행동 (Activator)",
        "성취자 (Achiever)",
        "경쟁 (Competition)",
        "지휘 (Command)",
        "자기확신 (Self-Assurance)",
      ],
    },
    partner2: {
      name: "한돌파",
      strengths: [
        "성취자 (Achiever)",
        "집중 (Focus)",
        "책임 (Responsibility)",
        "정리 (Arranger)",
        "행동 (Activator)",
      ],
    },
    businessIdea: "퀵커머스 배달 서비스",
  },
  {
    name: "시나리오 4: 관계형 + 아이디어형",
    partner1: {
      name: "송관계",
      strengths: [
        "사교성 (Woo)",
        "커뮤니케이션 (Communication)",
        "긍정 (Positivity)",
        "포용 (Includer)",
        "공감 (Empathy)",
      ],
    },
    partner2: {
      name: "윤창의",
      strengths: [
        "발상 (Ideation)",
        "미래지향 (Futuristic)",
        "전략 (Strategic)",
        "적응 (Adaptability)",
        "연결성 (Connectedness)",
      ],
    },
    businessIdea: "크리에이터 매칭 플랫폼",
  },
  {
    name: "시나리오 5: 신중형 + 즉흥형 (상반)",
    partner1: {
      name: "임신중",
      strengths: [
        "심사숙고 (Deliberative)",
        "분석 (Analytical)",
        "일관성 (Consistency)",
        "체계 (Discipline)",
        "책임 (Responsibility)",
      ],
    },
    partner2: {
      name: "강즉흥",
      strengths: [
        "적응 (Adaptability)",
        "행동 (Activator)",
        "긍정 (Positivity)",
        "사교성 (Woo)",
        "발상 (Ideation)",
      ],
    },
    businessIdea: "라이브 커머스 플랫폼",
  },
];

async function testScenario(scenario) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`테스트: ${scenario.name}`);
  console.log(`아이템: ${scenario.businessIdea}`);
  console.log(`${"=".repeat(60)}`);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partner1: scenario.partner1,
        partner2: scenario.partner2,
        businessIdea: scenario.businessIdea,
      }),
    });

    if (!response.ok) {
      console.log(`❌ 실패: ${response.status}`);
      return null;
    }

    const result = await response.json();
    console.log(`\n📊 예상 도달 단계: ${result.stage}`);
    console.log(`📝 이유: ${result.stageReason}`);
    console.log(`\n✅ 시너지 포인트:`);
    result.strengths.forEach((s, i) => console.log(`   ${i + 1}. ${s}`));
    console.log(`\n⚠️ 우려 사항:`);
    result.concerns.forEach((c, i) => console.log(`   ${i + 1}. ${c}`));

    return result.stage;
  } catch (error) {
    console.log(`❌ 에러: ${error.message}`);
    return null;
  }
}

async function runAllTests() {
  console.log("🚀 Startup Synergy 테스트 시작\n");
  console.log("5개 시나리오를 순차적으로 테스트합니다.");
  console.log("각 테스트는 10초 이상 소요될 수 있습니다.\n");

  const results = [];

  for (const scenario of scenarios) {
    const stage = await testScenario(scenario);
    results.push({ name: scenario.name, stage });
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log("📈 테스트 결과 요약");
  console.log(`${"=".repeat(60)}`);
  results.forEach((r) => {
    console.log(`${r.name}: ${r.stage || "실패"}`);
  });

  const stages = results.map((r) => r.stage).filter(Boolean);
  const uniqueStages = [...new Set(stages)];
  console.log(`\n다양성: ${uniqueStages.length}개의 서로 다른 단계 (${uniqueStages.join(", ")})`);
}

runAllTests();
