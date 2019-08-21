import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getSiteId, getFlagIconPath } from '@tcp/core/src/utils';

import CountrySelectorModal from './CountrySelectorModal';
import style from '../styles/CountrySelector.styles';

class CountrySelector extends React.Component {
  openModal = () => {
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: true });
    this.getCountryListData();
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

  submitForm = () => {
    const { handleSubmit, country, currency, language, oldCountry, oldLanguage } = this.props;
    const formData = {
      country,
      currency,
      language,
      oldCountry,
      oldLanguage,
    };
    handleSubmit(formData);
    this.closeModal();
  };

  changeCountry = selectedCountry => {
    const { updateCountry, updateSiteId } = this.props;
    const { siteId } = this.getSelectedCountry(selectedCountry);
    updateCountry(selectedCountry);
    updateSiteId(siteId);
  };

  changeLanguage = selectedLanguage => {
    const { updateLanguage } = this.props;
    updateLanguage(selectedLanguage);
  };

  changeCurrency = selectedCurrency => {
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
      country,
      countriesMap,
      currenciesMap,
      isModalOpen,
      labels,
      showInFooter,
    } = this.props;
    const languages = this.getLanguageMap();
    const flag = country || getSiteId().toUpperCase();

    return (
      <div className={`${className} countrySelector`}>
        {showInFooter ? (
          <React.Fragment>
            <BodyCopy
              className="countrySelector__shipTo"
              color="gray.800"
              component="div"
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
              handleSubmit={this.submitForm}
              updateCountry={this.changeCountry}
              updateLanguage={this.changeLanguage}
              updateCurrency={this.changeCurrency}
            />
          </React.Fragment>
        ) : (
          ''
        )}
        <div className="countrySelector__flag-icon">
          <Image src={getFlagIconPath(flag)} width="20px" height="20px" onClick={this.openModal} />
        </div>
        <div>
          {languages.map(({ id }, index) => (
            <BodyCopy
              component="span"
              fontSize="fs13"
              className={`${
                index < 1
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
  oldCountry: PropTypes.string.isRequired,
  oldLanguage: PropTypes.string.isRequired,
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
