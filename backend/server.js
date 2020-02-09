const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000




let markers = [
  { 'id': 1, 'order': 1, 'active': false, 'markerIcon': null, 'location': [60.439950, 22.262084] },
  { 'id': 2, 'order': 2, 'active': true, 'markerIcon': null, 'location': [60.451050, 22.263076] },
  { 'id': 3, 'order': 3, 'active': false, 'markerIcon': null, 'location': [60.450203, 22.271241] },
  { 'id': 4, 'order': 4, 'active': false, 'markerIcon': null, 'location': [60.451421, 22.272735] },
  { 'id': 5, 'order': 5, 'active': false, 'markerIcon': null, 'location': [60.450016, 22.267834] },
  { 'id': 6, 'order': 6, 'active': false, 'markerIcon': null, 'location': [60.451560, 22.273134] },
  { 'id': 7, 'order': 7, 'active': false, 'markerIcon': null, 'location': [60.450204, 22.278357] },
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

app.get('/marker', (req, res) => {
  const marker = markers.filter((m) => m.active === true)[0]
  res.json(marker)
})

app.get('/markers', (req, res) => {
  res.json(markers)
})

app.put('/markers/activate/:id', (req, res) => {
  const newMarkers = markers.map(activateMarkerWithId(parseInt(req.params.id, 10)))
  markers = newMarkers
  const activeMarker = markers.filter((m) => m.active === true)[0]
  io.emit('activate', activeMarker)
  res.json(markers)
})

io.on('connection', () => {
  console.log('user connected!')
})

http.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
