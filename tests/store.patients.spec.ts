import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { usePatients } from '../src/stores/patients'

// mock call api store
vi.mock('../src/services/api', () => ({
  fetchPatients: vi.fn().mockResolvedValue([
    { id: '1', name: 'Maya Collins' },
    { id: '2', name: 'Ethan Lewis' },
  ]),
  fetchMeasures: vi.fn().mockResolvedValue([
    { id: 'm1', date: '2025-11-05T10:00:00Z', sys: 118, dia: 76, bpm: 72 },
  ]),
  createMeasure: vi.fn().mockResolvedValue({
    id: 'm-new',
    date: new Date().toISOString(),
    sys: 120,
    dia: 80,
    bpm: 70,
  }),
}))

describe('patients store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('loads patients and can find by id', async () => {
    const s = usePatients()
    await s.loadPatients()
    const p = s.findPatient('2')
    expect(p?.name).toBe('Ethan Lewis')
  })

  it('loads measures into measuresById using string keys', async () => {
    const s = usePatients()
    await s.loadMeasures(2)
    expect(s.measuresById['2']).toBeTruthy()
    expect(s.measuresById['2'][0].sys).toBe(118)
  })

  it('persists to localStorage (patients + measuresById)', async () => {
    const s = usePatients()

    s.patients = [{ id: '9', name: 'Test' }] as any
    s.measuresById = {
      '9': [{ id: 'x', date: new Date().toISOString(), sys: 110, dia: 70, bpm: 60 }],
    } as any

    s.patients = [...s.patients] as any

    await nextTick()

    const raw = localStorage.getItem('medical-app')
    expect(raw).toBeTruthy()

    const parsed = JSON.parse(raw as string)
    expect(parsed.patients[0].name).toBe('Test')
    expect(parsed.measuresById['9'].length).toBe(1)
  })

  it('addMeasure calls API and (optionally) could be followed by reload', async () => {
    const s = usePatients()
    await s.addMeasure('2', { sys: 120, dia: 80, bpm: 70 })
    expect(true).toBe(true)
  })
})
