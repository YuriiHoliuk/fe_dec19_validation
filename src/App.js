import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { TextField } from './components/TextField';
import moviesFromServer from './api/movies.json';

function filterMovies(movies, searchWord) {
  return movies
    .filter(({ title }) => title
      .toLowerCase().includes(searchWord.toLowerCase()));
}

export class App extends Component {
  state = {
    movies: moviesFromServer,
    visibleMovies: moviesFromServer,
    searchWord: '',
  };

  componentDidMount() {
    const savedMovies = localStorage.getItem('movies');
    const savedSearchWord = localStorage.getItem('searchWord');

    const movies = savedMovies
      ? JSON.parse(savedMovies)
      : this.state.movies;

    const searchWord = savedSearchWord || this.state.searchWord;

    if (savedMovies) {
      this.setState({
        movies,
        visibleMovies: filterMovies(movies, searchWord),
        searchWord,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies) {
      localStorage.setItem('movies', JSON.stringify(this.state.movies));
    }

    if (prevState.searchWord !== this.state.searchWord) {
      localStorage.setItem('searchWord', this.state.searchWord);
    }
  }

  addMovie = (newMovie) => {
    this.setState(({ movies, searchWord }) => {
      const newMovies = [...movies, newMovie];

      return {
        movies: newMovies,
        visibleMovies: filterMovies(newMovies, searchWord),
      };
    });
  };

  handleSearchChange = ({ target: { value } }) => {
    this.setState(({ movies }) => ({
      searchWord: value,
      visibleMovies: filterMovies(movies, value),
    }));
  }

  render() {
    const {
      visibleMovies,
      searchWord,
    } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={visibleMovies} />
        </div>

        <div className="sidebar">

          <TextField
            name="search"
            label="Search"
            placeholder="search movie"
            value={searchWord}
            onChange={this.handleSearchChange}
          />
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}
