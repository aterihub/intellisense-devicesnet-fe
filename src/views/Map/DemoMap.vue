<template>
  <div id="mapRoot"></div>
  <div id="popup" title="myproject" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content">
    </div>
  </div>
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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useLoadingStore } from '@/stores/LoadingStore'
import { InfluxDB } from '@influxdata/influxdb-client'
 

const extent = [0, -1604, 2153, 0]

const projection = new Projection({
  code: 'my-custom-projection',
  units: 'pixels',
  extent: extent,
})

const map = ref()
const markerLayer = ref()
let intervalQuery
const loadingStore = useLoadingStore()


const queryApi = new InfluxDB({ url: 'http://64.226.117.91:8086', token: '32KaIOSNxXgcOzzDenFMfX34DeJlVVbzkGL9Nv0PIhCCJP5T9iIqoX8EaY4hE_LunHRh3f2k25ntm1k6lCHA2w==' }).getQueryApi('zoo');
const query = `from(bucket: "zoo")
  |> range(start: -20s)
  |> filter(fn: (r) => r["_measurement"] == "position")
  |> filter(fn: (r) => r["_field"] == "x" or r["_field"] == "94A408B2EE24" or r["_field"] == "94A408B60B80" or r["_field"] == "94A408B60BAC" or r["_field"] == "y")
  |> last()
  |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
  |> drop(columns: ["_start", "_stop", "_measurement"]) `

async function getLocation() {
  const pixelPerMeter = 198.5
  const res = await queryApi.collectRows(query)
  let resultQuery = computed(() => {
    const x = res[0].x * pixelPerMeter
    const y = -722
    return { x, y }
  })
  console.log(res)

  //add the features
  const features = ref([])
  features.value.push(
      new ol.Feature({
        geometry: new Point([resultQuery.value.x, resultQuery.value.y]), // adjust the coordinates to match your marker
        id: res[0].beacon_id
      })
  )

  markerLayer.value.getSource().clear()
  markerLayer.value.getSource().addFeatures(features.value)
}


onMounted(() => {
  //init maps
  map.value = new Map({
    layers: [],
    target: 'mapRoot',
    view: new View({
      extent: extent,
      showFullExtent: true,
      projection: projection,
      center: getCenter(extent),
      zoom: 0,
      minZoom: 0,
      maxZoom: 6,
    })
  });

  //create image layer
  const imgLayer = new ImageLayer({
    source: new Static({
      attributions: '© <a href="https://google.com">SCBD HABITAT ZOO</a>',
      url: require('../../assets/map/demo-overlay.png'),
      projection: projection,
      imageExtent: extent,
    }),
  })

  map.value.addLayer(imgLayer); // add the layer to the map

  map.value.once('rendercomplete', () => {
    console.log('Map rendering is complete!');
    loadingStore.stopLoading()
  })

  markerLayer.value = new VectorLayer({
    source: new Vector({
      features: [],
    }),
    style: new Style({
      image: new Icon({
        src: require('../../assets/map/marker-orange.png'), // adjust the path to match the location of your marker image
        anchor: [0.5, 1],
      }),
    }),
  })
  map.value.addLayer(markerLayer.value); // add the layer to the map

  // Popup showing the position the user clicked
  var container = document.getElementById('popup');
  var popup = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
          duration: 250
      }
  })
  map.value.addOverlay(popup)

  /* Add a pointermove handler to the map to render the popup.*/
  map.value.on('pointermove', function (evt) {

    var feature = map.value.forEachFeatureAtPixel(evt.pixel, function (feat, layer) {
      // console.log(feat.values_)
        return feat;
    })

    
    if (feature != undefined) {
      console.log(feature.values_)
        container.innerHTML = 'ID: ' + feature.values_.id
      popup.setPosition(feature.values_.geometry.flatCoordinates)
    } else {
      popup.setPosition(undefined)
    }
        // var coordinate = [0,0]   //default projection is EPSG:3857 you may want to use ol.proj.transform
  })
  intervalQuery = setInterval(getLocation, 500)

})

onUnmounted(() => {
  clearInterval(intervalQuery)
})




</script>

<style scoped>
#mapRoot {
  @apply w-full h-full px-4 pb-20 pt-4;
}
.ol-popup {
    position: absolute;
    background-color: white;
    /*--webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));*/
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 180px;
    margin-bottom: 30px;
}
.ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}
.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}
.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}
</style>