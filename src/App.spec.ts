import { render, screen } from '@testing-library/vue'
import App from '@/App.vue'

const { getByText, findByText } = screen
const findByPartialText = (text: any) => findByText(text, { exact: false })

describe('App', () => {
  it('renders as expected', async () => {
    render(App)

    const title = getByText('main.title')
    const description = getByText('main.description')
    const preflightCheckMass = await findByPartialText('preflightCheck.totalMass.label')
    const preflightCheckTallest = await findByPartialText('preflightCheck.maxHeight.label')
    const massLimitCheck = await findByPartialText('preflightCheck.massWithinLimit.label')
    const heightLimitCheck = await findByPartialText('preflightCheck.heightWithinLimit.label')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(preflightCheckMass).toBeInTheDocument()
    expect(preflightCheckTallest).toBeInTheDocument()
    expect(massLimitCheck).toBeInTheDocument()
    expect(heightLimitCheck).toBeInTheDocument()
  })
})
