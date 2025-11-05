<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-9999 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="labelId"
      @keydown.esc.prevent.stop="close"
    >
      <div class="absolute inset-0 bg-black/50" @click="close"></div>

      <div
        ref="panel"
        class="relative z-10 w-[92vw] max-w-md rounded-xl bg-white p-5 shadow-2xl"
        @click.stop
        tabindex="-1"
      >
        <header class="mb-4 flex items-start justify-between gap-4">
          <h2 :id="labelId" class="text-lg font-semibold">{{ title }}</h2>
          <button
            type="button"
            class="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Fermer"
            @click="close"
          >✕</button>
        </header>

        <div class="space-y-3">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="mt-5 flex items-center justify-end gap-2">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ modelValue: boolean; title: string; id?: string }>()
const emit  = defineEmits<{ (e:'update:modelValue', v:boolean):void; (e:'close'):void }>()
const panel = ref<HTMLElement|null>(null)
const labelId = computed(() => (props.id ? `${props.id}-title` : 'modal-title'))

function close() {
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (open) => {
  if (open) document.body.classList.add('overflow-hidden')
  else document.body.classList.remove('overflow-hidden')
})

onMounted(() => {
  if (props.modelValue && panel.value) panel.value.focus()
})
onBeforeUnmount(() => document.body.classList.remove('overflow-hidden'))
</script>
