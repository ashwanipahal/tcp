import { isDevelopment } from '@tcp/core/src/utils/util';

module.exports = {
  runAccessibility() {
    Promise.all([import('react'), import('react-dom'), import('react-axe')]).then(
      ([React, ReactDOM, axe]) => {
        setTimeout(() => {
          axe.default(React, ReactDOM, 1000);
        }, 10);
      }
    );
  },
  validateAccessibility() {
    if (isDevelopment()) {
      this.runAccessibility();
    }
  },
};
