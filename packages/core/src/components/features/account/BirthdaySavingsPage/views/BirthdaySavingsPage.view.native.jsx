import React from 'react';
import PropTypes from 'prop-types';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ModalNative from '../../../../common/molecules/Modal';
import BirthdaySavingsList from '../../common/organism/BirthdaySavingsList';
import { getLabelValue } from '../../../../../utils';

/**
 * This component will render BirthdaySavingsPage component
 * @param { object } labels
 */
const BirthdaySavings = ({ labels, mountAddChildModal, handleComponentChange }) => {
  return (
    <ModalNative
      isOpen={mountAddChildModal}
      onRequestClose={handleComponentChange}
      heading={getLabelValue(labels, 'lbl_profile_birthday_savings')}
    >
      <ViewWithSpacing spacingStyles="margin-left-LRG margin-right-LRG">
        <BirthdaySavingsList view="edit" labels={labels} />
      </ViewWithSpacing>
    </ModalNative>
  );
};

BirthdaySavings.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  mountAddChildModal: PropTypes.bool.isRequired,
  handleComponentChange: PropTypes.func.isRequired,
};

export default BirthdaySavings;
