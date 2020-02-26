import { required, minLength, url } from '../../utils';

export const fields = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Enter a title',
    validators: [required, minLength(3)],
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter a description',
    validators: [minLength(20)],
  },
  {
    name: 'imgUrl',
    label: 'Image url',
    placeholder: 'Paste an image url',
    validators: [url],
  },
  {
    name: 'imdbUrl',
    label: 'IMDB url',
    placeholder: 'Paste an IMDB url',
    validators: [url],
  },
  {
    name: 'imdbId',
    label: 'IMDB id',
    placeholder: 'Enter an IMDB id',
    validators: [required],
  },
];

export const fieldsMap = fields.reduce((acc, field) => ({
  ...acc,
  [field.name]: field,
}), {});

export const initialValues = fields.reduce((acc, { name }) => ({
  ...acc,
  [name]: '',
}), {});

export const initialErrors = fields.reduce((acc, { name }) => ({
  ...acc,
  [name]: null,
}), {});

export const initialTouched = fields.reduce((acc, { name }) => ({
  ...acc,
  [name]: false,
}), {});
