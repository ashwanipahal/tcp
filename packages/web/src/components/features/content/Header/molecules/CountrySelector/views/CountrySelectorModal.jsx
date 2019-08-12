/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Button } from '@tcp/core/src/components/common/atoms';
import { Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles, { modalStyles } from '../styles/CountrySelectorModal.style';

const CountrySelectorModal = ({
  className,
  countryListData,
  handleSubmit,
  isModalOpen,
  closeModal,
  labels,
  languages,
}) => {
  return (
    <Modal
      fixedWidth
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      heading={labels.lbl_global_country_selector_header}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content`}
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
        >
          {labels.lbl_global_country_selector_subheader}
        </BodyCopy>
        <hr className="shipToModal__divider" />
        <form className="shipToForm">
          <label htmlFor="country">
            <span>{labels.lbl_global_country}</span>
            <select name="country" id="country">
              {countryListData.length > 0 &&
                countryListData.map(({ country: { code, name } }) => (
                  <option value={code}>{name}</option>
                ))}
            </select>
          </label>
          <label htmlFor="language">
            <span>{labels.lbl_global_language}</span>
            <select name="language" id="language">
              {languages.map(({ code, name }) => (
                <option value={code}>{name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="currency">
            <span>{labels.lbl_global_currency}</span>
            <select name="currency" id="currency">
              {countryListData.length > 0 &&
                countryListData.map(({ currency: { code, name } }) => (
                  <option value={code}>{name}</option>
                ))}
            </select>
          </label>
          <Button
            className="shipToModal__button"
            fill="BLUE"
            buttonVariation="fixed-width"
            onClick={() => handleSubmit()}
          >
            {labels.lbl_global_country_selector_cta}
          </Button>
        </form>
        <BodyCopy className="shipToForm__note-clarification" fontSize="fs12">
          {labels.lbl_global_country_selector_note}
        </BodyCopy>
      </div>
    </Modal>
  );
};

CountrySelectorModal.propTypes = {
  className: PropTypes.string.isRequired,
  countryListData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  languages: PropTypes.shape({}).isRequired,
};

CountrySelectorModal.defaultPropTypes = {
  isModalOpen: false,
  heading: '',
  toggleModal: () => {},
};

export default withStyles(CountrySelectorModal, styles);
export { CountrySelectorModal as CountrySelectorModalVanilla };
