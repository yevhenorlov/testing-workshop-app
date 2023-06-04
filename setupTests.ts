import { vi } from 'vitest'
import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

import { mockFetchPassengers } from './src/utils/mocks'

vi.mock('@/utils/i18n', () => {
  return {
    $t: (key: string) => key
  }
})

vi.mock('@/api', () => {
  return {
    fetchPassengers: mockFetchPassengers
  }
})

expect.extend(matchers)
