import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';

export default function(store) {
  return Object.create(defaultDataLayer, {
    pageName: {
      get() {
        return store.getState().pageName;
      },
    },
    userId: {
      get() {
        return 'user id';
      },
    },
  });
}
