import { useState } from 'react'

interface Cube {
  id: string
  name: string
  icon: string
  category: string
  amount: number
  unit: string
  madeDate: string
  expiryDate: string
  memo: string
  count: number
}

type Category = '전체' | '쌀·잡곡' | '고기' | '채소' | '과일' | '혼합'

const CATEGORIES: Category[] = ['전체', '쌀·잡곡', '고기', '채소', '과일', '혼합']

const CATEGORY_ICONS: Record<string, string> = {
  '쌀·잡곡': '🌾',
  '고기': '🥩',
  '채소': '🥦',
  '과일': '🍎',
  '혼합': '🍱',
}

const INITIAL_CUBES: Cube[] = [
  {
    id: '1',
    name: '소고기 큐브',
    icon: '🥩',
    category: '고기',
    amount: 15,
    unit: 'g',
    madeDate: '2026-07-30',
    expiryDate: '2026-08-30',
    memo: '안심 부위, 잘 다진 것',
    count: 12,
  },
  {
    id: '2',
    name: '애호박 큐브',
    icon: '🥬',
    category: '채소',
    amount: 20,
    unit: 'g',
    madeDate: '2026-08-01',
    expiryDate: '2026-09-01',
    memo: '껍질 제거 후 쪄서 으깬 것',
    count: 8,
  },
  {
    id: '3',
    name: '당근 큐브',
    icon: '🥕',
    category: '채소',
    amount: 20,
    unit: 'g',
    madeDate: '2026-08-01',
    expiryDate: '2026-09-01',
    memo: '',
    count: 10,
  },
  {
    id: '4',
    name: '오트밀 쌀죽',
    icon: '🌾',
    category: '쌀·잡곡',
    amount: 60,
    unit: 'g',
    madeDate: '2026-08-03',
    expiryDate: '2026-09-03',
    memo: '5배죽으로 준비',
    count: 5,
  },
]

const EMPTY_CUBE: Omit<Cube, 'id'> = {
  name: '',
  icon: '🍱',
  category: '혼합',
  amount: 20,
  unit: 'g',
  madeDate: new Date().toISOString().split('T')[0],
  expiryDate: '',
  memo: '',
  count: 10,
}

function getDaysLeft(expiryDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function ExpiryBadge({ days }: { days: number }) {
  if (days < 0)
    return (
      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#fef0ee', color: '#e74c3c' }}>
        만료됨
      </span>
    )
  if (days <= 7)
    return (
      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#fff3cd', color: '#d68910' }}>
        D-{days}
      </span>
    )
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#edf7f1', color: '#27ae60' }}>
      D-{days}
    </span>
  )
}

export default function CubeManager() {
  const [cubes, setCubes] = useState<Cube[]>(INITIAL_CUBES)
  const [filter, setFilter] = useState<Category>('전체')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<Cube, 'id'>>(EMPTY_CUBE)
  const [editId, setEditId] = useState<string | null>(null)

  const filtered = filter === '전체' ? cubes : cubes.filter((c) => c.category === filter)

  function handleSave() {
    if (!form.name.trim()) return
    if (editId) {
      setCubes((prev) => prev.map((c) => (c.id === editId ? { ...form, id: editId } : c)))
      setEditId(null)
    } else {
      setCubes((prev) => [...prev, { ...form, id: Date.now().toString() }])
    }
    setForm(EMPTY_CUBE)
    setShowForm(false)
  }

  function handleEdit(cube: Cube) {
    setForm({ ...cube })
    setEditId(cube.id)
    setShowForm(true)
  }

  function handleDelete(id: string) {
    setCubes((prev) => prev.filter((c) => c.id !== id))
  }

  function adjustCount(id: string, delta: number) {
    setCubes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, count: Math.max(0, c.count + delta) } : c))
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-bold" style={{ color: '#2d2d2d' }}>이유식 큐브 관리</h2>
        <p className="text-sm mt-1" style={{ color: '#9b9b9b' }}>냉동 큐브 재고와 유통기한을 관리해요</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-3 text-center" style={{ backgroundColor: '#fff8f5', border: '1px solid #ffe8de' }}>
          <p className="text-2xl font-bold" style={{ color: '#ff8c69' }}>{cubes.length}</p>
          <p className="text-xs mt-0.5" style={{ color: '#9b9b9b' }}>종류</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ backgroundColor: '#edf7f1', border: '1px solid #c3e6cb' }}>
          <p className="text-2xl font-bold" style={{ color: '#27ae60' }}>
            {cubes.reduce((s, c) => s + c.count, 0)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#9b9b9b' }}>총 큐브</p>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffd97d' }}>
          <p className="text-2xl font-bold" style={{ color: '#d68910' }}>
            {cubes.filter((c) => getDaysLeft(c.expiryDate) <= 7 && getDaysLeft(c.expiryDate) >= 0).length}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#9b9b9b' }}>유통기한 임박</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={
              filter === cat
                ? { backgroundColor: '#ff8c69', color: '#ffffff' }
                : { backgroundColor: '#f7f4f0', color: '#666666' }
            }
          >
            {CATEGORY_ICONS[cat] ? `${CATEGORY_ICONS[cat]} ` : ''}{cat}
          </button>
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={() => { setForm(EMPTY_CUBE); setEditId(null); setShowForm(true) }}
        className="w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
        style={{ backgroundColor: '#fff8f5', border: '2px dashed #ffb89a', color: '#ff8c69' }}
      >
        <span className="text-lg">+</span>
        새 큐브 추가
      </button>

      {/* Add/Edit form */}
      {showForm && (
        <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: '#ffffff', border: '1px solid #f0ebe5' }}>
          <p className="font-bold" style={{ color: '#2d2d2d' }}>{editId ? '큐브 수정' : '새 큐브 추가'}</p>

          <input
            placeholder="큐브 이름 (예: 소고기 큐브)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ backgroundColor: '#f7f4f0', border: '2px solid transparent', color: '#2d2d2d' }}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#9b9b9b' }}>카테고리</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: '#f7f4f0', color: '#2d2d2d', border: '2px solid transparent' }}
              >
                {CATEGORIES.filter((c) => c !== '전체').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#9b9b9b' }}>1큐브 용량 (g)</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: '#f7f4f0', color: '#2d2d2d', border: '2px solid transparent' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#9b9b9b' }}>제조일</label>
              <input
                type="date"
                value={form.madeDate}
                onChange={(e) => setForm({ ...form, madeDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: '#f7f4f0', color: '#2d2d2d', border: '2px solid transparent' }}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#9b9b9b' }}>유통기한 (냉동)</label>
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: '#f7f4f0', color: '#2d2d2d', border: '2px solid transparent' }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: '#9b9b9b' }}>초기 개수</label>
            <input
              type="number"
              value={form.count}
              onChange={(e) => setForm({ ...form, count: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: '#f7f4f0', color: '#2d2d2d', border: '2px solid transparent' }}
            />
          </div>

          <textarea
            placeholder="메모 (선택)"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={{ backgroundColor: '#f7f4f0', color: '#2d2d2d', border: '2px solid transparent' }}
          />

          <div className="flex gap-3">
            <button
              onClick={() => { setShowForm(false); setEditId(null) }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: '#f7f4f0', color: '#9b9b9b' }}
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: '#ff8c69', color: '#ffffff' }}
            >
              저장
            </button>
          </div>
        </div>
      )}

      {/* Cube list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl p-8 flex flex-col items-center gap-2" style={{ backgroundColor: '#f7f4f0' }}>
            <span className="text-4xl">🧊</span>
            <p className="text-sm text-center" style={{ color: '#b0a89e' }}>아직 등록된 큐브가 없어요</p>
          </div>
        )}
        {filtered.map((cube) => {
          const days = getDaysLeft(cube.expiryDate)
          return (
            <div
              key={cube.id}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: '#ffffff',
                border: days < 0 ? '1px solid #f5c6c6' : '1px solid #f0ebe5',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cube.icon}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#2d2d2d' }}>{cube.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#f7f4f0', color: '#888888' }}>
                        {CATEGORY_ICONS[cube.category]} {cube.category}
                      </span>
                      <span className="text-xs" style={{ color: '#b0a89e' }}>{cube.amount}{cube.unit}/개</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cube)}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ backgroundColor: '#f7f4f0', color: '#888888' }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(cube.id)}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ backgroundColor: '#fef0ee', color: '#e74c3c' }}
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: '#9b9b9b' }}>유통기한</span>
                    {cube.expiryDate && <ExpiryBadge days={days} />}
                  </div>
                  {cube.expiryDate && (
                    <p className="text-xs mt-0.5" style={{ color: '#b0a89e' }}>{cube.expiryDate}</p>
                  )}
                  {cube.memo && (
                    <p className="text-xs mt-1" style={{ color: '#9b9b9b' }}>📝 {cube.memo}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => adjustCount(cube.id, -1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all"
                    style={{ backgroundColor: '#f0ebe5', color: '#666666', fontSize: '18px', lineHeight: 1 }}
                  >
                    −
                  </button>
                  <div className="text-center min-w-[40px]">
                    <p className="text-xl font-bold" style={{ color: cube.count === 0 ? '#e74c3c' : '#2d2d2d' }}>
                      {cube.count}
                    </p>
                    <p className="text-xs" style={{ color: '#9b9b9b' }}>개</p>
                  </div>
                  <button
                    onClick={() => adjustCount(cube.id, 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all"
                    style={{ backgroundColor: '#fff8f5', color: '#ff8c69', fontSize: '18px', lineHeight: 1 }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
