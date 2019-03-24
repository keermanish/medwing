import React from 'react';

import { render, cleanup, waitForElement } from 'react-testing-library';

import Home from './Home';
import StoreContext from '../../utils/context';

afterEach(cleanup);

window.google = {
  maps: {
    Map: function Map() {}
  }
};

test('It should show empty text', async () => {
  const { getByText } = render(
    <StoreContext.Provider value={{ dispatch: () => true, state: {
      markers: []
    }}}>
      <Home />
    </StoreContext.Provider>
  );
  await waitForElement(() => getByText(/No markers added/i));
});

test('It should show list of markers', async () => {
  const { getByText } = render(
    <StoreContext.Provider value={{ dispatch: () => true, state: {
      markers: [{ id: Date.now(), position: { lat: 55.55, lng: 54.54 } }]
    }}}>
      <Home />
    </StoreContext.Provider>
  );
  await waitForElement(() => getByText(/55.55/i));
  await waitForElement(() => getByText(/54.54/i));
});
