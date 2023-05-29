<template>
  <div id="mapRoot"></div>
  <!-- <div class="slider-wrapper">
    <div class="slider">
      <label for="radius">Radius</label>
      <input id="radius" v-model="heatmapRadius" type="text" @change="setRadius(heatmapRadius)" min="1" max="20" step="1">
    </div>
    <div class="slider">
      <label for="blur">Blur</label>
      <input id="blur" v-model="heatmapBlur" type="text" @change="setBlur(heatmapBlur)" min="1" max="20" step="1">
    </div>
  </div> -->
</template>

<script setup>
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getCenter } from 'ol/extent.js';

import ImageLayer from 'ol/layer/Image.js'
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import { ref, onMounted, onUnmounted } from 'vue';
import Heatmap from 'ol/layer/Heatmap.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import { useLoadingStore } from '@/stores/LoadingStore'

const loadingStore = useLoadingStore()

const extent = [-500, 0, 500, 500];
const projection = new Projection({
  code: 'my-custom-projection',
  units: 'pixels', 
  extent: extent,
});
// let heatmapLayer = null
// const heatmapBlur = ref(20)
// const heatmapRadius = ref(20)

// function setBlur(val) {
//   heatmapLayer.setBlur(val);
// }
// function setRadius(val) {
//   heatmapLayer.setRadius(val);
// }

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
  });
  
  //create heatmap layer
  const heatmapLayer = new Heatmap({
    source: new VectorSource({
      features: []
    }),
    blur: 10,
    radius: 10,
  });

  map.addLayer(heatmapLayer);
  

  const data = [
    { x: 100, y:100, w:0.1 },
    { x: 110, y:100, w:0.2 },
    { x: 120, y:100, w:0.3 },
    { x: 120, y:100, w:0.3 },
    { x: 120, y:100, w:0.3 },
    { x: 120, y:100, w:0.3 },
    { x: 200, y:200, w:0.1 },
    { x: 210, y:200, w:0.2 },
    { x: 212, y:200, w:0.3 },
    { x: 215, y:200, w:0.3 },
    { x: 220, y:200, w:0.3 },
    { x: 220, y:200, w:0.3 },
    { x: 100, y:400, w:0.1 },
    { x: 100, y:400, w:0.2 },
    { x: 100, y:400, w:0.3 },
    { x: 100, y:400, w:0.3 },
    { x: 100, y:400, w:0.3 },
    { x: 100, y:400, w:0.3 },
    { x: 110, y:400, w:0.1 },
    { x: 110, y:400, w:0.2 },
    { x: 110, y:400, w:0.3 },
    { x: 110, y:400, w:0.3 },
    { x: 110, y:400, w:0.3 },
    { x: 110, y:400, w:0.3 },
    { x: 140, y:400, w:0.1 },
    { x: 140, y:400, w:0.2 },
    { x: 140, y:400, w:0.3 },
    { x: 140, y:400, w:0.3 },
    { x: 140, y:400, w:0.3 },
    { x: -100, y:300, w:0.3 },
    { x: -100, y:300, w:0.1 },
    { x: -100, y:300, w:0.2 },
    { x: -100, y:300, w:0.3 },
    { x: -100, y:300, w:0.3 },
    { x: -100, y:300, w:0.3 },
    { x: -100, y:300, w:0.3 },
    { x: -120, y:320, w:0.5 }, 
    { x: -120, y:320, w:0.5 },
    { x: -120, y:300, w:0.3 },
    { x: -120, y:300, w:0.1 },
    { x: -120, y:300, w:0.2 },
    { x: -120, y:300, w:0.3 },
    { x: -120, y:300, w:0.3 },
    { x: -120, y:300, w:0.3 },
    { x: -120, y:300, w:0.3 },
    { x: -112, y:320, w:0.5 }, 
    { x: -112, y:320, w:0.5 },
    { x: -112, y:300, w:0.3 },
    { x: -112, y:300, w:0.1 },
    { x: -112, y:300, w:0.2 },
    { x: -112, y:300, w:0.3 },
    { x: -112, y:300, w:0.3 },
    { x: -90, y:280, w:0.3 },
    { x: -90, y:280, w:0.3 },
    { x: -90, y:320, w:0.5 }, 
    { x: -90, y:320, w:0.5 },
    { x: -90, y:280, w:0.3 },
    { x: -110, y:280, w:0.1 },
    { x: -110, y:300, w:0.2 },
    { x: -110, y:300, w:0.3 },
    { x: -110, y:300, w:0.3 },
    { x: -90, y:300, w:0.3 },
    { x: -90, y:300, w:0.3 },
    { x: -90, y:320, w:0.5 }, 
    { x: -80, y:320, w:0.5 },
  ]


  function fillFeature(x,y,weight) {
    return new Feature({
      geometry: new Point([x, y]),
      weight: weight,
    })
  }

  const features = ref([])

  for (let i = 0; i < data.length; i++) {
    features.value[i] = fillFeature(data[i].x,data[i].y,data[i].w)
  }
  
  heatmapLayer.getSource().addFeatures(features.value);

});



</script>

<style scoped>
#mapRoot {
  @apply w-full h-screen;
}
.slider-wrapper {
  @apply absolute left-[80px] top-[20px] w-fit z-50 flex flex-row gap-4
}

</style>