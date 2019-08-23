import React from 'react';
import { shallow } from 'enzyme';
import { CountrySelectorVanilla } from '../views/CountrySelector';

describe('Country Selector Component', () => {
  it('renders correctly', () => {
    const props = {
      countriesMap: [],
      currenciesMap: [],
      country: 'US',
      currency: 'USD',
      isModalOpen: false,
      savedCountry: 'US',
      savedCurrency: 'USD',
      savedLanguage: 'en',
      labels: {},
      showInFooter: false,
      siteId: 'us',
      sitesTable: {
        us: {
          languages: [
            {
              id: 'en',
              displayName: 'English',
            },
            {
              id: 'es',
              displayName: 'Spanish',
            },
          ],
        },
        ca: {
          languages: [
            {
              id: 'en',
              displayName: 'English',
            },
            {
              id: 'fr',
              displayName: 'French',
            },
          ],
        },
      },
    };
    const component = shallow(<CountrySelectorVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
