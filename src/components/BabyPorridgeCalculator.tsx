import { useState } from 'react'

type Stage = '10배죽' | '7배죽' | '5배죽' | '3배죽' | '2배죽'

interface StageInfo {
  label: string
  shortLabel: string
  age: string
  emoji: string
  description: string
  ratios: { rice: number; grain: number; meat: number; veggie: number; water: number }
}

const STAGES: Record<Stage, StageInfo> = {
  '10배죽': {
    label: '10배죽',
    shortLabel: '10배죽',
    age: '만 6~7개월',
    emoji: '👶',
    description: '아주 부드럽고 묽은 상태로, 이유식을 시작하거나 초기 적응에 적합한 단계예요',
    ratios: { rice: 8, grain: 0, meat: 0, veggie: 2, water: 90 },
  },
  '7배죽': {
    label: '7배죽',
    shortLabel: '7배죽',
    age: '만 7~8개월',
    emoji: '👶',
    description: '조금씩 농도를 높이며 다양한 재료를 시도하는 단계예요',
    ratios: { rice: 10, grain: 3, meat: 5, veggie: 8, water: 74 },
  },
  '5배죽': {
    label: '5배죽',
    shortLabel: '5배죽',
    age: '만 8~9개월',
    emoji: '👶',
    description: '부드럽지만 적당한 농도로, 가장 많이 사용하는 기본 단계예요',
    ratios: { rice: 10, grain: 5, meat: 10, veggie: 15, water: 60 },
  },
  '3배죽': {
    label: '3배죽',
    shortLabel: '3배죽',
    age: '만 12~18개월',
    emoji: '👶',
    description: '일반식으로 넘어가기 전, 밥 형태에 가까운 단계예요',
    ratios: { rice: 15, grain: 8, meat: 12, veggie: 20, water: 45 },
  },
  '2배죽': {
    label: '2배죽(진밥)',
    shortLabel: '2배죽',
    age: '만 18개월~',
    emoji: '👶',
    description: '거의 밥에 가까운 형태로, 일반식 전환 전 마지막 단계예요',
    ratios: { rice: 20, grain: 10, meat: 15, veggie: 20, water: 35 },
  },
}

const STAGE_ORDER: Stage[] = ['10배죽', '7배죽', '5배죽', '3배죽', '2배죽']

const INGREDIENT_COLORS = {
  rice: '#f5c074',
  grain: '#a8d5a2',
  meat: '#f08080',
  veggie: '#7ec8a0',
  water: '#87ceeb',
}

const INGREDIENT_ICONS = {
  rice: '🌾',
  grain: '🌿',
  meat: '🥩',
  veggie: '🥕',
  water: '💧',
}

interface Results {
  rice: number
  grain: number
  meat: number
  veggie: number
  water: number
}

function roundToFive(n: number): number {
  return Math.round(n / 5) * 5
}

export default function BabyPorridgeCalculator() {
  const [stage, setStage] = useState<Stage>('5배죽')
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [results, setResults] = useState<Results | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  const stageInfo = STAGES[stage]
  const { ratios } = stageInfo

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (val === '') {
      setInputValue('')
      setInputError('')
      return
    }
    if (/[^0-9]/.test(val)) {
      if (val.includes('.')) {
        setInputError('정수만 입력해주세요.')
      } else {
        setInputError('숫자만 입력해주세요.')
      }
      setInputValue(val.replace(/[^0-9]/g, ''))
      return
    }
    setInputError('')
    setInputValue(val)
  }

  function handleCalculate() {
    const num = parseInt(inputValue, 10)
    if (!inputValue || isNaN(num)) {
      setInputError('양을 입력해주세요.')
      return
    }
    if (num < 50) {
      setInputError('최소 50g 이상 입력해주세요.')
      return
    }
    if (num > 1200) {
      setInputError('최대 1200g까지 입력할 수 있어요.')
      return
    }
    setInputError('')
    const r = ratios
    setResults({
      rice: Math.round((num * r.rice) / 100),
      grain: Math.round((num * r.grain) / 100),
      meat: Math.round((num * r.meat) / 100),
      veggie: Math.round((num * r.veggie) / 100),
      water: roundToFive((num * r.water) / 100),
    })
    setHasCalculated(true)
  }

  const isButtonEnabled = inputValue !== '' && inputError === ''

  const ingredients = [
    { key: 'rice', label: '쌀', value: results?.rice, unit: 'g', ratio: ratios.rice, color: INGREDIENT_COLORS.rice, icon: INGREDIENT_ICONS.rice },
    { key: 'grain', label: '잡곡', value: results?.grain, unit: 'g', ratio: ratios.grain, color: INGREDIENT_COLORS.grain, icon: INGREDIENT_ICONS.grain },
    { key: 'meat', label: '고기', value: results?.meat, unit: 'g', ratio: ratios.meat, color: INGREDIENT_COLORS.meat, icon: INGREDIENT_ICONS.meat },
    { key: 'veggie', label: '야채', value: results?.veggie, unit: 'g', ratio: ratios.veggie, color: INGREDIENT_COLORS.veggie, icon: INGREDIENT_ICONS.veggie },
    { key: 'water', label: '물', value: results?.water, unit: 'ml', ratio: ratios.water, color: INGREDIENT_COLORS.water, icon: INGREDIENT_ICONS.water },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <div className="text-center pt-2">
        <h2 className="text-2xl font-bold" style={{ color: '#2d2d2d' }}>이유식 배죽 계산기</h2>
        <p className="text-sm mt-1" style={{ color: '#9b9b9b' }}>단계에 맞는 재료 비율을 계산해드려요</p>
      </div>

      {/* Stage selector */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: '#ffffff', border: '1px solid #f0ebe5' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: '#9b9b9b' }}>배죽 단계 선택</p>
        <div className="flex gap-2 flex-wrap">
          {STAGE_ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className="flex-1 min-w-fit px-3 py-2 rounded-full text-sm font-medium transition-all"
              style={
                stage === s
                  ? { backgroundColor: '#ff8c69', color: '#ffffff', fontWeight: 700 }
                  : { backgroundColor: '#f7f4f0', color: '#666666' }
              }
            >
              {STAGES[s].shortLabel === '2배죽' ? '2배죽\n(진밥)' : STAGES[s].shortLabel}
            </button>
          ))}
        </div>

        {/* Stage description */}
        <div className="mt-3 rounded-xl px-4 py-3" style={{ backgroundColor: '#fff8f5' }}>
          <p className="text-sm font-semibold" style={{ color: '#ff8c69' }}>
            {stageInfo.emoji} {stageInfo.age}
          </p>
          <p className="text-sm mt-1" style={{ color: '#555555' }}>{stageInfo.description}</p>
        </div>
      </div>

      {/* Input + Calculate */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: '#ffffff', border: '1px solid #f0ebe5' }}>
        <p className="text-sm font-semibold mb-3" style={{ color: '#2d2d2d' }}>만들고 싶은 양</p>
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="예: 300"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full rounded-xl px-4 py-3 text-lg font-semibold outline-none transition-all"
              style={{
                backgroundColor: '#f7f4f0',
                border: inputError ? '2px solid #f08080' : '2px solid transparent',
                color: '#2d2d2d',
              }}
              onFocus={(e) => { if (!inputError) e.currentTarget.style.border = '2px solid #ff8c69' }}
              onBlur={(e) => { if (!inputError) e.currentTarget.style.border = '2px solid transparent' }}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold"
              style={{ color: '#9b9b9b' }}
            >g</span>
          </div>
          <button
            disabled={!isButtonEnabled}
            onClick={handleCalculate}
            className="px-6 py-3 rounded-xl font-bold text-base transition-all"
            style={
              isButtonEnabled
                ? { backgroundColor: '#ff8c69', color: '#ffffff' }
                : { backgroundColor: '#f0ebe5', color: '#c0b8b0', cursor: 'not-allowed' }
            }
          >
            계산
          </button>
        </div>
        {inputError ? (
          <p className="text-xs mt-2 font-medium" style={{ color: '#f08080' }}>{inputError}</p>
        ) : (
          <p className="text-xs mt-2" style={{ color: '#9b9b9b' }}>최소 50g ~ 최대 1200g</p>
        )}
      </div>

      {/* Carousel Banner */}
      <div className="flex justify-center w-full overflow-hidden rounded-2xl">
        <iframe
          srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;display:flex;justify-content:center;align-items:center;overflow:hidden;}</style></head><body><script src="https://ads-partners.coupang.com/g.js"><\/script><script>new PartnersCoupang.G({"id":1021493,"template":"carousel","trackingCode":"AF2623204","width":"500","height":"140","tsource":""});<\/script></body></html>`}
          width={500}
          height={140}
          scrolling="no"
          frameBorder={0}
          style={{ border: 'none', display: 'block', maxWidth: '100%' }}
        />
      </div>

      {/* Ingredient ratio bar */}
      <div className="rounded-2xl p-4" style={{ backgroundColor: '#ffffff', border: '1px solid #f0ebe5' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: '#9b9b9b' }}>재료 비율</p>

        {/* Icon row */}
        <div className="flex mb-1">
          {ingredients.map((ing) => (
            <div
              key={ing.key}
              className="flex flex-col items-center"
              style={{ width: `${ing.ratio}%`, minWidth: ing.ratio > 0 ? '20px' : '0' }}
            >
              <span className="text-base">{ing.icon}</span>
            </div>
          ))}
        </div>

        {/* Bar */}
        <div className="flex rounded-full overflow-hidden h-5">
          {ingredients.map((ing) =>
            ing.ratio > 0 ? (
              <div
                key={ing.key}
                style={{ width: `${ing.ratio}%`, backgroundColor: ing.color }}
                className="transition-all duration-500"
              />
            ) : null
          )}
        </div>

        {/* Percentage labels */}
        <div className="flex mt-1">
          {ingredients.map((ing) => (
            ing.ratio > 0 ? (
              <div
                key={ing.key}
                className="text-center"
                style={{ width: `${ing.ratio}%`, minWidth: '20px' }}
              >
                <span className="text-xs" style={{ color: '#9b9b9b' }}>{ing.ratio}%</span>
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Results */}
      {hasCalculated && results ? (
        <div className="rounded-2xl p-4" style={{ backgroundColor: '#ffffff', border: '1px solid #f0ebe5' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: '#2d2d2d' }}>계산 결과</p>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: '#fff8f5', color: '#ff8c69' }}>
              총 {inputValue}g 기준
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {ingredients.map((ing) => (
              <div key={ing.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ing.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: '#2d2d2d' }}>
                    {ing.icon} {ing.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold" style={{ color: '#2d2d2d' }}>
                    {ing.value}
                  </span>
                  <span className="text-sm font-medium" style={{ color: '#9b9b9b' }}>{ing.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 flex flex-col items-center gap-2"
          style={{ backgroundColor: '#f7f4f0', border: '2px dashed #e8e2dc' }}
        >
          <span className="text-3xl">🍚</span>
          <p className="text-sm text-center" style={{ color: '#b0a89e' }}>
            양을 입력하고 계산 버튼을 누르면<br />재료별 필요량이 나타나요
          </p>
        </div>
      )}
    </div>
  )
}
