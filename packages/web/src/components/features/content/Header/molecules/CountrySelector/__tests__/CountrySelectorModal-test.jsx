import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from '@tcp/core/src/components/common/molecules';
import { defaultCountries, defaultCurrencies } from '@tcp/core/src/constants/site.constants';
import { CountrySelectorModalVanilla } from '../views/CountrySelectorModal';

describe('Country Selector Modal Component', () => {
  const props = {
    countriesMap: defaultCountries,
    currenciesMap: defaultCurrencies,
    isModalOpen: true,
    closeModal: () => {},
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
    updateCurrency: jest.fn(),
    updateLanguage: jest.fn(),
    dispatch: jest.fn(),
    updateCountry: jest.fn(),
    initialValues: {
      country: 'US',
      currency: 'USD',
      language: 'en',
    },
  };

  it('renders correctly', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.exists()).toMatchSnapshot();
  });

  it('should render Modal correctly', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.find(Modal)).toHaveLength(1);
  });

  it('should render country dropdown correctly', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.find('#country')).toHaveLength(1);
  });

  it('should render language dropdown correctly', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.find('#language')).toHaveLength(1);
  });

  it('should render currency dropdown correctly', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.find('#currency')).toHaveLength(1);
  });

  it('should render footer note', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.find('.shipToForm__note-clarification')).toHaveLength(1);
  });

  it('should render button correctly', () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    expect(component.find('.shipToModal__button')).toHaveLength(1);
  });

  it('should call handleCountryChange', async () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    component.instance().handleCountryChange(
      {
        target: {
          name: 'language',
          value: 'en',
        },
      },
      'US'
    );
  });

  it('should call handleLanguageChange', async () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    component.instance().handleLanguageChange({
      target: {
        name: 'language',
        value: 'en',
      },
    });
  });

  it('should call handleCurrencyChange', async () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    component.instance().handleCurrencyChange({
      target: {
        name: 'currency',
        value: 'USD',
      },
    });
  });

  it('should call toggleDisable', async () => {
    const component = shallow(<CountrySelectorModalVanilla {...props} />);
    component.instance().toggleDisable();
  });
});
