import { clientID, redirectURI } from './config'
let accessToken = '';

let Spotify = {
  getAccessToken: function() {
    if (accessToken){
      // return new Promise(resolve => resolve(accessToken)); // ???
      console.log("Already had this access token: " + accessToken);
      return accessToken;
    }

    const authURL = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    let myURL = window.location.href // URL of current page
    console.log('Current URL: ' + myURL);
    accessToken = myURL.match(/access_token=([^&]*)/);
    let expiresIn = myURL.match(/expires_in=([^&]*)/);
    console.log('Access token: ' + accessToken);
    if (accessToken && expiresIn ){
      accessToken = accessToken[0].slice(13);
      expiresIn = expiresIn[0].slice(11);
      console.log("Resetting access token.")
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }else{
      console.log("Redirecting to Spotify...");
      window.location.assign(authURL);
    }
    // return fetch(url, {method: 'POST',}).then(response => response.json()).then(jsonResponse => accessToken = jsonResponse.access_token);
  },

  search: function(term) {
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    this.getAccessToken();
    return new Promise(function(){return fetch(searchURL, { headers: { Authorization: `Bearer ${accessToken}`, },
    }).then(response => response.json()).then(jsonResponse => {
      if(jsonResponse.tracks){
        console.log(jsonResponse.tracks);
        return jsonResponse.tracks.map(track => {
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
