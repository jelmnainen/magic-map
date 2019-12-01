import './index.css'
import magicWords from '../magicWords'

const magicWordTransform = (word) =>
  word
    .toLowerCase()
    .replace(/i am/g, "i m")
    .replace(/ /g, "")
    .replace(/'/g, "")
    .replace(/,/g, "")


let magic_words = magicWords.map(magicWordTransform)

window.onload = function() {

  const blanker = document.getElementById('map-blanker')
  function testChange(e) {
    const val = magicWordTransform(blanker.textContent)

    for (let word in magic_words) {
      if (val == magic_words[word]) {
        const mapElem = document.getElementById('map')
        mapElem.classList.remove("hidden")
        blanker.classList.add("hidden")
      }
    }
  }


  blanker.oninput = testChange
}
