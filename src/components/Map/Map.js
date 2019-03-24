import React, { useEffect, useRef, useContext } from 'react';

import { MAP } from '../../utils/helper';
import { loadMarkers } from '../../utils/actions';
import StateContext from '../../utils/context';
import './Map.css';

const Map = () => {
  const $map = useRef(null);
  const { dispatch } = useContext(StateContext);

  // will mount
  useEffect(() => {

    // load map with default options
    MAP.load($map.current);

    // load all markers
    loadMarkers(dispatch)
  }, []);

  return <div ref={$map} className="map-container" />
}

export default Map;
