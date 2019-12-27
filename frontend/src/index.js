import './index.css'
import magicWords from '../magicWords'
import { map, initMap } from './map'

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

const devShowMap = () => {
  const blankerElem = document.getElementById('map-blanker')
  const mapElem = document.getElementById('map')
  mapElem.classList.remove("hidden")
  blankerElem.classList.add("hidden")
}

const magic_words = magicWords.map(magicWordTransform)

const tryToHideExtraMapStuff = () => {
  // bottom right text
  const elementsToHide = document.getElementsByClassName('gm-style-cc')
  console.log('hidable elements:', elementsToHide)
  for (let i=0; i<elementsToHide.length; i++) {
    let elem = elementsToHide[i]
    elem.classList.add("hidden")
  }
}

const createMarker = (marker, map) => {
  const markerRef = new google.maps.Marker({
    position: {lat: marker.location[0], lng: marker.location[1]},
    map: map,
  })
}

window.onload = function() {
  // setup blanker
  const blanker = document.getElementById('map-blanker')
  blanker.oninput = testForMagicWords(blanker)

  //remove this in production
  devShowMap()

  //setup map
  initMap('map')

  fetch('http://localhost:8080/api/markers')
    .then(res => res.json())
    .then((res) => {
      console.log(res)
      const marker = res.filter((r) => !r.done)
      console.log(marker)
      createMarker(res[0], map)
    })
    .catch(err => { console.log('err', err)})
}
