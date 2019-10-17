import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerPage.style';
import AccountDrawerHeading from '../../../molecules/AccountDrawerHeading';
import RewardsPoints from '../../../../common/organism/RewardsPoints';
import ExtraPointsTeaser from '../../../molecules/ExtraPointsTeaser';
import AccountDrawerBottomLinks from '../../../molecules/AccountDrawerBottomLinks';
import MyOffersCoupons from '../../../../common/organism/MyOffersCoupons';
import { isCanada } from '../../../../../../../utils';

const AccountDrawerPage = props => {
  const { className, plccUser, userName, closedOverlay, labels, globalLabels } = props;
  const isCA = isCanada();
  return (
    <div className={className}>
      <AccountDrawerHeading userName={userName} closedOverlay={closedOverlay} />
      {!isCA && (
        <>
          <div className="elem-pl-MED elem-pr-MED">
            <RewardsPoints />
          </div>
          <ExtraPointsTeaser plccUser={plccUser} labels={labels} globalLabels={globalLabels} />
        </>
      )}
      <div className="accountDrawer_coupons">
        <MyOffersCoupons closedOverlay={closedOverlay} />
      </div>
      <AccountDrawerBottomLinks closedOverlay={closedOverlay} />
    </div>
  );
};

AccountDrawerPage.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
  closedOverlay: PropTypes.func.isRequired,
  plccUser: PropTypes.bool,
  globalLabels: PropTypes.shape({}),
};

AccountDrawerPage.defaultProps = {
  className: '',
  labels: {},
  userName: '',
  plccUser: false,
  globalLabels: {},
};

export default withStyles(AccountDrawerPage, styles);
export { AccountDrawerPage as AccountDrawerPageVanilla };
