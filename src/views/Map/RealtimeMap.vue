<template>
  <div id="mapRoot"></div>
</template>

<script setup>
import 'ol/ol.css';
import * as ol from 'ol';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getCenter } from 'ol/extent.js';

import { Icon, Style } from 'ol/style.js';
import { Point } from 'ol/geom.js';
import { Vector as VectorLayer } from 'ol/layer.js'; 
import { Vector } from 'ol/source.js';

import ImageLayer from 'ol/layer/Image.js'
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';

import { ref, onMounted, onUnmounted } from 'vue';

import { useLoadingStore } from '@/stores/LoadingStore'

const loadingStore = useLoadingStore()


const extent = [-500, 0, 500, 500]
const projection = new Projection({
  code: 'my-custom-projection',
  units: 'pixels',
  extent: extent,
});

onMounted(() => {
  const map = new Map({
    layers: [],
    target: 'mapRoot',
    view: new View({
      extent: extent,
      showFullExtent: true,
      projection: projection,
      center: getCenter(extent),
      zoom: 3,
      minZoom: 3,
      maxZoom: 6,
    })
  });

  //create image layer
  const imgLayer = new ImageLayer({
    source: new Static({
      attributions: '© <a href="https://google.com">SCBD HABITAT ZOO</a>',
      url: require('../../assets/map/map-overlay.png'),
      projection: projection,
      imageExtent: extent,
    }),
  })

  map.addLayer(imgLayer); // add the layer to the map

  map.once('rendercomplete', () => {
    console.log('Map rendering is complete!');
    loadingStore.stopLoading()
  })



  //create marker layer
  const markerLayer = new VectorLayer({
    source: new Vector({
      features: [
        new ol.Feature({
          geometry: new Point([100, 200]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([0.5, 90]), // adjust the coordinates to match your marker
        }),
        new ol.Feature({
          geometry: new Point([-200, 300]), // adjust the coordinates to match your marker
        }), 
      ]
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/map/marker.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  });


  map.addLayer(markerLayer); // add the layer to the map
  
  const markerLayer2 = new VectorLayer({
    source: new Vector({
      features: [],
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/map/marker-orange.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  });
  
  map.addLayer(markerLayer2); // add the layer to the map

  const feature = 
    [  
    new ol.Feature({
      geometry: new Point([0, 0]), // adjust the coordinates to match your marker
    }),
    new ol.Feature({
      geometry: new Point([-500, 0]), // adjust the coordinates to match your marker
    }),
    new ol.Feature({
      geometry: new Point([500,0]), // adjust the coordinates to match your marker
    }),
    new ol.Feature({
      geometry: new Point([0,500]), // adjust the coordinates to match your marker
    }),
    new ol.Feature({
      geometry: new Point([500, 500]), // adjust the coordinates to match your marker
    }),
    new ol.Feature({
      geometry: new Point([-500, 500]), // adjust the coordinates to match your marker
    }),
    ]
  markerLayer2.getSource().addFeatures(feature)

 
});



</script>

<style scoped>
#mapRoot {
  @apply w-full h-screen;
}
</style>