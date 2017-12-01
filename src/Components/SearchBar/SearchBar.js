import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props)
    let checkTerm = window.location.href.match(/term=([^&]*)/);
    if (checkTerm){
      checkTerm = checkTerm[1];
    }else{
      checkTerm='';
    }
    this.state = { term: checkTerm, }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    if (checkTerm){
      this.search();
    }
  }
  search(){
    this.props.onSearch(this.state.term);
  }
  handleTermChange(event){
    this.setState({ term: event.target.value, });
  }
  render() {
    return (// add onChange={this.handleTermChange} to input
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" value={this.state.term} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
