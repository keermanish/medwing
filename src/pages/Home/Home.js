import React, { useState, useContext } from 'react';

import StateContext from '../../utils/context';
import { addMarker, updateMarker } from '../../utils/actions';

import Map from '../../components/Map/Map';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import MarkerInfo from '../../components/MarkerInfo/MarkerInfo';

import './Home.css';

const Home = () => {
  const {state, dispatch} = useContext(StateContext);
  const [showModal, toggleModal] = useState(false);
  const [loadingMap, updateMapLoading] = useState(true);
  const [lat, updateLat] = useState('');
  const [lng, updateLng] = useState('');
  const [isEdit, manageIsEdit] = useState(-1);
  const [errors, updateErrors] = useState({});

  // function to open modal
  // for add state, all values should be empty
  // for edit state, values should prefilled with selected marker lat/lng
  const _showModal = (lt = '', lg = '', isEdit = -1) => {
    updateLat(lt);
    updateLng(lg);
    toggleModal(true)
    manageIsEdit(isEdit);
  };

  // function to close modal, reset all values lat, lng, error, modal state
  const _closeModal = () => {
    updateLat('');
    updateLng('');
    updateErrors({});
    toggleModal(false);
  };

  // wait till google map gets load, to avoid unawanted breaks
  window.addEventListener('load', () => updateMapLoading(false));

  // function to post/pust marker details
  const _onSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // basic validation
    if (!lat || !lng) {
      errors.lat = !lat ? 'This is mandatory field' : '';
      errors.lng = !lng ? 'This is mandatory field' : '';
      updateErrors(errors);

      return false;
    }

    if (isEdit === -1) {
      // add new marker
      addMarker(dispatch, {
        lat,
        lng
      });
    } else {
      // update exisiting marker
      updateMarker(dispatch, {
        lat,
        lng,
        isEdit // contains id of marker
      });
    }

    // close modal
    _closeModal();
  };

  const _onFieldChange = (e, setter) => setter(parseFloat(e.target.value));

  if (loadingMap) {
    return <div className="text-center">Initializing Map</div>;
  }

  return (
    <div className="container">
      <div className="wrapper">
        <Map />
        <div className="marker-list-container">
          <div className="top-strip">
            <Button onClick={() => _showModal()} variant="primary">Add Marker</Button>
          </div>
          <Modal showModal={showModal} closeModal={_closeModal} title="Add New Marker">
            <form onSubmit={_onSubmit} noValidate>
              <Input
                value={lat}
                onChange={e => _onFieldChange(e, updateLat)}
                label="Lat"
                type="number"
                placeholder="Lat"
                error={errors.lat}
              />
              <Input
                value={lng}
                onChange={e => _onFieldChange(e, updateLng)}
                label="Lng"
                type="number"
                placeholder="Lng"
                error={errors.lng}
              />
              <Button type="submit" variant="primary">Submit</Button>
            </form>
          </Modal>
          {
            state.loadingMarkers ?
              <p>Fetching stored markers</p> :
              <ul className="marker-list">
                {
                  state.markers.length ?
                    state.markers.map((m, i) => (
                      <MarkerInfo
                        key={m.id}
                        marker={m}
                        showModal={_showModal}
                      />
                    )) :
                    <p>No markers added</p>
                }
              </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
