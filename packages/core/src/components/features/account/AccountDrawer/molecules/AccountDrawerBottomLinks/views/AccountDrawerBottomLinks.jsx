import React from 'react';
import PropTypes from 'prop-types';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { routerPush } from '@tcp/core/src/utils';
import LogOutPageContainer from '../../../../Logout/container/LogOut.container';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerBottomLinks.style';
import Anchor from '../../../../../../common/atoms/Anchor';

const AccountDrawerBottomLinks = props => {
  const { className, labels } = props;

  /**
   * This function will handle click to go to respective links
   * @param {event, link, path} -
   */
  const onLinkRedirect = ({ e, link, path }) => {
    e.preventDefault();
    const { closedOverlay } = props;
    routerPush(link, path);
    closedOverlay();
  };

  return (
    <div className={className}>
      <div className="linksWrapper elem-pl-MED elem-pr-MED">
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            anchorVariation="primary"
            text={getLabelValue(labels, 'CREATE_ACC_MY_FAV')}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            anchorVariation="primary"
            text={getLabelValue(labels, 'CREATE_ACC_MY_PLACE_REWARDS_CC')}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            href="#"
            onClick={e =>
              onLinkRedirect({
                e,
                link: internalEndpoints.myWalletPage.link,
                path: internalEndpoints.myWalletPage.path,
              })
            }
            anchorVariation="primary"
            text={getLabelValue(labels, 'CREATE_ACC_WALLET')}
          />
        </div>
        <div className="elem-pt-MED elem-pb-MED bottomLine">
          <Anchor
            fontSizeVariation="large"
            fontFamily="secondary"
            onClick={e =>
              onLinkRedirect({
                e,
                link: internalEndpoints.myOrderPage.link,
                path: internalEndpoints.myOrderPage.path,
              })
            }
            anchorVariation="primary"
            text={getLabelValue(labels, 'CREATE_ACC_ORDERS')}
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
  closedOverlay: PropTypes.func.isRequired,
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
