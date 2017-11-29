import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.search = this.search.bind(this);
  }
  search(event){
    this.props.onSearch(event.target.value);
  }
  render() {
    return (// add onChange={this.handleTermChange} to input
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
