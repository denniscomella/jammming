import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = { term: this.checkTerm(), }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    if (this.state.term){
      this.search();
    }
  }

  checkTerm(){
    // check if there was a search query before login/authentication
    let myTerm = window.location.href.match(/term=([^&]*)/);
    if (myTerm){
      myTerm = myTerm[1];
    }else{
      // the browser may render "=" and "%3D" interchangably in URL
      myTerm = window.location.href.match(/term%3D([^&]*)/);
      if (myTerm){
        myTerm=myTerm[1];
      }else{
        myTerm='';
      }
    }
    return myTerm
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({ term: event.target.value, });
  }

  handleKeyPress(event){
    if (event.keyCode === 13){
      this.search();
    }
  }

  render() {
    return (// add onChange={this.handleTermChange} to input
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyDown={this.handleKeyPress} placeholder="Enter A Song, Album, or Artist" value={this.state.term} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
