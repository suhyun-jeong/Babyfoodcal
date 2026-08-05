import { useState } from 'react'

interface GuideItem {
  title: string
  icon: string
  content: string[]
}

interface GuideSection {
  id: string
  label: string
  emoji: string
  color: string
  bg: string
  items: GuideItem[]
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'basics',
    label: '이유식 기초',
    emoji: '📌',
    color: '#ff8c69',
    bg: '#fff8f5',
    items: [
      {
        title: '이유식 시작 시기',
        icon: '⏰',
        content: [
          '생후 4~6개월 사이, 보통 만 6개월(180일) 전후가 권장 시기예요.',
          '아기가 목을 잘 가누고, 음식에 관심을 보이며, 혀 밀기 반사가 줄어들면 시작 신호예요.',
          '모유·분유와 함께 시작하며 처음엔 1티스푼(5ml)부터 조금씩 늘려가요.',
        ],
      },
      {
        title: '이유식 제공 횟수',
        icon: '🍽️',
        content: [
          '초기(6~7개월): 하루 1회, 오전 10시~11시 사이 권장',
          '중기(7~9개월): 하루 2회',
          '후기(9~12개월): 하루 3회 (아침·점심·저녁)',
          '완료기(12개월~): 하루 3회 + 간식 1~2회',
        ],
      },
      {
        title: '적정 1회 제공량',
        icon: '⚖️',
        content: [
          '초기: 30~80g (약 2~5테이블스푼)',
          '중기: 80~120g',
          '후기: 120~180g',
          '완료기: 180~250g (성인 밥 절반 정도)',
          '아기마다 먹는 양이 달라요. 아기의 신호에 맞춰 조절하세요.',
        ],
      },
    ],
  },
  {
    id: 'allergen',
    label: '알레르기 관리',
    emoji: '⚠️',
    color: '#e74c3c',
    bg: '#fef0ee',
    items: [
      {
        title: '주요 알레르기 식품',
        icon: '🚨',
        content: [
          '계란, 우유, 땅콩, 견과류, 밀, 생선, 갑각류, 대두가 8대 알레르기 식품이에요.',
          '처음 먹이는 식품은 3~5일간 단독으로 먹이며 반응을 관찰하세요.',
          '두드러기, 구토, 설사, 호흡 곤란 시 즉시 중단하고 의사에게 상담하세요.',
        ],
      },
      {
        title: '새 식재료 도입 방법',
        icon: '🆕',
        content: [
          '한 번에 하나의 새 식재료만 도입하세요.',
          '소량(1/4 티스푼)으로 시작해 반응 확인 후 서서히 늘려요.',
          '음식 일지를 기록하면 알레르기 원인 파악에 도움이 돼요.',
        ],
      },
    ],
  },
  {
    id: 'tips',
    label: '조리 & 보관 팁',
    emoji: '👨‍🍳',
    color: '#27ae60',
    bg: '#edf7f1',
    items: [
      {
        title: '이유식 조리 방법',
        icon: '🔥',
        content: [
          '재료는 충분히 익혀서 부드럽게 으깨어 주세요.',
          '처음엔 완전히 갈아서 제공하고, 단계가 올라갈수록 입자 크기를 키워요.',
          '소금, 설탕, 간장 등의 조미료는 돌 이전에는 사용하지 않아요.',
          '꿀은 12개월 이전 절대 금지 (보툴리누스균 위험).',
        ],
      },
      {
        title: '이유식 보관 방법',
        icon: '❄️',
        content: [
          '냉장 보관: 만든 당일 포함 24~48시간 이내 사용.',
          '냉동 보관: 소분하여 최대 1개월 이내 사용 (큐브 형태 추천).',
          '해동 시 전자레인지 또는 중탕으로 충분히 가열하세요.',
          '한번 해동한 이유식은 다시 냉동하지 마세요.',
        ],
      },
      {
        title: '먹이기 팁',
        icon: '🥄',
        content: [
          '먹기 거부해도 억지로 먹이지 마세요. 10~15번 노출이 필요할 수 있어요.',
          '다양한 색깔과 맛의 식품을 경험시켜 편식 예방.',
          '식사 시간은 20~30분 이내로 정해두세요.',
          '아기 주도 이유식(BLW)도 좋은 방법이에요.',
        ],
      },
    ],
  },
  {
    id: 'forbidden',
    label: '먹이면 안 되는 음식',
    emoji: '🚫',
    color: '#8e44ad',
    bg: '#f5eef8',
    items: [
      {
        title: '돌 이전 금지 식품',
        icon: '⛔',
        content: [
          '꿀 — 보툴리누스균 위험',
          '생우유 — 단백질 부담, 소화 어려움',
          '짠 음식 — 신장 부담',
          '달콤한 음료 — 충치, 식습관 문제',
          '날 계란 — 살모넬라균 위험',
          '등푸른 생선 (고등어 등) — 알레르기 주의',
        ],
      },
      {
        title: '크기와 질감 주의 식품',
        icon: '⚠️',
        content: [
          '포도, 방울토마토 — 반드시 4등분 이상으로 자를 것',
          '견과류 — 질식 위험, 잘게 갈아서 사용',
          '생 사과, 생 당근 — 딱딱해서 질식 위험, 익혀서 사용',
          '통 블루베리, 체리 — 반드시 으깨거나 자를 것',
        ],
      },
    ],
  },
]

export default function FeedingGuide() {
  const [activeSection, setActiveSection] = useState('basics')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const section = GUIDE_SECTIONS.find((s) => s.id === activeSection)!

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-bold" style={{ color: '#2d2d2d' }}>이유식 가이드</h2>
        <p className="text-sm mt-1" style={{ color: '#9b9b9b' }}>건강한 이유식을 위한 필수 정보</p>
      </div>

      {/* Section tabs */}
      <div className="grid grid-cols-2 gap-2">
        {GUIDE_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActiveSection(s.id); setExpandedItem(null) }}
            className="flex items-center gap-2 px-3 py-3 rounded-xl transition-all text-left"
            style={
              activeSection === s.id
                ? { backgroundColor: s.bg, border: `2px solid ${s.color}` }
                : { backgroundColor: '#f7f4f0', border: '2px solid transparent' }
            }
          >
            <span className="text-lg">{s.emoji}</span>
            <span
              className="text-sm font-semibold"
              style={{ color: activeSection === s.id ? s.color : '#666666' }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #f0ebe5' }}
          >
            <button
              className="w-full px-4 py-4 flex items-center justify-between"
              style={{ backgroundColor: '#ffffff' }}
              onClick={() =>
                setExpandedItem(expandedItem === item.title ? null : item.title)
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-semibold text-sm" style={{ color: '#2d2d2d' }}>{item.title}</span>
              </div>
              <span style={{ color: '#c0b8b0', fontSize: '20px', lineHeight: 1 }}>
                {expandedItem === item.title ? '−' : '+'}
              </span>
            </button>
            {expandedItem === item.title && (
              <div className="px-4 pb-4" style={{ backgroundColor: '#ffffff' }}>
                <div className="rounded-xl p-4 flex flex-col gap-2" style={{ backgroundColor: section.bg }}>
                  {item.content.map((line, i) => (
                    <div key={i} className="flex gap-2 text-sm leading-relaxed">
                      <span style={{ color: section.color, flexShrink: 0 }}>•</span>
                      <span style={{ color: '#444444' }}>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
