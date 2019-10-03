import countries from './countries.mock';

const options = countries.map(item => ({
  title: item.country,
  content: item.country,
  value: item.country,
}));

export default options;
