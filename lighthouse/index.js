const lighthouse = require('lighthouse');
const fs = require('fs');
const chromeLauncher = require('chrome-launcher');
const { argv } = require('optimist');
const { defaultThreshold, options, configuration } = require('./config');
const logger = require('../packages/core/src/utils/loggerInstance');

/**
 * @summary This is to evaluate the web url
 * @returns {Promise} Resolves with promise to consume the result of the lighthouse statistics
 */
const launchChromeAndRunLighthouse = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: options.chromeFlags });
  const { url } = argv;
  const results = await lighthouse(url, { ...options, port: chrome.port }, configuration);
  const { report } = await lighthouse(
    url,
    { ...options, output: 'html', port: chrome.port },
    configuration
  );
  await chrome.kill();
  const path = url.substring(url.lastIndexOf('/') + 1);
  const reportDirectory = './lighthouse/reports';
  const reportPath = `${reportDirectory}/report-${path}.html`;
  if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory);
  }
  fs.createWriteStream(reportPath);
  fs.writeFileSync(reportPath, report, err => {
    if (err) {
      logger.error(err);
    }
    logger.error(`Report generated under -- ${reportPath}`);
  });
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

      logger.error(`${item} --> score: ${categoryScore} | threshold: ${threshold}`);
    });
  } catch (err) {
    logger.error(err);
    status = false;
  }
  return process.exit(Number(!status));
};

launchChromeAndRunLighthouse().then(processResults);
