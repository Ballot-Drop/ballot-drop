import { render } from '@testing-library/vue';
import ContactForm from '@/views/Contact';

test('Check if ContactForm renders correctly', () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(ContactForm);

  const h1 = getByText("Contact Ballot Drop");
  expect(h1).toBeTruthy();

  // input fields
  const emailInput = getByPlaceholderText("Enter email");
  expect(emailInput).toBeTruthy();

  const nameInput = getByPlaceholderText("Enter name");
  expect(nameInput).toBeTruthy();

  const messageInput = getByTestId("message");
  expect(messageInput).toBeTruthy();

  // buttons
  const submitButton = getByText("Submit");
  expect(submitButton).toBeTruthy();

  const resetButton = getByText("Reset");
  expect(resetButton).toBeTruthy();
});
