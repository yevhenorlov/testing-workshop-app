// For simplicity's sake translations are available as a static object.
// In a real life app they would arrive over network and potentially be
// changed upstream at any moment, therefore we need to mock them for
// testing purposes (see setupTests.ts file)

const TRANSLATIONS = {
  'main.title': 'Boarding in progress',
  'main.description':
    'Millenium Falcon has limited carrying capacity and low ceilings. Make sure the ship can carry everyone before take off.',
  'general.loading': 'Loading data...',
  'general.yes': 'Yes',
  'general.no': 'No',
  'preflightCheck.totalMass.label': 'Total mass',
  'preflightCheck.maxHeight.label': 'Tallest person height',
  'preflightCheck.massWithinLimit.label': 'Mass within limit',
  'preflightCheck.heightWithinLimit.label': 'Height within limit',
  'preflightCheck.launch': 'LAUNCH!'
} as const

export function $t(key: keyof typeof TRANSLATIONS) {
  return TRANSLATIONS[key]
}
