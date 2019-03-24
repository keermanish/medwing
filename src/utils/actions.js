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
  return fetch(`${BASE_URL}/marker/all`, {
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
              address: m.address,
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

// function tp get address from lat/lng
const getAddress = (lat, lng) => {
  return new Promise((res, rej) => {
    // eslint-disable-next-line new-parens
    var geocoder = new window.google.maps.Geocoder;
    geocoder.geocode({location: { lat, lng }}, (results, status) => {
      if (status === 'OK' && results[0]) {
        res(results[0]);
      } else {
        rej('Please provied valid cordinates');
      }
    });
  });
};

// create new marker
export const addMarker = (dispatch, payload, cb) => {
  return getAddress(payload.lat, payload.lng)
    .then(data => (
      fetch(`${BASE_URL}/marker/new`, {
        method: 'post',
        body: JSON.stringify({ ...payload, address: data.formatted_address }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    ))
    .then(res => res.json())
    .then(data => {
      const payload = MAP.createMarker({
        id: data._id,
        address: data.address,
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

      cb();
    })
    .catch(error);
};

// update exsiting marker
export const updateMarker = (dispatch, payload, cb) => {
  return fetch(`${BASE_URL}/marker/${payload.isEdit}`, {
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

      cb();
    })
    .catch(error);
};

// delete marker
export const deleteMarker = (dispatch, id) => {
  return fetch(`${BASE_URL}/marker/${id}`, {
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
