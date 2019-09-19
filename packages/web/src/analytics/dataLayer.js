import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';

export default function create(store) {
  return Object.create(defaultDataLayer, {
    pageName: {
      get() {
        const { pageName = 'page' } = store.getState();
        return pageName;
      },
    },
    listingFilterList: {
      get() {
        const { form: { 'filter-form': { values } = {} } = {} } = store.getState();
        return JSON.stringify(values);
      },
    },
  });
}
