const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

let markers = [
  { 'id': 1, 'order': 1, 'active': false, 'markerIcon': null, 'location': [60.444269, 22.274858] },
  {'id': 2, 'order': 2, 'active': true, 'markerIcon': null, 'location': [60.446269, 22.276858] },
  {'id': 3, 'order': 3, 'active': false, 'markerIcon': null, 'location': [60.446269, 22.276858] }
]

const activateMarkerWithId = (id) => (marker) => {
  if (marker.id === id) {
    marker.active = true
  } else {
    marker.active = false
  }
  return marker
}

app.get('/', (req, res) => res.send('Hello world!'))

app.get('/markers', (req, res) => res.json(markers))

app.put('/markers/activate/:id', (req, res) => {
  const newMarkers = markers.map(activateMarkerWithId(parseInt(req.params.id, 10)))
  markers = newMarkers
  res.sendStatus(200)
})

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
