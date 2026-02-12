import { useState, useEffect } from 'react'
import { STRENGTHS } from './data/strengths'
import { Conference } from './pages/Conference'
import './App.css'

interface Partner {
  name: string
  strengths: string[]
}

interface AnalysisResult {
  synergyScore: number
  stage: string
  stageReason: string
  strengths: string[]
  concerns: string[]
  advice: string
  roleRecommendation: Record<string, string>
}

const STAGES = [
  '실패',
  'Pre-Seed',
  'Seed',
  'Pre-A',
  'Series A',
  'Series B',
  'Series C',
  'Series D',
  'IPO',
]

function StrengthSelect({
  rank,
  value,
  onChange,
  excludeValues,
}: {
  rank: number
  value: string
  onChange: (value: string) => void
  excludeValues: string[]
}) {
  return (
    <div className="strength-row">
      <span className="rank">{rank}순위</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">선택하세요</option>
        {STRENGTHS.map((s) => (
          <option
            key={s.en}
            value={`${s.ko} (${s.en})`}
            disabled={excludeValues.includes(`${s.ko} (${s.en})`)}
          >
            {s.ko} ({s.en})
          </option>
        ))}
      </select>
    </div>
  )
}

function PartnerForm({
  label,
  partner,
  setPartner,
}: {
  label: string
  partner: Partner
  setPartner: (p: Partner) => void
}) {
  const updateStrength = (index: number, value: string) => {
    const newStrengths = [...partner.strengths]
    newStrengths[index] = value
    setPartner({ ...partner, strengths: newStrengths })
  }

  return (
    <div className="partner-form">
      <h2>{label}</h2>
      <input
        type="text"
        placeholder="이름"
        value={partner.name}
        onChange={(e) => setPartner({ ...partner, name: e.target.value })}
        required
      />
      <div className="strengths-list">
        {[0, 1, 2, 3, 4].map((i) => (
          <StrengthSelect
            key={i}
            rank={i + 1}
            value={partner.strengths[i]}
            onChange={(v) => updateStrength(i, v)}
            excludeValues={partner.strengths.filter((_, idx) => idx !== i)}
          />
        ))}
      </div>
    </div>
  )
}

function StageIndicator({ currentStage }: { currentStage: string }) {
  const currentIndex = STAGES.indexOf(currentStage)

  return (
    <div className="stage-indicator">
      <h3>예상 도달 단계</h3>
      <div className="stages">
        {/* 1행: 0-4 */}
        <div className="stage-row">
          {STAGES.slice(0, 5).map((stage, index) => (
            <div
              key={stage}
              className={`stage ${index <= currentIndex ? 'reached' : ''} ${
                index === currentIndex ? 'current' : ''
              }`}
            >
              <div className="stage-dot">{index + 1}</div>
              <span className="stage-label">{stage}</span>
              {index < 4 && (
                <div
                  className={`connector connector-h ${index + 1 <= currentIndex ? 'reached' : ''}`}
                />
              )}
            </div>
          ))}
        </div>
        {/* 세로 연결선 */}
        <div
          className={`connector-vertical ${currentIndex >= 5 ? 'reached' : ''}`}
        />
        {/* 2행: 5-8 (역순 배치) */}
        <div className="stage-row stage-row-reverse">
          {STAGES.slice(5, 9).map((stage, i) => {
            const index = 5 + i
            return (
              <div
                key={stage}
                className={`stage ${index <= currentIndex ? 'reached' : ''} ${
                  index === currentIndex ? 'current' : ''
                }`}
              >
                <div className="stage-dot">{index + 1}</div>
                <span className="stage-label">{stage}</span>
                {i < 3 && (
                  <div
                    className={`connector connector-h connector-left ${index + 1 <= currentIndex ? 'reached' : ''}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  result,
  partner1Name,
  partner2Name,
}: {
  result: AnalysisResult
  partner1Name: string
  partner2Name: string
}) {
  return (
    <div className="result-card">
      <div className="stage-hero">
        <span className="stage-hero-label">예상 도달 단계</span>
        <span className="stage-hero-value">{result.stage}</span>
      </div>

      <StageIndicator currentStage={result.stage} />
      <p className="stage-reason">{result.stageReason}</p>

      <div className="analysis-section">
        <div className="analysis-block strengths-block">
          <h3>시너지 포인트</h3>
          <ul>
            {result.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-block concerns-block">
          <h3>주의할 점</h3>
          <ul>
            {result.concerns.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="roles-section">
        <h3>추천 역할</h3>
        <div className="roles">
          <div className="role">
            <strong>{partner1Name}</strong>
            <p>{result.roleRecommendation[partner1Name]}</p>
          </div>
          <div className="role">
            <strong>{partner2Name}</strong>
            <p>{result.roleRecommendation[partner2Name]}</p>
          </div>
        </div>
      </div>

      <div className="advice-section">
        <h3>조언</h3>
        <p>{result.advice}</p>
      </div>
    </div>
  )
}

function SynergyApp() {
  const [partner1, setPartner1] = useState<Partner>({
    name: '',
    strengths: ['', '', '', '', ''],
  })
  const [partner2, setPartner2] = useState<Partner>({
    name: '',
    strengths: ['', '', '', '', ''],
  })
  const [businessIdea, setBusinessIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  const isValid =
    partner1.name &&
    partner2.name &&
    partner1.strengths.every((s) => s) &&
    partner2.strengths.every((s) => s) &&
    businessIdea

  const handleSubmit = async () => {
    if (!isValid) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner1, partner2, businessIdea }),
      })

      if (!response.ok) {
        throw new Error('분석에 실패했습니다.')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPartner1({ name: '', strengths: ['', '', '', '', ''] })
    setPartner2({ name: '', strengths: ['', '', '', '', ''] })
    setBusinessIdea('')
    setResult(null)
    setError('')
  }

  return (
    <div className="app">
      <header>
        <h1>AI 창업 시뮬레이터</h1>
        <p>우리는 어디까지 갈 수 있을까</p>
      </header>

      <main>
        {!result ? (
          <>
            <p className="intro-guide">
              두 사람의 강점혁명 검사결과와 창업 아이템을 입력하면 어느
              시리즈까지 갈 수 있을지, 어떤 시너지를 만들 수 있을지, 어떤 기쁨과
              슬픔을 겪게 될지 일 궁합에 대해 알 수 있어요.
            </p>
            <div className="partners-container">
              <PartnerForm
                label="파트너 1"
                partner={partner1}
                setPartner={setPartner1}
              />
              <PartnerForm
                label="파트너 2"
                partner={partner2}
                setPartner={setPartner2}
              />
            </div>

            <div className="business-idea">
              <h2>창업 아이템</h2>
              <textarea
                placeholder="어떤 사업을 하려고 하나요? 자세히 적을수록 좋아요."
                value={businessIdea}
                onChange={(e) => setBusinessIdea(e.target.value)}
                rows={4}
              />
            </div>

            {error && <p className="error">{error}</p>}

            {loading ? (
              <div className="loading-container">
                <div className="loading-bar">
                  <div className="loading-progress" />
                </div>
                <div className="loading-text-container">
                  <div className="loading-text-roller">
                    <span>창업을 준비하고 있어요</span>
                    <span>팀 케미스트리를 분석하고 있어요</span>
                    <span>아이디어를 검증하고 있어요</span>
                    <span>시장 규모를 조사하고 있어요</span>
                    <span>경쟁사를 분석하고 있어요</span>
                    <span>비즈니스 모델을 구상하고 있어요</span>
                    <span>MVP를 설계하고 있어요</span>
                    <span>POC를 진행하고 있어요</span>
                    <span>법인을 설립하고 있어요</span>
                    <span>사업계획서를 쓰고 있어요</span>
                    <span>피칭덱을 만들고 있어요</span>
                    <span>IR 미팅을 잡고 있어요</span>
                    <span>투자 가능성을 검토하고 있어요</span>
                    <span>투자 조건을 협상하고 있어요</span>
                    <span>미래를 들여다보고 있어요</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="button-group">
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  창업하기
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <ResultCard
              result={result}
              partner1Name={partner1.name}
              partner2Name={partner2.name}
            />
            <button className="reset-btn" onClick={handleReset}>
              새로 창업하기
            </button>
          </>
        )}
      </main>

      <footer>
        <p>CliftonStrengths 기반 분석 | Kit Lab</p>
      </footer>
    </div>
  )
}

function App() {
  const [page, setPage] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handleHashChange = () => setPage(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (page === '#/conference') {
    return <Conference />
  }

  return <SynergyApp />
}

export default App
