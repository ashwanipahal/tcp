const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { argv } = require('optimist');
const { defaultThreshold, options, configuration } = require('./config');

/**
 * @summary This is to evaluate the web url
 * @returns {Promise} Resolves with promise to consume the result of the lighthouse statistics
 */
const launchChromeAndRunLighthouse = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: options.chromeFlags });
  const results = await lighthouse(argv.url, { ...options, port: chrome.port }, configuration);
  await chrome.kill();
  return results.lhr;
};

/**
 * @summary This is to process the lighthouse result
 * @param {object} results - The result of lighthouse evaluation
 * @returns {object} process with the exit code
 */
const processResults = results => {
  const { categories } = results;
  const categoryStatus = {};
  let status = true;

  try {
    Object.keys(categories).forEach(item => {
      const categoryScore = categories[item].score * 100;
      const threshold = typeof argv[item] !== 'undefined' ? argv[item] : defaultThreshold[item];
      const itemStatus = threshold <= categoryScore;
      status = status && itemStatus;
      categoryStatus[item] = itemStatus;

      // eslint-disable-next-line no-console
      console.log(`${item} --> score: ${categoryScore} | threshold: ${threshold}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error: ', err);
    status = false;
  }
  return process.exit(Number(!status));
};

launchChromeAndRunLighthouse().then(processResults);
