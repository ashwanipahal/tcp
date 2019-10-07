import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import AddressOverviewTile from '../../../../common/organism/AddressOverviewTile';
import PaymentOverviewTile from '../../../../common/organism/PaymentOverviewTile';
import ProfileInfoTile from '../../../../common/organism/ProfileInfoTile';
import MyPlaceRewardsOverviewTile from '../../../../common/organism/MyPlaceRewardsOverviewTile';
import MyWalletTile from '../../../../common/organism/MyWalletTile';
import EarnExtraPointsOverview from '../../../../common/organism/EarnExtraPointsOverview';
import OrdersTile from '../../../../common/organism/OrdersTile';

import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountOverviewTileList.style';
import { isCanada } from '../../../../../../../utils';

const componentMap = {
  profileInfoTile: ProfileInfoTile,
  addressOverviewTile: AddressOverviewTile,
  earnExtraPointsOverview: EarnExtraPointsOverview,
  paymentOverviewTile: PaymentOverviewTile,
  myPlaceRewardsOverviewTile: MyPlaceRewardsOverviewTile,
  myWalletTile: MyWalletTile,
  ordersTile: OrdersTile
};

export const COMPONENTS_US = [
  'profileInfoTile',
  'addressOverviewTile',
  'earnExtraPointsOverview',
  'paymentOverviewTile',
  'myPlaceRewardsOverviewTile',
  'myWalletTile',
  'ordersTile'
];
export const COMPONENTS_CA = [
  'profileInfoTile',
  'addressOverviewTile',
  'paymentOverviewTile',
  'myWalletTile',
  'ordersTile'
];

export const AccountOverviewTileList = ({ className, ...otherProps }) => {
  const componentList = isCanada() ? COMPONENTS_CA : COMPONENTS_US;

  return (
    <Row fullBleed className={`${className} elem-pt-LRG`}>
      {componentList.map((componentName, index) => {
        const Component = componentMap[componentName];
        return (
          <Col
            key={componentName}
            colSize={{
              small: 6,
              medium: 4,
              large: 4,
            }}
            ignoreGutter={{
              small: true,
              medium: (index + 1) % 2 === 0,
              large: (index + 1) % 3 === 0,
            }}
            className="overviewCol elem-mb-XL"
          >
            <Component {...otherProps} />
          </Col>
        );
      })}
    </Row>
  );
};

AccountOverviewTileList.propTypes = {
  className: PropTypes.string,
};

AccountOverviewTileList.defaultProps = {
  className: '',
};

export default withStyles(AccountOverviewTileList, styles);
