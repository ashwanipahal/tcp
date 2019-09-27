import countries from './countries.mock';

const options = countries
  .map(item => ({
    title: item.country,
    content: item.country,
    value: item.country,
  }))
  .sort(item => item.title);

export default options;
