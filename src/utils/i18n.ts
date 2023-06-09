// For simplicity's sake translations are available as a static object.
// In a real life app they would arrive over network and potentially be
// changed upstream at any moment, therefore we need to mock them for
// testing purposes (see setupTests.ts file)

const TRANSLATIONS = {
  'main.title': 'Boarding in progress',
  'main.description':
    'The Millenium Falcon has limited carrying capacity and low ceilings. Make sure the ship can carry everyone before taking off.',
  'general.loading': 'Loading data...',
  'general.yes': 'Yes',
  'general.no': 'No',
  'preflightCheck.totalMass': 'Total mass',
  'preflightCheck.maxHeight': 'Tallest person height',
  'preflightCheck.massWithinLimit': 'Mass within limit',
  'preflightCheck.heightWithinLimit': 'Height within limit',
  'preflightCheck.launch': 'LAUNCH!',
  'passengerList.passenger': 'Passenger',
  'passengerList.height': 'Height (cm)',
  'passengerList.mass': 'Mass (kg)',
  'addPassenger.title': 'Add a passenger',
  'addPassenger.name': 'Name',
  'addPassenger.height': 'Height',
  'addPassenger.mass': 'Mass'
} as const

export function $t(key: keyof typeof TRANSLATIONS) {
  return TRANSLATIONS[key]
}
