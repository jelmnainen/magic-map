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

window.onload = function() {
  // setup blanker
  const blanker = document.getElementById('map-blanker')
  blanker.oninput = testForMagicWords(blanker)

  //setup map
  initMap('map')

  const testMarker = new google.maps.Marker({
    position: {lat: 60.4323, lng: 22.2822},
    map: map,
    title: "hello world"
  })
}
