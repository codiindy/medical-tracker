<template>
  <BaseModal
    v-model="isOpen"
    title="Add Measurement"
  >
    <template #default>
      <form class="grid gap-4" @submit.prevent="onSave">
        <div>
          <label for="sys" class="mb-1 block text-sm font-medium text-slate-700">
            Systolic (mmHg)
          </label>
          <input
            id="sys"
            v-model.number="form.sys"
            type="number"
            inputmode="numeric"
            min="60"
            max="260"
            required
            class="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="errors.sys" class="mt-1 text-xs text-red-600">{{ errors.sys }}</p>
        </div>

        <div>
          <label for="dia" class="mb-1 block text-sm font-medium text-slate-700">
            Diastolic (mmHg)
          </label>
          <input
            id="dia"
            v-model.number="form.dia"
            type="number"
            inputmode="numeric"
            min="40"
            max="160"
            required
            class="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="errors.dia" class="mt-1 text-xs text-red-600">{{ errors.dia }}</p>
        </div>

        <div>
          <label for="bpm" class="mb-1 block text-sm font-medium text-slate-700">
            Heart Rate (BPM)
          </label>
          <input
            id="bpm"
            v-model.number="form.bpm"
            type="number"
            inputmode="numeric"
            min="20"
            max="220"
            required
            class="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="errors.bpm" class="mt-1 text-xs text-red-600">{{ errors.bpm }}</p>
        </div>

        <p v-if="errors.form" class="text-sm text-red-600">{{ errors.form }}</p>
      </form>
    </template>

    <!-- Footer -->
    <template #footer>
      <button type="button" class="rounded-md border px-4 py-2" @click="close">
        Cancel
      </button>
      <button
        type="button"
        class="ml-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        :disabled="!isValid"
        @click="onSave"
      >
        Save
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onBeforeUnmount } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  modelValue: boolean
  defaultSys?: number
  defaultDia?: number
  defaultBpm?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'save', payload: { sys: number; dia: number; bpm: number }): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const form = reactive({
  sys: props.defaultSys ?? undefined as number | undefined,
  dia: props.defaultDia ?? undefined as number | undefined,
  bpm: props.defaultBpm ?? undefined as number | undefined,
})

const errors = reactive<{ sys?: string; dia?: string; bpm?: string; form?: string }>({})

function validate() {
  errors.sys = undefined
  errors.dia = undefined
  errors.bpm = undefined
  errors.form = undefined

  if (form.sys == null || form.sys < 60 || form.sys > 260) errors.sys = 'Enter a value between 60 and 260'
  if (form.dia == null || form.dia < 40 || form.dia > 160) errors.dia = 'Enter a value between 40 and 160'
  if (form.bpm == null || form.bpm < 20 || form.bpm > 220) errors.bpm = 'Enter a value between 20 and 220'

  if (errors.sys || errors.dia || errors.bpm) errors.form = 'Please fix the fields above'
}

const isValid = computed(() => {
  validate()
  return !errors.sys && !errors.dia && !errors.bpm
})

function reset() {
  form.sys = form.dia = form.bpm = undefined
  errors.sys = errors.dia = errors.bpm = errors.form = undefined
}

function close() {
  isOpen.value = false
}

function onSave() {
  validate()
  if (!isValid.value) return
  emit('save', { sys: form.sys!, dia: form.dia!, bpm: form.bpm! })
  close()
  reset()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}

watch(
  () => isOpen.value,
  (open) => {
    if (open) {
      window.addEventListener('keydown', onKeydown)
      reset()
      if (props.defaultSys != null) form.sys = props.defaultSys
      if (props.defaultDia != null) form.dia = props.defaultDia
      if (props.defaultBpm != null) form.bpm = props.defaultBpm
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>
