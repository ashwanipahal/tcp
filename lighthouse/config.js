const { argv } = require('optimist');

/**
 * @summary This is to process the options argument
 * @returns {object} Processed options config
 */
const argvOptions = () => {
  const argvOptionObject = {};
  try {
    const { options } = argv;
    const optionList = options ? options.split(',') : [];
    optionList.forEach(item => {
      const [key, value] = item.split(':');
      argvOptionObject[key] = value;
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error: ', err);
  }
  return argvOptionObject;
};

const defaultThreshold = {
  performance: 20,
  accessibility: 20,
  // 'best-practices': 20,
  seo: 20,
  pwa: 20,
};

const options = {
  chromeFlags: ['--headless'],
  onlyCategories: Object.keys(defaultThreshold),
  ...argvOptions(),
};

const configuration = null;

module.exports = {
  defaultThreshold,
  options,
  configuration,
};
