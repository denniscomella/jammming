import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { searchResults: [{id: "Song", artist: "Artistimo", album: "My Favorite Album", }],
                  playlistName: "Awesome Playlist",
                  playlistTracks: [{id: 'I Picked This Song', artist: "I like songs", album: "That one Album", }], }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    let index = this.state.playlistTracks.findIndex(playlistTrack => playlistTrack.id===track.id)
    // this conditional will prevent duplicate tracks from being added to the playlist.
    if (index === -1){ // good feature or no?
      let newPlaylist = this.state.playlistTracks.concat(track);
      this.setState({ playlistTracks: newPlaylist, });
    }
  }
  removeTrack(track){
    let index = this.state.playlistTracks.findIndex(playlistTrack => playlistTrack.id===track.id)
    // we don't strictly need the conditional, but this could let us expand features later
    if (index !== -1) { // if the chosen track is already in the playlist, remove it
      this.state.playlistTracks.splice(index, 1);
      this.setState({ playlistTracks: this.state.playlistTracks, });
    }else { // else add it to the playlist}
    };
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name, });
  }

  savePlaylist(){
    let trackURIs = [];
    this.playlistTracks.forEach(track => trackURIs.push(track.uri));
  }

  search(term){
    console.log("searching for '" + term + "'");
    Spotify.search(term)
      .then(results => {
        this.setState({
          searchResults: results,
        })
      })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} isRemoval={false} />
            <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onSave={this.savePlaylist} isRemoval={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
