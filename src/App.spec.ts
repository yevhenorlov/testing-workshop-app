import { render } from '@testing-library/vue'
import App from '@/App.vue'

describe('App', () => {
  it('renders as expected', async () => {
    const { getByText, findByText } = render(App)
    const findByPartialText = (text: any) => findByText(text, { exact: false })

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
