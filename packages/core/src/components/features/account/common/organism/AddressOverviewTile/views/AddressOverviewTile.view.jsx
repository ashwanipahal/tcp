import React from 'react';
import PropTypes from 'prop-types';

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const AddressOverviewTile = ({ labels }) => {
  return (
    <AccountOverviewTile
      title={labels.lbl_overview_addressBookHeading}
      ctaTitle={labels.lbl_overview_addressBookCTA}
    >
      <p>Dummy Address book</p>
    </AccountOverviewTile>
  );
};

AddressOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_addressBookHeading: PropTypes.string,
    lbl_overview_addressBookCTA: PropTypes.string,
  }),
};

AddressOverviewTile.defaultProps = {
  labels: {
    lbl_overview_addressBookHeading: 'Address Book',
    lbl_overview_addressBookCTA: 'View Address Book',
  },
};

export default AddressOverviewTile;
