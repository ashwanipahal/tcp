import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getScreenWidth } from '@tcp/core/src/utils';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import DetailedEarnExtraPointsTile from '../../../molecule/DetailedEarnExtraPointsTile';
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

class EarnExtraPointsTile extends PureComponent {
  renderView = ({ item, labels }) => {
    return <DetailedEarnExtraPointsTile key={item.id} waysToEarnRow={item} labels={labels} />;
  };

  render() {
    const { labels, waysToEarn } = this.props;

    return (
      <View>
        <EarnExtraPointsHeading>
          <BodyCopy
            component="div"
            fontSize="fs16"
            fontWeight="extrabold"
            fontFamily="secondary"
            text={labels.lbl_common_earnExtraPoints}
            data-locator="earnExtraPointsHeading"
          />
          <Anchor
            fontSizeVariation="medium"
            anchorVariation="primary"
            text={labels.lbl_common_viewAll}
            data-locator="earnExtraPointsViewAll"
            underline
          />
        </EarnExtraPointsHeading>
        <EarnExtraPointsWrapper>
          <View>
            <Carousel
              data={waysToEarn}
              renderItem={this.renderView}
              height={MODULE_HEIGHT}
              width={MODULE_WIDTH}
              variation="show-arrow"
              showDots
              darkArrow
              autoplay={false}
              carouselConfig={{
                enableSnap: false,
                loop: false,
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
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
};

EarnExtraPointsTile.defaultProps = {
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
};

export default EarnExtraPointsTile;
