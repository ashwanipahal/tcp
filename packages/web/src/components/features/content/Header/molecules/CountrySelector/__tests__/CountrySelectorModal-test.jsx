import React from 'react';
import { shallow } from 'enzyme';
import { defaultCountries, defaultCurrencies } from '@tcp/core/src/constants/site.constants';
import { Modal } from '@tcp/core/src/components/common/molecules';
import CountrySelectorModal from '../views/CountrySelectorModal';

describe('Country Selector Modal Component', () => {
  const props = {
    countriesMap: defaultCountries,
    currenciesMap: defaultCurrencies,
    isModalOpen: true,
    closeModal: () => {},
    labels: {
      countrySelector: {
        lbl_global_country: "Country",
        lbl_global_language: "Language",
        lbl_global_currency: "Currency",
        lbl_global_country_selector_header: "Ship To",
        lbl_global_country_selector_subheader: "Change Shipping Preference",
        lbl_global_country_selector_cta: "SAVE",
        lbl_global_country_selector_note: "NOTE: If you change your shipping destination."
      }
    },
    languages: [
      {
        id: 'en',
        displayName: 'English',
      },
      {
        id: 'es',
        displayName: 'Spanish',
      },
    ]
  };

  it('renders correctly', () => {
    const component = shallow(<CountrySelectorModal {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should return modal', () => {
    const component = shallow(<CountrySelectorModal {...props} />);
    expect(component.find(Modal)).toBeDefined();
  });
});
