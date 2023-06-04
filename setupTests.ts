import { vi } from 'vitest'
import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

vi.mock('@/utils/i18n', () => {
  function $t(key: string) {
    return key
  }
  return { $t }
})

expect.extend(matchers)
