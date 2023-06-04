import { vi } from 'vitest'
import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

vi.mock('./src/i18n', () => {
  const $t = (key: string) => key
  return { $t }
})

expect.extend(matchers)
