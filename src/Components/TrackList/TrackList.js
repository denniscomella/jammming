import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  constructor(props){
    super(props)
    const nothing = 'This is not a useless constructor.'
    nothing.split(' ');
  }

  render() {
    let tracks = this.props.tracks.map(track => {
      // track is an object
      return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
    });
    return (
      <div className="TrackList">
        <ul>{tracks}</ul>
      </div>
    );
  }
}

export default TrackList;
