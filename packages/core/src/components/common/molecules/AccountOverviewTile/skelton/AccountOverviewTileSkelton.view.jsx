import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

import styles from './AccountOverviewTileSkelton.style';

const AccountOverviewTileSkelton = ({ className }) => {
  return (
    <div className={className}>
      <div className="headingWrapper">
        <LoaderSkelton width="75%" height="42px" />
      </div>
      <div className="contentWrapper">
        <LoaderSkelton width="100%" height="400px" />
      </div>
      <div>
        <LoaderSkelton width="100%" height="42px" />
      </div>
    </div>
  );
};

AccountOverviewTileSkelton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AccountOverviewTileSkelton, styles);
export { AccountOverviewTileSkelton as AccountOverviewTileSkeltonVanilla };
