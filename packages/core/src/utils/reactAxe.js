const runAccessibility = () => {
  Promise.all([import('react'), import('react-dom'), import('react-axe')]).then(
    ([React, ReactDOM, axe]) => {
      setTimeout(() => {
        axe.default(React, ReactDOM, 1000);
      }, 10);
    }
  );
};

const validateAccessibility = () => {
  if (process.env.NODE_ENV !== 'production') {
    // make util for this
    runAccessibility();
  }
};

export default validateAccessibility;
