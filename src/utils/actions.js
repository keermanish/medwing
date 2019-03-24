import {
  LOAD_MARKERS,
  ADD_MARKERS,
  UPDATE_MARKERS,
  DELETE_MARKERS,
  BASE_URL
} from './const';

import { MAP, error } from './helper';

// load all markers
export const loadMarkers = (dispatch) => {
  fetch(`${BASE_URL}/marker/all`, {
    method: 'get'
  })
    .then(res => res.json())
    .then(markers => {
      dispatch({
        type: LOAD_MARKERS,
        payload: {
          markers: markers
            .map(m => MAP.createMarker({
              id: m._id,
              position: {
                lat: m.lat,
                lng: m.lng
              }
            }))
        }
      });
    })
    .catch(error);
};

// create new marker
export const addMarker = (dispatch, payload) => {
  fetch(`${BASE_URL}/marker/new`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      const payload = MAP.createMarker({
        id: data._id,
        position: {
          lat: data.lat,
          lng: data.lng
        }
      });

      // update store
      dispatch({
        type: ADD_MARKERS,
        payload
      });
    })
    .catch(error);
};

// update exsiting marker
export const updateMarker = (dispatch, payload) => {
  fetch(`${BASE_URL}/marker/${payload.isEdit}`, {
    method: 'put',
    body: JSON.stringify({ lat: payload.lat, lng: payload.lng }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      const payload = MAP.createMarker({
        id: data._id,
        position: {
          lat: data.lat,
          lng: data.lng
        }
      });

      // update store
      dispatch({
        type: UPDATE_MARKERS,
        payload
      });
    })
    .catch(error);
};

// delete marker
export const deleteMarker = (dispatch, id) => {
  fetch(`${BASE_URL}/marker/${id}`, {
    method: 'delete'
  })
    .then(res => res.json())
    .then(() => {
      dispatch({
        type: DELETE_MARKERS,
        payload: { id }
      });
    })
    .catch(error);
};
