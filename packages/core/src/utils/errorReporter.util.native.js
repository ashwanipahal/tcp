// We should utilise the web file only and make it common for both web and app
// Making this mock file till the time we implement raygun in mobile app as well..

const trackError = ({ error }) => {
  console.log(error);
};

module.exports = {
  trackError,
};
