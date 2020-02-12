import './index.css'

const put = (url, body) => {
  const options = {
    method: "PUT",
  }
  return fetch(url, options)
}

const createDataElement = (data) => {
  const elem = document.createElement("td")
  elem.classList.add('data-cell')
  elem.innerHTML = data
  return elem
}

const clearMarkers = (data) => {
  const elems = document.getElementsByClassName('marker-wrapper')
  while(elems.length > 0) {
    elems[0].parentNode.removeChild(elems[0])
  }
}

const activateMarkerWithId = (id) => {
  put(`/markers/activate/${id}`)
    .then((res) => res.json())
    .then((res) => {
      clearMarkers()
      createMarkers(res)
    })
    .catch((err) => console.log('err', err))
}

const createActivationButton = (id) => {
  const wrapper = document.createElement('td')
  const button = document.createElement("button")
  button.onclick = () => { activateMarkerWithId(id) }
  button.innerHTML = "Activate"
  wrapper.appendChild(button)
  return wrapper
}

const createMarkerElement = (markerData) => {
  // Create wrapper
  const wrapper = document.createElement("tr")
  const activeClass = markerData.active ? 'active' : 'not-active'
  wrapper.classList.add('marker-wrapper')
  wrapper.classList.add(activeClass)

  wrapper.appendChild(createDataElement(markerData.id))
  wrapper.appendChild(createDataElement(markerData.order))
  wrapper.appendChild(createDataElement(markerData.active))

  const activationButton = markerData.active ? document.createElement("td") : createActivationButton(markerData.id)
  wrapper.appendChild(activationButton)

  return wrapper
}

const createMarkers = (markers) => {
  const markerElems = markers.map(createMarkerElement)
  const mountElement = document.getElementById('markers-entry')
  markerElems.forEach((markerElem) =>  {
    mountElement.appendChild(markerElem)
  })
}

window.onload = () => {
  fetch(`/markers`)
    .then(res => res.json())
    .then((res) => {
      createMarkers(res)
    })
    .catch(err => { console.log('err', err)})
}
