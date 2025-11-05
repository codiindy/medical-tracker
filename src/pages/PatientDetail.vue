<template>
  <main class="mx-auto max-w-6xl px-6 py-6">
    <div class="mb-6 border-b border-slate-200 pb-5">
      <div v-if="patient" class="flex items-center justify-between">
        <div class="flex items-center gap-4 min-w-0">
          <button class="mr-1 rounded-md p-2 hover:bg-slate-100" @click="router.back()" aria-label="Back">
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="h-12 w-12 rounded-full bg-indigo-50 text-indigo-700 grid place-items-center text-sm font-semibold">
            {{ initials }}
          </div>

          <div class="min-w-0">
            <p class="truncate text-lg font-semibold text-slate-900">{{ patientName }}</p>
            <p class="text-sm text-slate-500">
              {{ totalMeasures }} measurement<span v-if="totalMeasures !== 1">s</span>
            </p>
          </div>
        </div>

        <button
          class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
          @click="openModal"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Add Measurement
        </button>
      </div>

      <div v-else class="flex items-center gap-4">
        <div class="h-9 w-9 rounded-md bg-slate-100 animate-pulse"></div>
        <div class="h-5 w-48 rounded bg-slate-100 animate-pulse"></div>
      </div>
    </div>

    <!-- States -->
    <p v-if="loading" class="text-sm text-slate-500">Chargement…</p>
    <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>

    <!-- Recent Measurements -->
    <div v-else>
      <h2 class="mb-3 text-sm font-medium text-slate-700">Recent Measurements</h2>

      <div v-if="!recentCards.length" class="rounded-xl bg-white p-6 ring-1 ring-slate-200">
        <p class="text-sm text-slate-500">No measurements recorded yet.</p>
      </div>

      <ul v-else class="space-y-4">
        <li v-for="m in recentCards" :key="m.key" class="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
          <!-- Date + statut -->
          <div class="mb-3 flex items-start justify-between">
            <div>
              <p class="text-slate-900">{{ m.date }}</p>
              <p class="text-sm text-slate-500">{{ m.time }}</p>
            </div>
            <span class="text-sm font-medium" :class="m.status === 'High' ? 'text-orange-600' : 'text-emerald-600'">
              {{ m.status }}
            </span>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="flex items-start gap-3">
              <div class="h-9 w-9 rounded-xl bg-indigo-50 grid place-items-center">
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 12h4l2 6 4-16 2 10h4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500">Blood Pressure</p>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-semibold text-slate-900">{{ m.sys }}</span>
                  <span class="text-2xl text-slate-400">/</span>
                  <span class="text-2xl font-semibold text-slate-900">{{ m.dia }}</span>
                  <span class="text-sm text-slate-500">mmHg</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">SYS / DIA</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="h-9 w-9 rounded-xl bg-rose-50 grid place-items-center">
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-rose-500" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.8 8.6a5.5 5.5 0 0 0-9.6-3.9L11 5.9l-.2-.2A5.5 5.5 0 1 0 2 13.4l.2.2L11 22l8.8-8.4.2-.2a5.5 5.5 0 0 0 .8-4.8z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500">Heart Rate</p>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-semibold text-slate-900">{{ m.bpm }}</span>
                  <span class="text-sm text-slate-500">BPM</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">Beats per minute</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <RouterLink to="/" class="text-slate-600 hover:underline">← Back</RouterLink>
    </div>
  </main>

  <AddMeasurementModal v-model="modalOpen" @save="handleSave" />
</template>

<script setup lang="ts">
import AddMeasurementModal from '../components/AddMeasurementModal.vue'
import { useInitials } from '../composables/useInitials'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePatients } from '../stores/patients'
import { storeToRefs } from 'pinia'


const router = useRouter()

const store = usePatients()
const { loading, error, measuresById } = storeToRefs(store)
const props = defineProps<{ id: string }>()

const id = computed(() => props.id) 
const patient = computed(() => store.findPatient(id.value))
const measures = computed(() => (measuresById.value?.[id.value] ?? []))
const patientName = computed(() => patient.value?.name ?? `Patient #${id.value}`)
const initials = useInitials(() => patient.value?.name)
const totalMeasures = computed(() => measures.value.length)

const recentCards = computed(() => {
  const fmtDate = (iso: string | number | Date) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .format(new Date(iso))
  const fmtTime = (iso: string | number | Date) =>
    new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' })
      .format(new Date(iso))
  const status = (sys: number, dia: number) => (sys >= 130 || dia >= 85 ? 'High' : 'Normal')

  return [...measures.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(m => ({
      key: (m as any).id || m.date,
      date: fmtDate(m.date),
      time: fmtTime(m.date),
      sys: m.sys, dia: m.dia, bpm: m.bpm,
      status: status(m.sys, m.dia),
    }))
})

onMounted(async () => {
  await store.loadPatients()
  await store.loadMeasures(id.value)
})

watch(id, async (pid) => {
  await store.loadMeasures(pid)
})

const modalOpen = ref(false)
function openModal() { modalOpen.value = true }

async function handleSave(payload: { sys: number; dia: number; bpm: number }) {
  await store.addMeasure(id.value, payload)
  await store.loadMeasures(id.value)
}
</script>

