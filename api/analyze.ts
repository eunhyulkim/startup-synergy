import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Partner {
  name: string;
  strengths: string[];
}

interface RequestBody {
  partner1: Partner;
  partner2: Partner;
  businessIdea: string;
}

// 34개 테마 -> 4개 도메인 매핑
const themeToDomain: Record<string, string> = {
  // Executing (9개)
  Achiever: "Executing",
  Arranger: "Executing",
  Belief: "Executing",
  Consistency: "Executing",
  Deliberative: "Executing",
  Discipline: "Executing",
  Focus: "Executing",
  Responsibility: "Executing",
  Restorative: "Executing",
  // Influencing (8개)
  Activator: "Influencing",
  Command: "Influencing",
  Communication: "Influencing",
  Competition: "Influencing",
  Maximizer: "Influencing",
  "Self-Assurance": "Influencing",
  Significance: "Influencing",
  Woo: "Influencing",
  // Relationship Building (9개)
  Adaptability: "RelationshipBuilding",
  Connectedness: "RelationshipBuilding",
  Developer: "RelationshipBuilding",
  Empathy: "RelationshipBuilding",
  Harmony: "RelationshipBuilding",
  Includer: "RelationshipBuilding",
  Individualization: "RelationshipBuilding",
  Positivity: "RelationshipBuilding",
  Relator: "RelationshipBuilding",
  // Strategic Thinking (8개)
  Analytical: "StrategicThinking",
  Context: "StrategicThinking",
  Futuristic: "StrategicThinking",
  Ideation: "StrategicThinking",
  Input: "StrategicThinking",
  Intellection: "StrategicThinking",
  Learner: "StrategicThinking",
  Strategic: "StrategicThinking",
};

// "한글 (English)" 형식에서 영어 이름 추출
function extractEnglishName(strength: string): string {
  const match = strength.match(/\(([^)]+)\)/);
  return match ? match[1] : strength;
}

// 궁합 점수 계산: 두 파트너의 강점으로 도메인 균형도 측정
function calculateCompatibility(strengths1: string[], strengths2: string[]): { stage: string; diff: number } {
  const points = [5, 4, 3, 2, 1];
  const domainScores: Record<string, number> = {
    Executing: 0,
    Influencing: 0,
    RelationshipBuilding: 0,
    StrategicThinking: 0,
  };

  // 각 파트너의 강점에 점수 부여
  strengths1.forEach((theme, i) => {
    const englishName = extractEnglishName(theme);
    const domain = themeToDomain[englishName];
    if (domain) domainScores[domain] += points[i];
  });

  strengths2.forEach((theme, i) => {
    const englishName = extractEnglishName(theme);
    const domain = themeToDomain[englishName];
    if (domain) domainScores[domain] += points[i];
  });

  const scores = Object.values(domainScores);
  const diff = Math.max(...scores) - Math.min(...scores);

  // 차이값 -> 단계 매핑
  let stage: string;
  if (diff <= 3) stage = "IPO";
  else if (diff === 4) stage = "Series D";
  else if (diff === 5) stage = "Series C";
  else if (diff === 6) stage = "Series B";
  else if (diff <= 8) stage = "Series A";
  else if (diff <= 10) stage = "Pre-A";
  else if (diff <= 12) stage = "Seed";
  else if (diff <= 16) stage = "Pre-Seed";
  else stage = "실패";

  return { stage, diff };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { partner1, partner2, businessIdea } = req.body as RequestBody;

    // 궁합 점수 계산
    const { stage, diff } = calculateCompatibility(partner1.strengths, partner2.strengths);

    const prompt = `당신은 CliftonStrengths 전문가이자 스타트업 컨설턴트입니다.

두 명의 창업 파트너가 있습니다:

**${partner1.name}**
- 1순위: ${partner1.strengths[0]}
- 2순위: ${partner1.strengths[1]}
- 3순위: ${partner1.strengths[2]}
- 4순위: ${partner1.strengths[3]}
- 5순위: ${partner1.strengths[4]}

**${partner2.name}**
- 1순위: ${partner2.strengths[0]}
- 2순위: ${partner2.strengths[1]}
- 3순위: ${partner2.strengths[2]}
- 4순위: ${partner2.strengths[3]}
- 5순위: ${partner2.strengths[4]}

**창업 아이템:** ${businessIdea}

**이 팀의 도메인 균형도 분석 결과:** 도메인 간 점수 차이 ${diff}점 → **${stage}** 단계

다음 형식으로 분석 리포트를 작성해주세요.

**작성 스타일:**
- 모든 문장은 '~요'체로 끝나야 해요.
- 단정적인 표현 대신 부드러운 표현을 써주세요: "~할 수 있어요", "~하게 될 수도 있어요", "~해보는 것도 좋아요", "~일 것 같아요" 등
- 추상적인 용어 대신, 이 창업 아이템을 만들어가며 겪게 될 구체적인 상황과 에피소드를 그려주세요.
- "${businessIdea}"의 특성이 분석에 잘 드러나야 해요.
- 두 사람이 함께 기뻐할 순간, 힘들어할 순간, 갈등할 순간들을 생생하게 묘사해주세요.

{
  "stage": "${stage}",
  "stageReason": "(이 팀이 ${stage} 단계까지 갈 수 있는 이유를 구체적인 장면으로 2-3문장)",
  "strengths": [
    "(이 아이템을 만들며 시너지가 날 구체적인 순간 1)",
    "(이 아이템을 만들며 시너지가 날 구체적인 순간 2)",
    "(이 아이템을 만들며 시너지가 날 구체적인 순간 3)"
  ],
  "concerns": [
    "(이 아이템을 만들며 갈등하거나 힘들어할 구체적인 순간 1)",
    "(이 아이템을 만들며 갈등하거나 힘들어할 구체적인 순간 2)",
    "(이 아이템을 만들며 갈등하거나 힘들어할 구체적인 순간 3)"
  ],
  "advice": "(이 팀이 이 아이템으로 성공하기 위한 현실적인 조언 2-3문장)",
  "roleRecommendation": {
    "${partner1.name}": "(이 사람이 맡으면 좋을 구체적인 역할과 그 이유)",
    "${partner2.name}": "(이 사람이 맡으면 좋을 구체적인 역할과 그 이유)"
  }
}

JSON만 출력하세요.
주의사항:
- 각 문자열 값은 한 줄로 작성하세요 (줄바꿈 금지)
- 문자열 안에 따옴표(")를 사용하지 마세요
- 특수문자(\\, /) 사용을 피하세요`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5-20251101",
        max_tokens: 2048,
        messages: [
          { role: "user", content: prompt },
          { role: "assistant", content: "{" }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return res.status(500).json({ error: "API 호출 실패" });
    }

    const data = await response.json();
    let text = "{" + data.content[0].text;

    // 끝에 불완전한 부분이 있으면 제거
    const lastBrace = text.lastIndexOf("}");
    if (lastBrace !== -1) {
      text = text.substring(0, lastBrace + 1);
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      // JSON 문자열 내부의 줄바꿈을 공백으로 치환 후 재시도
      const fixed = text.replace(/"([^"]*?)"/g, (match) => {
        return match.replace(/\n/g, " ");
      });
      result = JSON.parse(fixed);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof SyntaxError) {
      return res.status(500).json({ error: "AI 응답 파싱에 실패했습니다. 다시 시도해주세요." });
    }
    return res.status(500).json({ error: "분석 중 오류가 발생했습니다." });
  }
}
