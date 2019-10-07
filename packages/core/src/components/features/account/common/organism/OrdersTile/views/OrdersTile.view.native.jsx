import React from 'react';
// import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';
// import { withNavigation } from 'react-navigation';
// import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
// import { BodyCopy, Anchor, Button } from '@tcp/core/src/components/common/atoms';
// import { getLabelValue } from '@tcp/core/src/utils';
// import { OrdersTileItem } from '../molecules/OrderTileItem/views/OrdersTileItem.view';
import {
  UnderlineStyle,
  OrdersTileContainer,
  // ButtonWrapperStyle,
  // TouchableLink,
  // BodyCopyStyle,
  // OrdersTypeContainer,
  // LeftContainer,
  // RightContainer,
} from '../styles/OrdersOverviewTile.style.native';
/*
OrdersTile component is used in AccountOverview screen on mobile app
*/
export class OrdersTile extends React.PureComponent<Props> {
  render() {
    return (
      <OrdersTileContainer>
        <BodyCopy fontFamily="secondary" fontSize="fs16" text="Orders Tile Views" color="black" />
        <UnderlineStyle />
      </OrdersTileContainer>
    );
  }
}

export default OrdersTile;
