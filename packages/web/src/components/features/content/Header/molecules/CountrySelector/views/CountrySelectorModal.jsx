/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { change, Field, reduxForm } from 'redux-form';
import { BodyCopy, Button, RichText, SelectBox } from '@tcp/core/src/components/common/atoms';
import { Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '@tcp/core/src/utils';

import styles, { modalStyles, selectBoxStyle } from '../styles/CountrySelectorModal.style';
import { sites } from '../../../../../../../constants';

/**
 * @class CountrySelectorModal - Opens a Modal containing options to select
 * Country Language, and Currency
 * @param {props} accepts countriesMap, currenciesMap and languageMap as props.
 */
class CountrySelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
  }

  handleCountryChange = (event, selectedCountry) => {
    const { dispatch, updateCountry, countriesMap } = this.props;
    const currentCountry = countriesMap.find(country => country.id === selectedCountry);
    dispatch(change('CountrySelectorForm', 'currency', currentCountry.currencyId));
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
    const { us, ca } = sites;
    return (
      (updatedCountry === us.countryCode && updatedCurrency === us.currencyCode) ||
      (updatedCountry === ca.countryCode && updatedCurrency === ca.currencyCode)
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
      noteContent,
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
            <BodyCopy
              component="label"
              color="gray.900"
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="black"
              textAlign="left"
              for="country"
              data-locator={getLocator('country')}
            >
              <span>{labels.lbl_global_country}</span>
              <Field
                id="country"
                name="country"
                component={SelectBox}
                options={countriesMap}
                onChange={this.handleCountryChange}
                inheritedStyles={selectBoxStyle}
              />
            </BodyCopy>
            <BodyCopy
              component="label"
              color="gray.900"
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="black"
              textAlign="left"
              for="language"
              data-locator={getLocator('language')}
            >
              <span>{labels.lbl_global_language}</span>
              <Field
                id="language"
                name="language"
                component={SelectBox}
                options={languages}
                onChange={this.handleLanguageChange}
                inheritedStyles={selectBoxStyle}
              />
            </BodyCopy>
            <BodyCopy
              component="label"
              color="gray.900"
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="black"
              textAlign="left"
              for="currency"
              data-locator={getLocator('currency')}
            >
              <span>{labels.lbl_global_currency}</span>
              <Field
                id="currency"
                name="currency"
                component={SelectBox}
                options={currenciesMap}
                onChange={this.handleCurrencyChange}
                disabled={this.toggleDisable()}
                inheritedStyles={selectBoxStyle}
              />
            </BodyCopy>
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
            textAlign="center"
            data-locator={getLocator('country_selector_tnc_text')}
          >
            <RichText richTextHtml={noteContent} />
          </BodyCopy>
        </div>
      </Modal>
    );
  }
}

CountrySelectorModal.propTypes = {
  className: PropTypes.string.isRequired,
  noteContent: PropTypes.string.isRequired,
  countriesMap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currenciesMap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  languages: PropTypes.shape({}).isRequired,
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

export default reduxForm({
  form: 'CountrySelectorForm', // a unique identifier for this form
  enableReinitialize: true,
})(withStyles(CountrySelectorModal, styles));

export { CountrySelectorModal as CountrySelectorModalVanilla };
