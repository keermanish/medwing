import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';

import Button from './Button';

afterEach(cleanup);

test('It should be clickable', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>Submit</Button>);
  fireEvent.click(getByText(/Submit/i))
  expect(onClick).toHaveBeenCalled();
});