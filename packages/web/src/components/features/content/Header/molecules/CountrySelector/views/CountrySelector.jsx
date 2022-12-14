import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import { getFlagIconPath, getLocator } from '@tcp/core/src/utils';

import CountrySelectorModal from './CountrySelectorModal';
import style from '../styles/CountrySelector.style';

/**
 * @class CountrySelector - Invokes a country, language, currency change selector
 * from the global header and footer
 * A Modal will be opened by clicking on flag icon or language from header and footer.
 * @param {props} accepts countriesMap, currenciesMap and languageMap as props.
 */
class CountrySelector extends React.Component {
  loadCountryModuleXData = () => {
    const { getModuleXContent, noteContentId } = this.props;
    getModuleXContent(noteContentId);
  };

  openModal = () => {
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: true });
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
    return countriesMap.find(country => country.id === countryCode);
  };

  getCurrencyMap = countryCode => {
    const { countriesMap } = this.props;
    return countriesMap.find(country => country.id === countryCode).currencyId;
  };

  getSelectedCurrency = currencyCode => {
    const { currenciesMap } = this.props;
    return currenciesMap.find(currency => currency.id === currencyCode);
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
    if (selectedCountry) {
      const { siteId } = this.getSelectedCountry(selectedCountry);
      const currencyCode = this.getCurrencyMap(selectedCountry);
      this.updateCurrency(currencyCode);
      updateSiteId(siteId);
    }
    updateCountry(selectedCountry);
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
    const siteLanguages = sitesTable[siteId];
    return siteLanguages.languages;
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
      labels: { countrySelector: labelValues },
      noteContent,
      showInFooter,
      selectedCountryName,
    } = this.props;
    const languages = this.getLanguageMap();
    const flagIconSrc = getFlagIconPath(savedCountry);

    return (
      <div className={`${className} countrySelector`}>
        {showInFooter && isModalOpen ? (
          <React.Fragment>
            <BodyCopy
              className="countrySelector__shipTo"
              color="gray.800"
              component="div"
              fontFamily="secondary"
              fontSize="fs12"
            >
              {labelValues && labelValues.lbl_global_country_selector_header}
            </BodyCopy>
            <CountrySelectorModal
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              countriesMap={countriesMap}
              currenciesMap={currenciesMap}
              labels={labelValues}
              languages={languages}
              noteContent={noteContent}
              savedCountry={savedCountry}
              savedCurrency={savedCurrency}
              savedLanguage={savedLanguage}
              handleSubmit={this.submitForm}
              updateCountry={this.changeCountry}
              updateLanguage={this.changeLanguage}
              updateCurrency={this.updateCurrency}
              updatedCountry={country}
              updatedCurrency={currency}
              initialValues={{
                country: savedCountry,
                language: savedLanguage,
                currency: savedCurrency,
              }}
              getCountryListData={this.getCountryListData}
              loadCountryModuleXData={this.loadCountryModuleXData}
            />
          </React.Fragment>
        ) : (
          ''
        )}
        <Anchor
          noLink
          handleLinkClick={e => {
            e.preventDefault();
            this.openModal();
          }}
        >
          <div className="countrySelector__flag-icon">
            <Image
              src={flagIconSrc}
              alt={`${selectedCountryName} Flag`}
              width="20px"
              height="20px"
              onClick={this.openModal}
              data-locator={getLocator(
                showInFooter ? 'footer_country_flag' : 'header_country_flag'
              )}
            />
          </div>
          <div>
            {languages.map((language, index) => (
              <BodyCopy
                key={index.toString()}
                component="span"
                fontFamily="secondary"
                fontSize="fs13"
                data-locator={
                  language.id === savedLanguage
                    ? getLocator(
                        showInFooter ? 'footer_language_selected' : 'header_language_selected'
                      )
                    : ''
                }
                className={`${
                  language.id === savedLanguage
                    ? 'countrySelector__locale--selected'
                    : 'countrySelector__locale--disabled'
                } countrySelector__locale`}
                aria-label={language.displayName}
                aria-hidden={language.id !== savedLanguage}
              >
                {language.id}
              </BodyCopy>
            ))}
          </div>
        </Anchor>
      </div>
    );
  }
}

CountrySelector.propTypes = {
  className: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  noteContentId: PropTypes.string.isRequired,
  noteContent: PropTypes.string.isRequired,
  savedCountry: PropTypes.string.isRequired,
  savedCurrency: PropTypes.string.isRequired,
  savedLanguage: PropTypes.string.isRequired,
  loadCountryListData: PropTypes.func,
  countriesMap: PropTypes.shape({}).isRequired,
  currenciesMap: PropTypes.shape({}).isRequired,
  getModuleXContent: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  showInFooter: PropTypes.bool,
  sitesTable: PropTypes.shape({}).isRequired,
  siteId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  updateCountry: PropTypes.func,
  updateLanguage: PropTypes.func,
  updateCurrency: PropTypes.func,
  updateSiteId: PropTypes.func,
  selectedCountryName: PropTypes.string.isRequired,
};

CountrySelector.defaultProps = {
  showInFooter: false,
  handleSubmit: () => {},
  toggleModal: () => {},
  loadCountryListData: () => {},
  updateCountry: () => {},
  updateLanguage: () => {},
  updateCurrency: () => {},
  updateSiteId: () => {},
};

export default withStyles(errorBoundary(CountrySelector), style);
export { CountrySelector as CountrySelectorVanilla };
