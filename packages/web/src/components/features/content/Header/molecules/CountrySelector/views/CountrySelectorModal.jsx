/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Button } from '@tcp/core/src/components/common/atoms';
import { Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '@tcp/core/src/utils';

import styles, { modalStyles } from '../styles/CountrySelectorModal.style';

class CountrySelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
  }

  handleCountryChange = event => {
    const selectedCountry = event.target.value;
    const { updateCountry } = this.props;
    updateCountry(selectedCountry);
  };

  handleLanguageChange = event => {
    const selectedLanguage = event.target.value;
    const { updateLanguage } = this.props;
    updateLanguage(selectedLanguage);
  };

  handleCurrencyChange = event => {
    const selectedCurrency = event.target.value;
    const { updateCurrency } = this.props;
    updateCurrency(selectedCurrency);
  };

  toggleDisable = () => {
    const { updatedCountry, updatedCurrency } = this.props;
    return (
      (updatedCountry === 'US' && updatedCurrency === 'USD') ||
      (updatedCountry === 'CA' && updatedCurrency === 'CAD')
    );
  };

  render() {
    const {
      className,
      countriesMap,
      currenciesMap,
      handleSubmit,
      isModalOpen,
      closeModal,
      labels,
      languages,
      savedCountry,
      savedCurrency,
      savedLanguage,
      updatedCurrency,
    } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        heading={labels.lbl_global_country_selector_header}
        overlayClassName="TCPModal__Overlay"
        className={`${className} TCPModal__Content`}
        dataLocator={getLocator('country_selector_ship_to_modal')}
        dataLocatorHeader={getLocator('ship_to_text_1')}
        maxWidth="450px"
        minHeight="643px"
        inheritedStyles={modalStyles}
      >
        <div>
          <BodyCopy
            component="div"
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs18"
            textAlign="center"
            data-locator={getLocator('ship_to_text_2')}
          >
            {labels.lbl_global_country_selector_subheader}
          </BodyCopy>
          <hr className="shipToModal__divider" />
          <form className="shipToForm">
            <label htmlFor="country">
              <span>{labels.lbl_global_country}</span>
              <select
                data-locator={getLocator('country')}
                name="country"
                id="country"
                onChange={this.handleCountryChange}
              >
                {countriesMap.length > 0 &&
                  countriesMap.map(({ code, name }) => (
                    <option value={code} selected={savedCountry === code}>
                      {name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="language">
              <span>{labels.lbl_global_language}</span>
              <select
                data-locator={getLocator('language')}
                name="language"
                id="language"
                onChange={this.handleLanguageChange}
              >
                {languages.map(({ id, displayName }) => (
                  <option value={id} selected={savedLanguage === id}>
                    {displayName}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="currency">
              <span>{labels.lbl_global_currency}</span>
              <select
                data-locator={getLocator('currency')}
                name="currency"
                id="currency"
                onChange={this.handleCurrencyChange}
                disabled={this.toggleDisable()}
              >
                {currenciesMap.length > 0 &&
                  currenciesMap.map(({ code, name }) => (
                    <option
                      value={code}
                      selected={updatedCurrency === code || savedCurrency === code}
                    >
                      {name}
                    </option>
                  ))}
              </select>
            </label>
            <Button
              className="shipToModal__button"
              fill="BLUE"
              buttonVariation="fixed-width"
              onClick={handleSubmit}
              data-locator={getLocator('country_selector_save_btn')}
            >
              {labels.lbl_global_country_selector_cta}
            </Button>
          </form>
          <BodyCopy
            className="shipToForm__note-clarification"
            fontFamily="secondary"
            fontSize="fs12"
            data-locator={getLocator('country_selector_tnc_text')}
          >
            {labels.lbl_global_country_selector_note}
          </BodyCopy>
        </div>
      </Modal>
    );
  }
}

CountrySelectorModal.propTypes = {
  className: PropTypes.string.isRequired,
  countriesMap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currenciesMap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  languages: PropTypes.shape({}).isRequired,
  savedCountry: PropTypes.string.isRequired,
  savedCurrency: PropTypes.string.isRequired,
  savedLanguage: PropTypes.string.isRequired,
  updateCountry: PropTypes.func.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  updateCurrency: PropTypes.func.isRequired,
  updatedCountry: PropTypes.string.isRequired,
  updatedCurrency: PropTypes.string.isRequired,
};

CountrySelectorModal.defaultPropTypes = {
  isModalOpen: false,
  heading: '',
  toggleModal: () => {},
};

export default withStyles(CountrySelectorModal, styles);
export { CountrySelectorModal as CountrySelectorModalVanilla };
