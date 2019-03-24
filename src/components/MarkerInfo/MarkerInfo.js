import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import { deleteMarker } from '../../utils/actions';
import StateContext from '../../utils/context';
import './MarkerInfo.css';

const MarkerInfo = ({ marker, showModal }) => {
  const { dispatch } = useContext(StateContext);

  const _onDelete = () => deleteMarker(dispatch, marker.id);
  const _onEdit = () => showModal(
    marker.position.lat,
    marker.position.lng,
    marker.id // isEdit
  );

  return (
    <li className="marker-info">
      <h4 title={marker.address}>{marker.address || ''}</h4>
      <span><strong>Lat</strong>: {marker.position.lat}</span>
      <span><strong>Lng</strong>: {marker.position.lng}</span>
      <Button onClick={_onEdit}>Edit</Button>
      <Button onClick={_onDelete}>Delete</Button>
    </li>
  )
};

MarkerInfo.propTypes = {
  showModal: PropTypes.func.isRequired,
  marker: PropTypes.object.isRequired
};

export default MarkerInfo;
