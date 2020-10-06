import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue';
import axiosMock from 'axios';

import ContactForm from '@/views/Contact';

Vue.use(BootstrapVue);

test('Check that the ContactForm renders correctly', () => {
  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { },
    }),
  )

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

test('Check that the submit button calls the formspree endpoint with the correct data', async () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(ContactForm);

  const fakeMessage = {
    name: 'test user',
    email: 'test@example.com',
    message: 'an important message',
    page: 'Contact'
  }

  const emailInput = getByPlaceholderText("Enter email");
  await fireEvent.update(emailInput, fakeMessage.email);

  const nameInput = getByPlaceholderText("Enter name");
  await fireEvent.update(nameInput, fakeMessage.name);

  const messageInput = getByTestId("message");
  await fireEvent.update(messageInput, fakeMessage.message);

  const submitButton = getByText("Submit");
  expect(submitButton).toBeEnabled();

  await fireEvent.click(submitButton);

  expect(axiosMock.post).toHaveBeenCalled();
  expect(axiosMock.post).toHaveBeenCalledWith("https://formspree.io/xbjprngw", fakeMessage);
});
