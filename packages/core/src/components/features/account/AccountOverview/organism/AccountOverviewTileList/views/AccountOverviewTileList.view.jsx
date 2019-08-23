import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import AddressOverviewTile from '../../../../common/organism/AddressOverviewTile';
import PaymentOverviewTile from '../../../../common/organism/PaymentOverviewTile';
import MyPlaceRewardsOverviewTile from '../../../../common/organism/MyPlaceRewardsOverviewTile';
import MyWalletTile from '../../../../common/organism/MyWalletTile';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountOverviewTileList.style';
import { isCanada } from '../../../../../../../utils';

export const AccountOverviewTileList = ({ className, ...otherProps }) => {
  const isCA = isCanada();
  return (
    <Row fullBleed className={`${className} elem-pt-LRG`}>
      <Col
        colSize={{
          small: 6,
          medium: 4,
          large: 4,
        }}
        ignoreGutter={{
          small: true,
        }}
        className="overviewCol elem-mb-XL"
      >
        <AddressOverviewTile {...otherProps} />
      </Col>
      <Col
        colSize={{
          small: 6,
          medium: 4,
          large: 4,
        }}
        ignoreGutter={{
          small: true,
        }}
        className="overviewCol elem-mb-XL"
      >
        <PaymentOverviewTile {...otherProps} />
      </Col>
      {!isCA && (
        <Col
          colSize={{
            small: 6,
            medium: 4,
            large: 4,
          }}
          ignoreGutter={{
            large: true,
            small: true,
          }}
          className="overviewCol elem-mb-XL"
        >
          <MyPlaceRewardsOverviewTile {...otherProps} />
        </Col>
      )}
      <Col
        colSize={{
          small: 6,
          medium: 4,
          large: 4,
        }}
        ignoreGutter={{
          small: true,
        }}
        className="overviewCol elem-mb-XL"
      >
        <MyWalletTile {...otherProps} />
      </Col>
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
