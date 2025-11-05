<template>
  <div class="min-h-screen bg-slate-50">
    <main class="mx-auto max-w-6xl px-6 py-8">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold text-slate-900">Patients</h1>
        <div class="flex items-center gap-3">
          <p class="text-sm text-slate-500">{{ totalPatients }} patients</p>
          <button
            class="rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 active:scale-[.99] transition"
            @click="reload"
          >
            Reload
          </button>
        </div>
      </div>

      <!-- States -->
      <p v-if="store.loading" class="text-sm text-slate-500">Chargement…</p>
      <p v-else-if="store.error" class="text-sm text-red-600">{{ store.error }}</p>

      <!-- List -->
      <div v-else class="grid gap-5 md:grid-cols-2">
        <RouterLink
          v-for="patient in patientCards"
          :key="patient.id"
          :to="{ name: 'PatientDetail', params: { id: patient.id } }"
          class="group flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:shadow-md transition"
        >
          <div class="flex items-center gap-4 min-w-0">
            <div class="h-12 w-12 rounded-full bg-indigo-50 text-indigo-700 grid place-items-center text-sm font-semibold">
              {{ patient.initials }}
            </div>
            <div class="min-w-0">
              <p class="truncate text-slate-900 font-medium">{{ patient.name }}</p>
              <p class="text-sm text-slate-500">
                {{ patient.count }} measurement<span v-if="patient.count !== 1">s</span>
              </p>
            </div>
          </div>
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-slate-400 group-hover:text-slate-500 transition" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePatients } from '../stores/patients';
import { initialsFrom } from '../utils/initials';

const store = usePatients();

// Computed
const patients = computed(() => store.patients);
const totalPatients = computed(() => patients.value.length);

const measureCountById = computed<Record<number, number>>(() => {
  const out: Record<number, number> = {};
  for (const [id, list] of Object.entries(store.measuresById)) {
    out[Number(id)] = list?.length ?? 0;
  }
  return out;
});

const patientCards = computed(() =>
  patients.value.map(p => {
    const count = measureCountById.value[p.id] ?? 0;
    return { id: p.id, name: p.name, initials: initialsFrom(p.name), count };
  })
);


async function reload() {
  await store.loadPatients();
  await Promise.all(store.patients.map(p => store.loadMeasures(p.id)));
}

onMounted(async () => {
  if (!store.patients.length) {
    await store.loadPatients();
  }
  await Promise.all(store.patients.map(p => store.loadMeasures(p.id)));
});
</script>
