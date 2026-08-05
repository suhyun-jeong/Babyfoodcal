import { useState } from 'react'

type Phase = 'early' | 'mid' | 'late'

interface Ingredient {
  name: string
  icon: string
  tip: string
}

interface Category {
  label: string
  color: string
  bg: string
  items: Ingredient[]
}

const PHASES: { id: Phase; label: string; age: string; emoji: string }[] = [
  { id: 'early', label: '초기', age: '만 6~7개월', emoji: '🌱' },
  { id: 'mid', label: '중기', age: '만 7~9개월', emoji: '🌿' },
  { id: 'late', label: '후기', age: '만 10~12개월', emoji: '🌳' },
]

const INGREDIENTS: Record<Phase, Category[]> = {
  early: [
    {
      label: '곡류',
      color: '#b8860b',
      bg: '#fff8e7',
      items: [
        { name: '쌀', icon: '🌾', tip: '10배죽으로 시작. 알레르기 반응이 적고 소화가 쉬워요.' },
        { name: '찹쌀', icon: '🌾', tip: '소화 촉진에 좋아요. 쌀과 혼합 사용 가능.' },
      ],
    },
    {
      label: '채소류',
      color: '#2d8a4e',
      bg: '#edf7f1',
      items: [
        { name: '애호박', icon: '🥬', tip: '단맛이 있어 거부감이 적고 소화가 쉬워요.' },
        { name: '당근', icon: '🥕', tip: '베타카로틴 풍부. 익혀서 으깨어 사용해요.' },
        { name: '브로콜리', icon: '🥦', tip: '철분·칼슘 풍부. 꽃 부분만 사용해요.' },
      ],
    },
    {
      label: '과일류',
      color: '#c0392b',
      bg: '#fef0ee',
      items: [
        { name: '사과', icon: '🍎', tip: '식이섬유 풍부. 으깨거나 즙으로 사용해요.' },
        { name: '바나나', icon: '🍌', tip: '칼륨 풍부하고 단맛. 생으로 으깨어 사용 가능.' },
      ],
    },
  ],
  mid: [
    {
      label: '곡류',
      color: '#b8860b',
      bg: '#fff8e7',
      items: [
        { name: '오트밀', icon: '🌾', tip: '식이섬유·단백질 풍부. 물에 끓여 사용해요.' },
        { name: '현미', icon: '🌾', tip: '잘 불려서 사용. 영양가가 높아요.' },
      ],
    },
    {
      label: '단백질류',
      color: '#7b3f00',
      bg: '#fdf2e9',
      items: [
        { name: '소고기', icon: '🥩', tip: '철분 최고 공급원. 안심·등심 부위가 적합해요.' },
        { name: '닭가슴살', icon: '🍗', tip: '지방 낮고 단백질 풍부. 잘 삶아서 으깨어 사용.' },
        { name: '두부', icon: '⬜', tip: '식물성 단백질. 부드러워 사용하기 좋아요.' },
      ],
    },
    {
      label: '채소류',
      color: '#2d8a4e',
      bg: '#edf7f1',
      items: [
        { name: '시금치', icon: '🌿', tip: '철분·비타민 풍부. 데쳐서 잘게 다져요.' },
        { name: '감자', icon: '🥔', tip: '탄수화물 공급원. 삶아서 으깨어 사용.' },
        { name: '콜리플라워', icon: '🥦', tip: '소화가 쉽고 부드러워요.' },
      ],
    },
  ],
  late: [
    {
      label: '곡류',
      color: '#b8860b',
      bg: '#fff8e7',
      items: [
        { name: '기장', icon: '🌾', tip: '미네랄 풍부. 쌀과 혼합하여 사용해요.' },
        { name: '수수', icon: '🌾', tip: '철분·마그네슘 함유. 소량씩 혼합해요.' },
      ],
    },
    {
      label: '단백질류',
      color: '#7b3f00',
      bg: '#fdf2e9',
      items: [
        { name: '연어', icon: '🐟', tip: '오메가3 풍부. 가시 제거 후 잘 익혀 사용.' },
        { name: '달걀 노른자', icon: '🥚', tip: '8개월부터 노른자만. 철분·콜린 풍부.' },
        { name: '닭고기', icon: '🍗', tip: '다양한 부위 사용 가능. 기름기 제거 후 사용.' },
      ],
    },
    {
      label: '채소·과일류',
      color: '#2d8a4e',
      bg: '#edf7f1',
      items: [
        { name: '아보카도', icon: '🥑', tip: '건강한 지방 공급원. 으깨서 바로 사용.' },
        { name: '블루베리', icon: '🫐', tip: '항산화 성분 풍부. 으깨거나 잘게 잘라요.' },
        { name: '고구마', icon: '🍠', tip: '비타민A 풍부. 쪄서 으깨면 달콤해요.' },
      ],
    },
  ],
}

export default function IngredientGuide() {
  const [phase, setPhase] = useState<Phase>('early')
  const [expanded, setExpanded] = useState<string | null>(null)

  const categories = INGREDIENTS[phase]

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-bold" style={{ color: '#2d2d2d' }}>단계별 추천 식재료</h2>
        <p className="text-sm mt-1" style={{ color: '#9b9b9b' }}>월령에 맞는 식재료를 확인해보세요</p>
      </div>

      {/* Phase tabs */}
      <div className="flex rounded-2xl p-1 gap-1" style={{ backgroundColor: '#f0ebe5' }}>
        {PHASES.map((p) => (
          <button
            key={p.id}
            onClick={() => setPhase(p.id)}
            className="flex-1 flex flex-col items-center py-2 rounded-xl transition-all"
            style={
              phase === p.id
                ? { backgroundColor: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                : {}
            }
          >
            <span className="text-lg">{p.emoji}</span>
            <span className="text-sm font-bold" style={{ color: phase === p.id ? '#ff8c69' : '#9b9b9b' }}>
              {p.label}
            </span>
            <span className="text-xs" style={{ color: '#b0a89e' }}>{p.age}</span>
          </button>
        ))}
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.label} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #f0ebe5' }}>
          <div className="px-4 py-3" style={{ backgroundColor: cat.bg }}>
            <span className="text-sm font-bold" style={{ color: cat.color }}>{cat.label}</span>
          </div>
          <div className="divide-y" style={{ backgroundColor: '#ffffff', borderColor: '#f7f4f0' }}>
            {cat.items.map((item) => (
              <button
                key={item.name}
                className="w-full px-4 py-3 text-left transition-all"
                onClick={() => setExpanded(expanded === `${cat.label}-${item.name}` ? null : `${cat.label}-${item.name}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm" style={{ color: '#2d2d2d' }}>{item.name}</span>
                  </div>
                  <span style={{ color: '#c0b8b0', fontSize: '18px' }}>
                    {expanded === `${cat.label}-${item.name}` ? '−' : '+'}
                  </span>
                </div>
                {expanded === `${cat.label}-${item.name}` && (
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#666666' }}>
                    {item.tip}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
