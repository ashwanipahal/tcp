import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import styles from '../styles/AddEditAddress.style';

import AddEditAddress from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.container';

const AddEditAddressContainer = ({ labels, isEdit, backToAddressBookClick, className }) => {
  return (
    <div className={className}>
      <Anchor
        className="addAddress__anchor__back"
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        to="/account?id=address-book"
        dataLocator="addnewaddress-back"
        asPath="/account/address-book"
      >
        <span className="left-arrow"> </span>
        {labels.common.lbl_common_backLink}
      </Anchor>
      <Heading
        fontFamily="primaryFontFamily"
        HeadingLarge="six"
        tag="h4"
        className="addAddress__separator"
      >
        {isEdit
          ? labels.addressBook.ACC_LBL_EDIT_ADDRESS_FORM_HEADING
          : labels.addressBook.ACC_LBL_ADD_ADDRESS_FORM_HEADING}
      </Heading>
      <AddEditAddress
        backToAddressBookClick={backToAddressBookClick}
        labels={labels}
        isEdit={isEdit}
      />
    </div>
  );
};

AddEditAddressContainer.propTypes = {
  labels: PropTypes.shape({}),
  isEdit: PropTypes.bool,
  backToAddressBookClick: PropTypes.func,
  className: PropTypes.string,
};

AddEditAddressContainer.defaultProps = {
  labels: {
    common: {
      lbl_common_backLink: '',
    },
    addressBook: {
      ACC_LBL_EDIT_ADDRESS_FORM_HEADING: '',
      ACC_LBL_ADD_ADDRESS_FORM_HEADING: '',
    },
  },
  isEdit: false,
  backToAddressBookClick: () => {},
  className: '',
};

export default withStyles(AddEditAddressContainer, styles);
