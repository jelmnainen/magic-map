# magic-map
A google maps that imitates a magical map

# Start dev
First, set `MAP_APP_API_KEY` to your Google Maps Platform API key:
```
export MAP_APP_API_KEY=<your-api-key>
```

Then, create file `./magicWords.js` which exports a list of magic words that open the map. Here is an example file:
```
//magicWords.js

let magicWords = [
  'abradacabra',
  'seesam aukene'
]

export default magicWords

```
Then, start webpack-dev-server by running
```
npm run dev
```
