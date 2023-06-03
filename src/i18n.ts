// For simplicity's sake translations are available as a static object.
// In a real life app they would arrive over network and potentially be
// changed upstream at any moment, therefore we need to mock them for
// testing purposes (see: setupTests.ts file)
const TRANSLATIONS = {
  'main.title': 'Boarding in progress',
  'main.description': `Millenium Falcon has limited carrying capacity and low ceilings.
    Make sure the ship can carry everyone before take off.`,
  'general.yes': 'Yes',
  'general.no': 'No',
  'general.loading': 'Loading data...'
} as const

export const $t = (key: keyof typeof TRANSLATIONS) => {
  return TRANSLATIONS[key]
}
