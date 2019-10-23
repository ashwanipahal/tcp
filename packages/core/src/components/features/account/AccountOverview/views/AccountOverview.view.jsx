import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import AccountOverviewTileList from '../organism/AccountOverviewTileList';

export const AccountOverview = ({ labels, commonLabels }) => {
  return (
    <React.Fragment>
      <FormPageHeadingComponent
        heading={getLabelValue(labels, 'lbl_overview_heading')}
        className="margin-none myAccountRightView"
      />
      <AccountOverviewTileList labels={labels} commonLabels={commonLabels} />
    </React.Fragment>
  );
};

AccountOverview.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_heading: PropTypes.string,
  }),
  commonLabels: PropTypes.shape({}),
};

AccountOverview.defaultProps = {
  labels: {
    lbl_overview_heading: '',
  },
  commonLabels: {},
};

export default AccountOverview;
