import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Contact from '@/components/Contact';
import messages from '@/messages/en.json';

jest.mock('@emailjs/browser', () => ({
  send: jest.fn().mockResolvedValue({ status: 200 }),
}));

test('renders contact form fields', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Contact />
    </NextIntlClientProvider>
  );
  expect(screen.getByPlaceholderText(messages.contact.name)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(messages.contact.email)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: messages.contact.send })).toBeInTheDocument();
});
