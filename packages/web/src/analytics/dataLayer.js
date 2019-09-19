import { getIn } from 'immutable';
import { dataLayer as defaultDataLayer } from '@tcp/core/src/analytics';

export default function create(store) {
  return Object.assign(Object.create(defaultDataLayer), {
    get state() {
      return store.getState();
    },
    get pageName() {
      return this.state.pageName;
    },
    get listingFilterList() {
      const filters = getIn(this.state, ['form', 'filter-form', 'values'], '');
      return JSON.stringify(filters);
    },
  });
}
