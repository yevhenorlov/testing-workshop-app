import { render, screen, fireEvent } from '@testing-library/vue'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import App from '@/App.vue'

const { getByText, findByText, findAllByRole, queryByTitle, findByTestId, findByPlaceholderText } =
  screen
const findByPartialText = (text: any) => findByText(text, { exact: false })

describe('App', () => {
  it('renders the expected default state', async () => {
    render(App)
    const title = getByText('main.title')
    const description = getByText('main.description')
    const preflightCheckMass = await findByPartialText('preflightCheck.totalMass')
    const preflightCheckTallest = await findByPartialText('preflightCheck.maxHeight')
    const massLimitCheck = await findByPartialText('preflightCheck.massWithinLimit')
    const heightLimitCheck = await findByPartialText('preflightCheck.heightWithinLimit')
    const currentMaxHeight = await findByTestId('currentMaxHeight')
    const currentTotalMass = await findByTestId('currentTotalMass')
    const launchButton = await findByText('preflightCheck.launch')
    const passengers = await findAllByRole('listitem')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(preflightCheckMass).toBeInTheDocument()
    expect(preflightCheckTallest).toBeInTheDocument()
    expect(massLimitCheck).toBeInTheDocument()
    expect(heightLimitCheck).toBeInTheDocument()
    expect(launchButton).toBeInTheDocument()
    expect(launchButton).not.toBeDisabled()
    expect(passengers).toHaveLength(5)

    expect(currentMaxHeight).toHaveTextContent('195')
    expect(currentTotalMass).toHaveTextContent('470')
  })

  it('hides hyperjump animation by default', async () => {
    render(App)
    const hyperJumpAnimation = queryByTitle('hyperspace')

    expect(hyperJumpAnimation).not.toBeInTheDocument()
  })

  it('shows hyperjump animation after clicking the launch button', async () => {
    render(App)

    const launchButton = await findByText('preflightCheck.launch')
    await fireEvent.click(launchButton)
    const hyperJumpAnimation = queryByTitle('hyperspace')
    expect(hyperJumpAnimation).toBeInTheDocument()
  })

  it('recalculates the mass and height correctly after adding to and removing from the passenger list', async () => {
    render(App)

    const nameInput = await findByPlaceholderText('name')
    const massInput = await findByPlaceholderText('mass')
    const heightInput = await findByPlaceholderText('height')
    const passengers = await findAllByRole('listitem')
    const currentMaxHeight = await findByTestId('currentMaxHeight')
    const currentTotalMass = await findByTestId('currentTotalMass')
    expect(passengers).toHaveLength(5)

    nameInput.focus()
    await userEvent.keyboard('John Doe')
    massInput.focus()
    await userEvent.keyboard('82')
    heightInput.focus()
    await userEvent.keyboard('202{enter}')
    const newPassengers = await findAllByRole('listitem')
    expect(newPassengers).toHaveLength(6)

    expect(currentMaxHeight).toHaveTextContent('202')
    expect(currentTotalMass).toHaveTextContent('552')

    const removeFirstPassengerButton = within(newPassengers[0]).getByRole('button')
    await fireEvent.click(removeFirstPassengerButton)
    expect(currentMaxHeight).toHaveTextContent('202')
    expect(currentTotalMass).toHaveTextContent('452')
    expect(await findAllByRole('listitem')).toHaveLength(5)
  })

  it('disables the button if only the mass is over limit', async () => {
    render(App)

    const launchButton = await findByText('preflightCheck.launch')
    const nameInput = await findByPlaceholderText('name')
    const massInput = await findByPlaceholderText('mass')
    const heightInput = await findByPlaceholderText('height')
    const currentMaxHeight = await findByTestId('currentMaxHeight')
    const currentTotalMass = await findByTestId('currentTotalMass')
    expect(launchButton).not.toBeDisabled()

    nameInput.focus()
    await userEvent.keyboard('John Doe')
    massInput.focus()
    await userEvent.keyboard('234')
    heightInput.focus()
    await userEvent.keyboard('202{enter}')
    expect(currentMaxHeight).toHaveTextContent('202')
    expect(currentTotalMass).toHaveTextContent('704')
    expect(launchButton).toBeDisabled()
  })

  it('disables the button if only the height is over limit', async () => {
    render(App)

    const launchButton = await findByText('preflightCheck.launch')
    const nameInput = await findByPlaceholderText('name')
    const massInput = await findByPlaceholderText('mass')
    const heightInput = await findByPlaceholderText('height')
    const currentMaxHeight = await findByTestId('currentMaxHeight')
    const currentTotalMass = await findByTestId('currentTotalMass')
    expect(launchButton).not.toBeDisabled()

    nameInput.focus()
    await userEvent.keyboard('John Doe')
    massInput.focus()
    await userEvent.keyboard('82')
    heightInput.focus()
    await userEvent.keyboard('212{enter}')
    expect(currentMaxHeight).toHaveTextContent('212')
    expect(currentTotalMass).toHaveTextContent('552')
    expect(launchButton).toBeDisabled()
  })
})
