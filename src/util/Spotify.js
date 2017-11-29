import { clientID, secret, redirectURI } from './config'
let accessToken = '';

let Spotify = {
  getAccessToken: function() {
    if (accessToken){
      // return new Promise(resolve => resolve(accessToken)); // ???
      console.log("Already had this access token: " + accessToken);
      return accessToken;
    }

    let url = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    let responseURL = window.location.href(url) //GET?
    accessToken = responseURL.match('/access_token=([^&]*)/')[0].slice(13);
    let expiresIn = responseURL.match('/expires_in=([^&]*)/')[0].slice(11);
    console.log('Access token: ' + accessToken);
    if (accessToken && expiresIn ){
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      // needs a redirect here???
    }
    // return fetch(url, {method: 'POST',}).then(response => response.json()).then(jsonResponse => accessToken = jsonResponse.access_token);
  },

  search: function(term) {
    const searchURL = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`;
    return new Promise(function(resolve){fetch(searchURL, { headers: { Authorization: `Bearer ${accessToken}`, },
    }).then(response => response.json()).then(jsonResponse => {
      if(jsonResponse.tracks){
        return jsonResponse.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      }
        console.log("Ain't no tracks.");
        return [];
      }
    )})
  },
};

export default Spotify;
