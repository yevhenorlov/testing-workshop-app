import { render, screen, fireEvent } from '@testing-library/vue'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import App from '@/App.vue'

const { getByText, findByText, findAllByRole, queryByTitle, findByTestId, findByPlaceholderText } =
  screen
const findByPartialText = (text: any) => findByText(text, { exact: false })

describe('App', () => {
  // let's go
})
