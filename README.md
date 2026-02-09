# Startup Synergy

CliftonStrengths 기반 창업 파트너 궁합 분석 앱

## 기능

- 두 명의 창업 파트너가 각자의 강점 Top 5 입력
- 창업 아이템 입력
- AI가 분석하는 파트너십 리포트:
  - 시너지 점수 (0-100)
  - 예상 도달 단계 (실패 ~ IPO)
  - 시너지 포인트
  - 주의할 점
  - 추천 역할
  - 조언

## 로컬 개발

```bash
npm install
npm run dev
```

## Vercel 배포

1. Vercel에 프로젝트 연결
2. Environment Variables에 `ANTHROPIC_API_KEY` 추가
3. 배포

## 환경 변수

| 변수명 | 설명 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 키 |
