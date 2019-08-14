import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import CountrySelectorModal from './CountrySelectorModal';
import style from '../styles/CountrySelector.styles';
import language from '../../../../../../../config/language';

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

  submitForm = () => {
    const { handleSubmit } = this.props;
    handleSubmit();
    this.closeModal();
  };

  changeCountry = selectedCountry => {
    const { updateCountry } = this.props;
    updateCountry(selectedCountry);
  };

  changeLanguage = selectedLanguage => {
    const { updateLanguage } = this.props;
    updateLanguage(selectedLanguage);
  };

  changeCurrency = selectedCurrency => {
    const { updateCurrency } = this.props;
    updateCurrency(selectedCurrency);
  };

  render() {
    const { className, countryListData, isModalOpen, labels, showInFooter } = this.props;
    const {
      US: { languages },
    } = language;
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
              countryListData={countryListData}
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
          <Image
            src="/static/images/flags/united-states-of-america.svg"
            width="20px"
            height="20px"
            onClick={this.openModal}
          />
        </div>
        <div>
          {languages.map(({ code }, index) => (
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
              {code}
            </BodyCopy>
          ))}
        </div>
      </div>
    );
  }
}

CountrySelector.propTypes = {
  className: PropTypes.string.isRequired,
  countryListData: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loadCountryListData: PropTypes.func,
  showInFooter: PropTypes.bool,
  toggleModal: PropTypes.func,
  updateCountry: PropTypes.func,
  updateLanguage: PropTypes.func,
  updateCurrency: PropTypes.func,
};

CountrySelector.defaultProps = {
  countryListData: [],
  showInFooter: false,
  handleSubmit: () => {},
  loadCountryListData: () => {},
  toggleModal: () => {},
  updateCountry: () => {},
  updateLanguage: () => {},
  updateCurrency: () => {},
};

export default withStyles(CountrySelector, style);
export { CountrySelector as CountrySelectorVanilla };
