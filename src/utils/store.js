import { useReducer } from 'react';

import {
  LOAD_MARKERS,
  ADD_MARKERS,
  UPDATE_MARKERS,
  DELETE_MARKERS
} from './const';

// initial state of the markers
const INTTIAL_STATE = {
  loadingMarkers: true,
  markers: []
};

// reducer to manage the state
const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_MARKERS:
      return {
        ...state,
        markers: action.payload.markers || [],
        loadingMarkers: false
      };

    case ADD_MARKERS:
      return {
        ...state,
        markers: state.markers.concat(action.payload)
      };

    case UPDATE_MARKERS:
      return {
        ...state,
        markers: state.markers
          .map(m => {
            if (m.id === action.payload.id) {
              // remove prev marker from MAP
              m.$marker.setMap(null);

              return action.payload;
            }

            return m;
          })
      };

    case DELETE_MARKERS:
      return {
        ...state,
        markers: state.markers
          .filter(m => {
            if (m.id === action.payload.id) {
              // remove prev marker from MAP
              m.$marker.setMap(null);

              return false;
            }

            return true;
          })
      };

    default:
      return state;
  }
};

// create store
export const getStore = () => {
  const [state, dispatch] = useReducer(reducer, INTTIAL_STATE);

  return {
    state,
    dispatch
  };
};
