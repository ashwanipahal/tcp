import { isDevelopment } from '@tcp/core/src/utils';

/*
   This utility runs web-accessibility on the dom and reports errors on the browser console.
   This method has check for environment to prevent it from running in production,
   which might cause performance issue.

   axe.default(React, ReactDOM, 1000);
   The timing delay in milliseconds that will be observed between each component change
   and the time the analysis starts.

   Note: All required libraries are called dynamically to avoid unnecessary import
*/

module.exports = {
  runAccessibility() {
    if (isDevelopment()) {
      Promise.all([import('react'), import('react-dom'), import('react-axe')]).then(
        ([React, ReactDOM, axe]) => {
          axe.default(React, ReactDOM, 1000);
        }
      );
    }
  },
};
