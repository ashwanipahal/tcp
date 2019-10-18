import React from 'react';
import { shallow } from 'enzyme';
import { defaultCountries, defaultCurrencies } from '@tcp/core/src/constants/site.constants';
import { Image } from '@tcp/core/src/components/common/atoms';
import { CountrySelectorVanilla } from '../views/CountrySelector';
import CountrySelectorModal from '../views/CountrySelectorModal';

const sitesTable = {
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
};

describe('Country Selector Component', () => {
  const props = {
    countriesMap: defaultCountries,
    currenciesMap: defaultCurrencies,
    country: 'US',
    currency: 'USD',
    isModalOpen: false,
    savedCountry: 'US',
    savedCurrency: 'USD',
    savedLanguage: 'en',
    labels: {
      countrySelector: {
        lbl_global_country: 'Country',
        lbl_global_language: 'Language',
        lbl_global_currency: 'Currency',
        lbl_global_country_selector_header: 'Ship To',
        lbl_global_country_selector_subheader: 'Change Shipping Preference',
        lbl_global_country_selector_cta: 'SAVE',
        lbl_global_country_selector_note: 'NOTE: If you change your shipping destination.',
      },
    },
    showInFooter: true,
    siteId: 'us',
    sitesTable,
    noteContent: 'sdfsdf',
    noteContentId: 'abc-test',
    getModuleXContent: jest.fn(() => {}),
  };

  it('renders correctly', () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('returns flag image correctly', () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    expect(component.find(Image)).toHaveLength(1);
  });

  it('should returns 2 languages', () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    expect(component.find('.countrySelector__locale')).toHaveLength(2);
  });

  it('should display in footer and display modal', () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    expect(component.find('.countrySelector__shipTo')).toHaveLength(1);
    expect(component.find(CountrySelectorModal)).toHaveLength(1);
  });

  it('should call getSelectedCurrency', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().getSelectedCurrency();
  });

  it('should call openModal', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().openModal();
  });

  it('should call closeModal', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().closeModal();
  });

  it('should call getSelectedCountry', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().getSelectedCountry();
  });

  it('should call submitForm', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().submitForm();
  });

  it('should call changeLanguage', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().changeLanguage();
  });

  it('should call updateCurrency', async () => {
    const component = shallow(<CountrySelectorVanilla {...props} />);
    component.instance().updateCurrency();
  });
});
