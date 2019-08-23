import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getFlagIconPath, getLocator } from '@tcp/core/src/utils';

import CountrySelectorModal from './CountrySelectorModal';
import style from '../styles/CountrySelector.styles';

class CountrySelector extends React.Component {
  openModal = () => {
    const { countriesMap, toggleModal } = this.props;
    toggleModal({ isModalOpen: true });
    if (!countriesMap.length) {
      this.getCountryListData();
    }
  };

  closeModal = () => {
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false });
  };

  getCountryListData = () => {
    const { loadCountryListData } = this.props;
    loadCountryListData();
  };

  getSelectedCountry = countryCode => {
    const { countriesMap } = this.props;
    return countriesMap.find(country => country.code === countryCode);
  };

  getCurrencyMap = countryCode => {
    const { countriesMap } = this.props;
    return countriesMap.find(country => country.code === countryCode).currencyId;
  };

  getSelectedCurrency = currencyCode => {
    const { currenciesMap } = this.props;
    return currenciesMap.find(currency => currency.code === currencyCode);
  };

  submitForm = () => {
    const {
      handleSubmit,
      country,
      currency,
      language,
      savedCountry,
      savedCurrency,
      savedLanguage,
    } = this.props;
    const selectedCurrency = this.getSelectedCurrency(currency || savedCurrency);
    const { value, merchantMargin } = selectedCurrency;
    const formData = {
      country: country || savedCountry,
      currency: currency || savedCurrency,
      language: language || savedLanguage,
      savedCountry,
      savedLanguage,
      value,
      merchantMargin,
    };
    handleSubmit(formData);
    this.closeModal();
  };

  changeCountry = selectedCountry => {
    const { updateCountry, updateSiteId } = this.props;
    const { siteId } = this.getSelectedCountry(selectedCountry);
    const currencyCode = this.getCurrencyMap(selectedCountry);
    this.updateCurrency(currencyCode);
    updateCountry(selectedCountry);
    updateSiteId(siteId);
  };

  changeLanguage = selectedLanguage => {
    const { updateLanguage } = this.props;
    updateLanguage(selectedLanguage);
  };

  updateCurrency = selectedCurrency => {
    const { updateCurrency } = this.props;
    updateCurrency(selectedCurrency);
  };

  getLanguageMap = () => {
    const { siteId, sitesTable } = this.props;
    return sitesTable[siteId].languages;
  };

  render() {
    const {
      className,
      countriesMap,
      currenciesMap,
      country,
      currency,
      isModalOpen,
      savedCountry,
      savedCurrency,
      savedLanguage,
      labels,
      showInFooter,
    } = this.props;
    const languages = this.getLanguageMap();
    const flagIconSrc = getFlagIconPath(savedCountry);
    return (
      <div className={`${className} countrySelector`}>
        {showInFooter ? (
          <React.Fragment>
            <BodyCopy
              className="countrySelector__shipTo"
              color="gray.800"
              component="div"
              fontFamily="secondary"
              fontSize="fs12"
            >
              {labels.lbl_global_country_selector_header}
            </BodyCopy>
            <CountrySelectorModal
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              countriesMap={countriesMap}
              currenciesMap={currenciesMap}
              labels={labels}
              languages={languages}
              savedCountry={savedCountry}
              savedCurrency={savedCurrency}
              savedLanguage={savedLanguage}
              handleSubmit={this.submitForm}
              updateCountry={this.changeCountry}
              updateLanguage={this.changeLanguage}
              updateCurrency={this.updateCurrency}
              updatedCountry={country}
              updatedCurrency={currency}
            />
          </React.Fragment>
        ) : (
          ''
        )}
        <div className="countrySelector__flag-icon">
          <Image
            src={flagIconSrc}
            width="20px"
            height="20px"
            onClick={this.openModal}
            data-locator={getLocator(showInFooter ? 'footer_country_flag' : 'header_country_flag')}
          />
        </div>
        <div>
          {languages.map(({ id }, index) => (
            <BodyCopy
              key={index.toString()}
              component="span"
              fontFamily="secondary"
              fontSize="fs13"
              data-locator={
                id === savedLanguage
                  ? getLocator(
                      showInFooter ? 'footer_language_selected' : 'header_language_selected'
                    )
                  : ''
              }
              className={`${
                id === savedLanguage
                  ? 'countrySelector__locale--selected'
                  : 'countrySelector__locale--disabled'
              } countrySelector__locale`}
              onClick={this.openModal}
            >
              {id}
            </BodyCopy>
          ))}
        </div>
      </div>
    );
  }
}

CountrySelector.propTypes = {
  className: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  savedCountry: PropTypes.string.isRequired,
  savedCurrency: PropTypes.string.isRequired,
  savedLanguage: PropTypes.string.isRequired,
  countriesMap: PropTypes.arrayOf(PropTypes.shape({})),
  currenciesMap: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loadCountryListData: PropTypes.func,
  showInFooter: PropTypes.bool,
  sitesTable: PropTypes.shape({}).isRequired,
  siteId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  updateCountry: PropTypes.func,
  updateLanguage: PropTypes.func,
  updateCurrency: PropTypes.func,
  updateSiteId: PropTypes.func,
};

CountrySelector.defaultProps = {
  countriesMap: [],
  currenciesMap: [],
  showInFooter: false,
  handleSubmit: () => {},
  loadCountryListData: () => {},
  toggleModal: () => {},
  updateCountry: () => {},
  updateLanguage: () => {},
  updateCurrency: () => {},
  updateSiteId: () => {},
};

export default withStyles(CountrySelector, style);
export { CountrySelector as CountrySelectorVanilla };
