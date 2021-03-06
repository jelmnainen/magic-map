# Magic-map
A Google Maps app which imitates a magical map.

## Directories
 - `/backend` contains backend server
 - `/frontend` contains frontend server and assets

## Setup
Create file `./frontend/magicWords.js` which exports a list of magic words that open the map. Some transformations are done to the words to help end-user pain. You can find this list in `./frontend/src/index.js`. Here is an example `magicWords.js` file:
```
//magicWords.js

let magicWords = [
  'abradacabra',
  'seesam aukene'
]

export default magicWords
```

Then, follow the steps in "Start dev" to begin developing.

## Start dev
First, set `MAP_APP_API_KEY` to your Google Maps Platform API key:
```
export MAP_APP_API_KEY=<your-api-key>
```

Then, start backend by running the following in `./backend`:
```
npm run dev
```

and the frontend by running the following in `./frontend`:
```
npm run dev
```
