import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import { getLabelValue } from '../../../../../../../../../utils';

import { EditAddressFormHeader } from '../styles/RegisteredShippingForm.view.style.native';

const AddEditShippingAddress = props => {
  const { modalType, actionButtons, labels, addressFields, defaultOptions } = props;
  return (
    <>
      <EditAddressFormHeader>
        <BodyCopy
          color="black"
          fontWeight="regular"
          fontFamily="primary"
          fontSize="fs28"
          text={
            modalType === 'add'
              ? getLabelValue(labels, 'lbl_shipping_addHeading', 'shipping', 'checkout')
              : getLabelValue(labels, 'lbl_shipping_editHeading', 'shipping', 'checkout')
          }
          textAlign="left"
        />
      </EditAddressFormHeader>
      {addressFields()}
      {defaultOptions()}
      {actionButtons()}
    </>
  );
};

AddEditShippingAddress.propTypes = {
  addressFields: PropTypes.func,
  defaultOptions: PropTypes.func,
  modalType: PropTypes.string,
  actionButtons: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
};

AddEditShippingAddress.defaultProps = {
  addressFields: () => {},
  defaultOptions: () => {},
  modalType: null,
  actionButtons: () => {},
};

export default AddEditShippingAddress;
