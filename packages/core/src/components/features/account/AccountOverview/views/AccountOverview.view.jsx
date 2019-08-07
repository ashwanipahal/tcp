import React from 'react';
import PropTypes from 'prop-types';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import AccountOverviewTileList from '../organism/AccountOverviewTileList';

export const AccountOverview = ({ labels }) => {
  return (
    <React.Fragment>
      <FormPageHeadingComponent heading={labels.lbl_overview_heading} className="margin-none" />
      <AccountOverviewTileList labels={labels} />
    </React.Fragment>
  );
};

AccountOverview.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_heading: PropTypes.string,
  }),
};

AccountOverview.defaultProps = {
  labels: {
    lbl_overview_heading: '',
  },
};

export default AccountOverview;
