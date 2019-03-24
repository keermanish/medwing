import {
  DEFAULT_MAP_OPTIONS,
  DEFAULT_MAP_POSITION
} from './const';

// MAP module to manage to map and marker
export const MAP = {
  map: null,
  load: function($map, options) {
    this.map = new window.google.maps.Map($map, options || DEFAULT_MAP_OPTIONS);

    return this.map;
  },
  createMarker: function(options = {}) {
    const marker = new window.google.maps.Marker({
      ...options,
      position: options.position || DEFAULT_MAP_POSITION,
      map: this.map
    });

    return { ...options, $marker: marker };
  }
};

// common error handler
export const error = (e) => {
  console.error(e);
  throw e;
}