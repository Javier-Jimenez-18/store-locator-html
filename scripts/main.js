import { stores } from "./stores.js";
import { addMarkers } from "./addMarkers.js";
import { buildLocationList } from "./buildLocationList.js";

/* This will let you use the .remove() function later on */
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken =
  "pk.eyJ1IjoieHl6enkiLCJhIjoiY2txaXVoczMyMDJ2aDJvcDh3YnpkajdybiJ9.0Vvzfd8gLehqIosj4iiiVg";

/**
 * Add the map to the page
 */
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-77.034084142948, 38.909671288923],
  zoom: 13,
  scrollZoom: false,
});

/**
 * Assign a unique id to each store. You'll use this `id`
 * later to associate each point on the map with a listing
 * in the sidebar.
 */
stores.features.forEach(function (store, i) {
  store.properties.id = i;
});

/**
 * Wait until the map loads to make changes to the map.
 */
map.on("load", function (e) {
  /**
   * This is where your '.addLayer()' used to be, instead
   * add only the source without styling a layer
   */
  map.addSource("places", {
    type: "geojson",
    data: stores,
  });

  /**
   * Add all the things to the page:
   * - The location listings on the side of the page
   * - The markers onto the map
   */
  buildLocationList(stores);
  addMarkers(map, stores);
});
