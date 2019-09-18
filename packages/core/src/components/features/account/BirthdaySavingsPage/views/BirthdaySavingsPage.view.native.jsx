import React from 'react';
import PropTypes from 'prop-types';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ModalNative from '../../../../common/molecules/Modal';

/**
 * This component will render BirthdaySavingsPage component
 * @param { object } labels
 */
export const BirthdaySavings = ({ labels, mountAddChildModal, handleComponentChange }) => {
  return (
    <ModalNative
      isOpen={mountAddChildModal}
      onRequestClose={handleComponentChange}
      heading={labels.lbl_profile_birthday_savings}
    >
      <ViewWithSpacing spacingStyles="margin-left-SM margin-right-SM" />
    </ModalNative>
  );
};

BirthdaySavings.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  mountAddChildModal: PropTypes.bool.isRequired,
  handleComponentChange: PropTypes.func.isRequired,
};

export default BirthdaySavings;
