import React from 'react';
import PropTypes from 'prop-types';
import LogOutPageContainer from '../../../../Logout/container/LogOut.container';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerBottomLinks.style';
import Anchor from '../../../../../../common/atoms/Anchor';

const AccountDrawerBottomLinks = props => {
  const { className, labels } = props;
  return (
    <div className={className}>
      <div className="linksWrapper elem-pl-MED elem-pr-MED">
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            anchorVariation="primary"
            text={labels.CREATE_ACC_MY_FAV}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            anchorVariation="primary"
            text={labels.CREATE_ACC_MY_PLACE_REWARDS_CC}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            anchorVariation="primary"
            text={labels.CREATE_ACC_WALLET}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            anchorVariation="primary"
            text={labels.CREATE_ACC_ORDERS}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <LogOutPageContainer labels={labels} />
        </div>
      </div>
    </div>
  );
};

AccountDrawerBottomLinks.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
};

AccountDrawerBottomLinks.defaultProps = {
  className: '',
  labels: {
    CREATE_ACC_MY_FAV: 'My Favorites',
    CREATE_ACC_MY_PLACE_REWARDS_CC: 'My Place Rewards Credit Card',
    CREATE_ACC_WALLET: 'Wallet',
    CREATE_ACC_ORDERS: 'Orders',
    CREATE_ACC_SIGN_OUT: 'Sign Out',
  },
};

export default withStyles(AccountDrawerBottomLinks, styles);
export { AccountDrawerBottomLinks as AccountDrawerBottomLinksVanilla };
