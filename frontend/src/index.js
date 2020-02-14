import io from 'socket.io-client'
import './index.css'
import magicWords from '../magicWords'
import { map, initMap } from './map'


// Socket.io
const socket = io("http://localhost:3000")

socket.on('activate', (newMarker) => {
  removeMarker()
  createMarker(newMarker, map)
})

// Magic words
const magicWordTransform = (word) =>
  word
    .toLowerCase()
    .replace(/i am/g, "i m")
    .replace(/ /g, "")
    .replace(/'/g, "")
    .replace(/,/g, "")

const testForMagicWords = (blankerElem) => (e) => {
  const val = magicWordTransform(blankerElem.textContent)

  for (let word in magic_words) {
    if (val == magic_words[word]) {
      const mapElem = document.getElementById('map')
      mapElem.classList.remove("hidden")
      blankerElem.classList.add("hidden")
      // IF you want to be a nice person comment this
      // setTimeout(tryToHideExtraMapStuff, 600)
    }
  }
}

const magic_words = magicWords.map(magicWordTransform)

// Google maps

let activeMarker = {}

const devShowMap = () => {
  const blankerElem = document.getElementById('map-blanker')
  const mapElem = document.getElementById('map')
  mapElem.classList.remove("hidden")
  blankerElem.classList.add("hidden")
}

const tryToHideExtraMapStuff = () => {
  // bottom right text
  const elementsToHide = document.getElementsByClassName('gm-style-cc')
  for (let i=0; i<elementsToHide.length; i++) {
    let elem = elementsToHide[i]
    elem.classList.add("hidden")
  }
}

const removeMarker = () => {
  activeMarker.setMap(null)
  activeMarker = {}
}

const createMarker = (marker, map) => {
  const markerRef = new google.maps.Marker({
    position: {lat: marker.location[0], lng: marker.location[1]},
    map: map,
    icon: `/static/${marker.icon}.png`,
  })
  activeMarker = markerRef
}

const sortByOrderProp = (a, b) => {
  return a.order - b.order
}

window.onload = function() {
  // setup blanker
  const blanker = document.getElementById('map-blanker')
  blanker.oninput = testForMagicWords(blanker)

  //remove this in production
  // devShowMap()

  //setup map
  initMap('map')

  fetch('/marker')
    .then(res => res.json())
    .then((res) => {
      createMarker(res, map)
    })
    .catch(err => { console.log('err', err)})
}
