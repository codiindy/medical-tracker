<template>
  <header class="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="mx-auto max-w-6xl px-6 h-16 flex items-center gap-3">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-xl bg-indigo-600 grid place-items-center">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h4l2 6 4-16 2 10h6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span class="font-semibold text-slate-900">Medical Tracker</span>
      </RouterLink>

      <div class="ml-auto">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

