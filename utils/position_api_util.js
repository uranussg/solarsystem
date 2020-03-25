export const position = (planets) => {
    data ={
        'event': Date.now(), 
    'planets': planets,
    'topo': [ longitude, latitude, geoalt],
    'zodiac': 'sidereal mode name'
    }
    return fetch({
        method: 'post',
        url:'http://ephemeris.kibo.cz/api/v1/planets',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
    })
}