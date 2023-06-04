import { render } from '@testing-library/vue'
import App from '@/App.vue'

describe('App', () => {
  it('renders as expected', () => {
    const { getByText } = render(App)
    const title = getByText('main.title')
    const description = getByText('main.description')
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
