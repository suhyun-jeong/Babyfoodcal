import { useState } from 'react'
import BabyPorridgeCalculator from './components/BabyPorridgeCalculator'
import IngredientGuide from './components/IngredientGuide'
import FeedingGuide from './components/FeedingGuide'
import CubeManager from './components/CubeManager'

type Tab = 'calculator' | 'ingredients' | 'guide' | 'cubes'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'calculator', label: '배죽 계산기', icon: '🍚' },
  { id: 'ingredients', label: '추천 식재료', icon: '🥕' },
  { id: 'guide', label: '이유식 가이드', icon: '📖' },
  { id: 'cubes', label: '큐브 관리', icon: '🧊' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator')

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fef9f4', fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-10 shadow-sm" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0ebe5' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <span className="text-2xl">🍼</span>
          <h1 className="font-bold text-lg" style={{ color: '#2d2d2d' }}>맘마 계산기</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-28">
        {activeTab === 'calculator' && <BabyPorridgeCalculator />}
        {activeTab === 'ingredients' && <IngredientGuide />}
        {activeTab === 'guide' && <FeedingGuide />}
        {activeTab === 'cubes' && <CubeManager />}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 shadow-lg" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #f0ebe5' }}>
        <div className="max-w-2xl mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
              style={{ color: activeTab === tab.id ? '#ff8c69' : '#9b9b9b' }}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 h-0.5 w-12 rounded-t-full" style={{ backgroundColor: '#ff8c69' }} />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
