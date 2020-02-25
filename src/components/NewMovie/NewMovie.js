import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../TextField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (title === '') {
      this.setState({
        titleError: 'Title is required',
      });

      return;
    }

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleError: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
    } = this.state;

    return (
      <form name="newMovie" onSubmit={this.handleSubmit}>
        <TextField
          name="title"
          label="Movie title"
          placeholder="Input new movie title"
          value={title}
          onChange={this.handleChange}
          error={titleError}
        />

        <TextField
          name="description"
          label="Movie description"
          placeholder="Input new movie description"
          value={description}
          onChange={this.handleChange}
        />

        <TextField
          name="imgUrl"
          label="Movie imgUrl"
          placeholder="Input new movie imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <TextField
          name="imdbUrl"
          label="Movie imdbUrl"
          placeholder="Input new movie imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <TextField
          name="imdbId"
          label="Movie imdbId"
          placeholder="Input new movie imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />

        <button type="submit" className="button is-link">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
