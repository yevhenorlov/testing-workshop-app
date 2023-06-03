import { vi } from 'vitest'
import * as i18n from './src/i18n'

vi.mock('./src/i18n', () => {
  const $t = (key: string) => key
  return { $t }
})
