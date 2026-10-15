export const TOOL_LINKS = {
  notebookLM:
    process.env.NEXT_PUBLIC_NOTEBOOKLM_URL ??
    "NEXT_PUBLIC_NOTEBOOKLM_URL",

  growthCoachGem:
    process.env.NEXT_PUBLIC_GROWTH_COACH_GEM_URL ??
    "NEXT_PUBLIC_GROWTH_COACH_GEM_URL",

  improveForm:
    process.env.NEXT_PUBLIC_IMPROVE_FORM_URL ??
    'NEXT_PUBLIC_IMPROVE_FORM_URL',

  resultsSheet:
    process.env.NEXT_PUBLIC_RESULTS_SHEET_URL ??
    'NEXT_PUBLIC_RESULTS_SHEET_URL',

  makeScenario:
    process.env.NEXT_PUBLIC_MAKE_SCENARIO_URL ??
    "NEXT_PUBLIC_MAKE_SCENARIO_URL",

  canva:
    process.env.NEXT_PUBLIC_CANVA_URL ??
    "NEXT_PUBLIC_CANVA_URL",

  practicalGuide:
    process.env.NEXT_PUBLIC_PRACTICAL_GUIDE_URL ??
    "NEXT_PUBLIC_PRACTICAL_GUIDE_URL",
} as const;