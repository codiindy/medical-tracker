import { defineStore } from 'pinia'
import { ref, onMounted, watch, type Ref } from 'vue'
import type { Patient, Measure } from '../types'
import { fetchPatients, fetchMeasures, createMeasure } from '../services/api'

// stockage local key
const LS_KEY = 'medical-app'

// Force id to string 
const toKey = (v: string | number) => String(v)

// Local storage
function loadFromLocalStorage(patients: Ref<{ id: number; name: string }[], Patient[] | { id: number; name: string }[]>, measuresById: Ref<Record<string, Measure[]>, Record<string, Measure[]>>, error: Ref<string | null, string | null>) {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (parsed.patients) patients.value = parsed.patients
    if (parsed.measuresById) measuresById.value = parsed.measuresById
  } catch {
    error.value = 'Failed to load local data'
  }
}

function saveToLocalStorage(patients: Ref<{ id: number; name: string }[], Patient[] | { id: number; name: string }[]>, measuresById: Ref<Record<string, Measure[]>, Record<string, Measure[]>>, error: Ref<string | null, string | null>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      patients: patients.value,
      measuresById: measuresById.value
    }))
  } catch {
    error.value = 'Failed to save local data'
  }
}



// Store
export const usePatients = defineStore('patients', () => {
  const patients = ref<Patient[]>([])
  const measuresById = ref<Record<string, Measure[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  loadFromLocalStorage(patients, measuresById, error)

  async function loadPatients() {
    loading.value = true
    error.value = null
    try {
      patients.value = await fetchPatients()
    } catch (err: any) {
      error.value = err?.message ?? 'Error load patients'
    } finally {
      loading.value = false
    }
  }

  async function loadMeasures(id: number | string) {
    loading.value = true
    error.value = null
    try {
      const key = toKey(id)
      measuresById.value[key] = await fetchMeasures(Number(id))
    } catch (err: any) {
      error.value = err?.message ?? 'Error load measures'
    } finally {
      loading.value = false
    }
  }

  async function addMeasure(id: number | string, measure: any) {
    await createMeasure(Number(id), measure)
  }

  function findPatient(id: number | string) {
    const key = toKey(id)
    return patients.value.find(p => toKey((p as any).id) === key) ?? null
  }


  onMounted(() => {
    loadFromLocalStorage(patients, measuresById, error)
  })

  watch([patients, measuresById], () => {
    saveToLocalStorage(patients, measuresById, error)
  }, { deep: true })

  return {
    patients,
    measuresById,
    loading,
    error,
    loadPatients,
    loadMeasures,
    addMeasure,
    findPatient,
  }
})
