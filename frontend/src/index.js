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

const setCookie = (key, value) => {
  let d = new Date();
  d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
  const expires = "expires="+d.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

const createTextSpan = (content) => {
  const span = document.createElement("span")
  const text = document.createTextNode(content)
  span.classList.add("presentation-text")
  span.classList.add("hidden-text")
  span.appendChild(text)
  return span
}

const showMap = () => {
  const blanker = document.getElementById('map-blanker')
  setTimeout(() => {
    blanker.classList.add("hidden")
  },750)
  for (let i = 1; i <= 9; i++) {
    let msg = document.getElementById(`msg-${i}`)
    const timeout = Math.floor(Math.random() * 3000) + 750
    setTimeout(() => {
      msg.classList.remove("hidden-text")
      msg.classList.add("showtext")
    }, timeout)
    setTimeout(() => {
      msg.classList.add("fade-away-text")
      msg.classList.remove("showtext")
      setTimeout(() => {
        msg.remove()
        const main = document.getElementById('msg-10')
        const hox = document.getElementById('msg-11')
        main.classList.add("showtext")
        main.classList.remove("hidden-text")
        setTimeout(() => {
          hox.classList.add("showtext")
          hox.classList.remove("hidden-text")
          setTimeout(() => {
            const presentationElem = document.getElementById('presentation-text-wrapper')
            const mapElem = document.getElementById('map')
            mapElem.classList.remove("hidden")
            presentationElem.classList.add("hidden")
          }, 7500)
        }, 1000)
      }, 750)
    }, 10000)
  }
}

const testForMagicWords = (blankerElem) => (e) => {
  const val = magicWordTransform(blankerElem.textContent)

  for (let word in magic_words) {
    if (val == magic_words[word]) {
      blankerElem.classList.add("flash")
      showMap()
      setCookie('hadCorrectPassword', 'true')
      // IF you want to be a nice person comment this
      // setTimeout(tryToHideExtraMapStuff, 600)
    }
  }
}

const magic_words = magicWords.map(magicWordTransform)

// Google maps

let activeMarker = {}

const skipBlanker = () => {
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

  if (getCookie('hadCorrectPassword') === 'true') {
    skipBlanker()
  }

  //setup map
  initMap('map')

  fetch('/marker')
    .then(res => res.json())
    .then((res) => {
      createMarker(res, map)
    })
    .catch(err => { console.log('err', err)})
}
