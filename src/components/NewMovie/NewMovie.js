import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '../TextField';
import { makeValidate, validateField, getHasError } from '../../utils';
import {
  initialValues,
  initialErrors,
  initialTouched,
  fields,
  fieldsMap,
} from './constants';

const validate = makeValidate(fields, initialErrors);

export class NewMovie extends Component {
  state = {
    values: initialValues,
    errors: initialErrors,
    touched: initialTouched,
    hasError: false,
  };

  componentDidMount() {
    this.setState((prevState) => {
      const { errors, hasError } = validate(prevState.values);

      return {
        errors,
        hasError,
      };
    });
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState((prevState) => {
      return {
        values: {
          ...prevState.values,
          [name]: value,
        },
      };
    });
  }

  handleBlur = (event) => {
    const { target: { name } } = event;
    const fieldConfig = fieldsMap[name];

    this.setState((prevState) => {
      const error = validateField(fieldConfig, prevState.values[name]);
      const errors = {
        ...prevState.errors,
        [name]: error,
      };

      return {
        errors,
        hasError: getHasError(errors),
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { values } = this.state;
    const { errors, hasError } = validate(values);

    if (!hasError) {
      this.props.onAdd(values);
    }

    this.setState({
      ...(hasError ? {} : { values: initialValues }),
      errors,
    });
  }

  render() {
    const {
      values,
      errors,
      touched,
      hasError,
    } = this.state;

    return (
      <form name="newMovie" onSubmit={this.handleSubmit}>
        {fields.map((fieldConfig) => {
          const {
            name,
            label,
            placeholder,
          } = fieldConfig;

          return (
            <TextField
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              value={values[name]}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={errors[name]}
              touched={touched[name]}
            />
          );
        })}

        <button
          type="submit"
          className="button is-link"
          disabled={hasError}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
