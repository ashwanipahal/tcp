import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getScreenWidth, getLabelValue } from '@tcp/core/src/utils';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import DetailedEarnExtraPointsTile from '../../../molecule/DetailedEarnExtraPointsTile';

/**
 * used style component for give style to EarnExtraPointsTile component
 */

import {
  EarnExtraPointsHeading,
  EarnExtraPointsWrapper,
} from '../styles/EarnExtraPointsTile.style.native';

/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = 220;
const MODULE_WIDTH = getScreenWidth() - 30;

/**
 * Module width on Account Overview Tile
 */
const MODULE_WIDTH_ACCOUNT = getScreenWidth() - 80;

/**
 * @component EarnExtraPointsTile for Native view
 *  The EarnExtraPointsTile child component used for provide Carousel view with tiles data
 */

class EarnExtraPointsTile extends PureComponent {
  /**
   * @renderView function used for provide view data for carousel
   */

  renderView = ({ item }) => {
    const { labels, ...otherProps } = this.props;
    return (
      <DetailedEarnExtraPointsTile
        key={item.id}
        waysToEarnRow={item}
        labels={labels}
        {...otherProps}
      />
    );
  };

  render() {
    const { labels, waysToEarn, handleComponentChange, isAccountOverview } = this.props;

    return (
      <View>
        {!isAccountOverview && (
          <EarnExtraPointsHeading>
            <BodyCopy
              component="div"
              fontSize="fs16"
              fontWeight="extrabold"
              fontFamily="secondary"
              text={getLabelValue(labels, 'lbl_common_earnExtraPoints')}
              data-locator="earnExtraPointsHeading"
            />
            <Anchor
              fontSizeVariation="medium"
              anchorVariation="primary"
              text={getLabelValue(labels, 'lbl_common_viewAll')}
              data-locator="earnExtraPointsViewAll"
              onPress={() => handleComponentChange('earnExtraPointsPageMobile')}
              underline
            />
          </EarnExtraPointsHeading>
        )}
        <EarnExtraPointsWrapper>
          <View>
            <Carousel
              data={waysToEarn}
              renderItem={this.renderView}
              height={MODULE_HEIGHT}
              width={!isAccountOverview ? MODULE_WIDTH : MODULE_WIDTH_ACCOUNT}
              variation="show-arrow"
              showDots
              darkArrow
              autoplay={false}
              options={{
                enableSnap: true,
                loop: false,
                autoplay: false,
              }}
            />
          </View>
        </EarnExtraPointsWrapper>
      </View>
    );
  }
}

EarnExtraPointsTile.propTypes = {
  waysToEarn: PropTypes.shape([]),
  handleComponentChange: PropTypes.func,
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
  isAccountOverview: PropTypes.bool,
};

EarnExtraPointsTile.defaultProps = {
  waysToEarn: [],
  handleComponentChange: () => {},
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
  isAccountOverview: false,
};

export default EarnExtraPointsTile;
