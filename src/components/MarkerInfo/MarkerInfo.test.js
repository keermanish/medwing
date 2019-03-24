import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, waitForElement } from 'react-testing-library';

import MarkerInfo from './MarkerInfo';
import StoreContext from '../../utils/context';

afterEach(cleanup);

test('It should be show lat and lng', async () => {
  const position = { lat: 1, lng: 2 };
  const { getByText } = render(
    <StoreContext.Provider value={{ dispatch: () => true, state: {} }}>
      <MarkerInfo showModal={() => true} marker={{ position }} />
    </StoreContext.Provider>
  );
  await waitForElement(() => getByText(/1/i));
  await waitForElement(() => getByText(/2/i));
});