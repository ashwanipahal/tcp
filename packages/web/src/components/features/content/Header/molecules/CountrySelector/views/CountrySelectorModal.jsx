/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { change, Field, reduxForm, reset } from 'redux-form';
import { BodyCopy, Button, RichText } from '@tcp/core/src/components/common/atoms';
import Select from '@tcp/core/src/components/common/atoms/Select';
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

  componentDidMount() {
    const { getCountryListData, countriesMap, loadCountryModuleXData } = this.props;
    if (!countriesMap.length) {
      getCountryListData();
    }
    loadCountryModuleXData();
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
    const {
      updatedCountry,
      updatedCurrency,
      initialValues: { country, currency },
    } = this.props;

    const { us, ca } = sites;
    return (
      (updatedCountry === us.countryCode && updatedCurrency === us.currencyCode) ||
      (updatedCountry === ca.countryCode && updatedCurrency === ca.currencyCode) ||
      (!updatedCountry && country === us.countryCode && currency === us.currencyCode) ||
      (!updatedCountry && country === ca.countryCode && currency === ca.currencyCode)
    );
  };

  closeModal = () => {
    const { closeModal, dispatch, updateLanguage, updateCountry, updateCurrency } = this.props;
    closeModal();
    dispatch(reset('CountrySelectorForm'));
    updateCountry('');
    updateCurrency('');
    updateLanguage('');
  };

  render() {
    const {
      className,
      countriesMap,
      currenciesMap,
      handleSubmit,
      isModalOpen,
      labels,
      languages,
      noteContent,
    } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={isModalOpen}
        onRequestClose={this.closeModal}
        heading={labels && labels.lbl_global_country_selector_header}
        overlayClassName="TCPModal__Overlay"
        className={`${className} TCPModal__Content`}
        dataLocator={getLocator('country_selector_ship_to_modal')}
        dataLocatorHeader={getLocator('ship_to_text_1')}
        maxWidth="450px"
        minHeight="643px"
        inheritedStyles={modalStyles}
        shouldCloseOnOverlayClick={false}
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
            {labels && labels.lbl_global_country_selector_subheader}
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
              <span>{labels && labels.lbl_global_country}</span>
              <Field
                id="country"
                name="country"
                component={Select}
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
              <span>{labels && labels.lbl_global_language}</span>
              <Field
                id="language"
                name="language"
                component={Select}
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
              <span>{labels && labels.lbl_global_currency}</span>
              <Field
                id="currency"
                name="currency"
                component={Select}
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
              {labels && labels.lbl_global_country_selector_cta}
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
  countriesMap: PropTypes.shape({}).isRequired,
  currenciesMap: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  languages: PropTypes.shape({}).isRequired,
  updateCountry: PropTypes.func.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  updateCurrency: PropTypes.func.isRequired,
  updatedCountry: PropTypes.string.isRequired,
  updatedCurrency: PropTypes.string.isRequired,
  loadCountryModuleXData: PropTypes.func.isRequired,
  getCountryListData: PropTypes.func.isRequired,
};

CountrySelectorModal.defaultPropTypes = {
  isModalOpen: false,
  heading: '',
  toggleModal: () => {},
};

export default reduxForm({
  form: 'CountrySelectorForm',
  enableReinitialize: true,
})(withStyles(CountrySelectorModal, styles));

export { CountrySelectorModal as CountrySelectorModalVanilla };
