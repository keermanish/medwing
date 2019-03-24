import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library';

import Modal from './Modal';

afterEach(cleanup);

test('It should be able to show', async () => {
  const { getByText } = render(
    <Modal
      closeModal={() => true}
      showModal={true}
    >
      Modal Body
    </Modal>
  );

  await waitForElement(() => getByText(/Modal Body/i));
});

test('It should be able to close', () => {
  const closeModal = jest.fn();
  const { getByText } = render(
    <Modal
      showModal={true}
      closeModal={closeModal}
    >
      Modal Body
    </Modal>
  );
  fireEvent.click(getByText(/close/i));
  expect(closeModal).toHaveBeenCalled();
});