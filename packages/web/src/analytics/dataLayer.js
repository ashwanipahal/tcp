import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';

export default function(/* store */) {
  return Object.create(defaultDataLayer, {
    pageName: {
      get() {
        return 'page name';
      },
    },
    userId: {
      get() {
        return 'user id';
      },
    },
  });
}
