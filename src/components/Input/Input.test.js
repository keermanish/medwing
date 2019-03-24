import React from 'react'
import { render, cleanup } from 'react-testing-library';

import Input from './Input';

afterEach(cleanup);

test('It should have correct input value', () => {
  const utils = render(<Input onChange={e => e.target.value} value="test" label="test" />);
  const input = utils.getByLabelText('test');
  expect(input.value).toBe('test');
});