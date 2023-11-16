<script setup></script>

<template>
  <div class="tw_flex tw_items-center tw_justify-between tw_p-2">
    <div>
      <router-link
        class="tw_rounded tw_bg-gradient-to-br tw_from-primary tw_from-10% tw_to-secondary tw_px-3 tw_py-2 tw_font-bold"
        :to="{ name: 'HomeView' }"
      >
        <img
          src="@/assets/logo.svg"
          class="tw_mr-1 tw_mt-[-3px] tw_inline-block tw_h-[18px] tw_text-white"
        />
        {{ $q.screen.width > 400 ? 'GuessTheMovie' : 'GTM' }}
      </router-link>
    </div>
    <div class="tw_flex tw_gap-2">
      <q-btn round flat dense icon="calendar_month" :to="{ name: 'HomeView' }" />
      <!-- <q-btn round flat dense icon="bar_chart" :to="{ name: 'ScoresView' }" /> -->
      <q-btn round flat dense icon="info_outline" :to="{ name: 'InfoView' }" />
      <!-- <q-btn
        round
        flat
        dense
        icon="help_outline"
        :to="{ name: 'HelpView' }"
      /> -->
    </div>
  </div>
</template>

<style scoped lang="postcss">
:deep(.q-btn .q-icon) {
  @apply !tw_text-2xl;
}
</style>
