import type { Patient, Measure } from '../types'

const API = import.meta.env.VITE_API_URL as string
if (!API) {
  throw new Error("VITE_API_URL not found")
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`API ${res.status} ${res.statusText} — ${path} ${text ? `— ${text}` : ""}`)
  }
  if (res.status === 204) return undefined as unknown as T
  return (await res.json())
}


// Endpoints

// GET /patients
export async function fetchPatients(): Promise<Patient[]> {
  return request<Patient[]>("/patients")
}

// GET /measures?patientId=1
export async function fetchMeasures(patientId: number): Promise<Measure[]> {
  const query = new URLSearchParams({ patientId: String(patientId) }).toString()
  return request<Measure[]>(`/measures?${query}`)
}

// POST /measures
export type NewMeasure = Omit<Measure, "date">

export async function createMeasure(
  patientId: number,
  measure: NewMeasure
): Promise<Measure> {
  const payload = {
    patientId,
    date: new Date().toISOString(),
    sys: measure.sys,
    dia: measure.dia,
    bpm: measure.bpm,
  }

  return request<Measure>("/measures", {
    method: "POST",
    body: JSON.stringify(payload)
  })
}
