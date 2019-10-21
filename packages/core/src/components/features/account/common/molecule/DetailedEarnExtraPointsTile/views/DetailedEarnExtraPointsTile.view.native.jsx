import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import sourceMap from '../../../../ExtraPoints/imageSourceMap';
import {
  TileWrapper,
  EarnPointDesc,
  EarnExtraPointsTileImage,
  ImageSize,
} from '../styles/DetailedEarnExtraPointsTile.style.native';

const colorPalette = createThemeColorPalette();

/**
 * DetailedEarnExtraPointsTile component used for show details earn extra points.
 * @param - Received object of waysToEarnRow data
 * @param - Received object of label from cms
 */

export class DetailedEarnExtraPointsTile extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    handleComponentChange: PropTypes.func,
    onViewActivityDetails: PropTypes.func,
    waysToEarnRow: PropTypes.shape({}),
    viewAll: PropTypes.bool,
  };

  static defaultProps = {
    labels: {},
    handleComponentChange: () => {},
    onViewActivityDetails: () => {},
    waysToEarnRow: {},
    viewAll: false,
  };

  boxWithShadow = {
    shadowColor: colorPalette.gray[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  };

  render() {
    const { waysToEarnRow, viewAll, handleComponentChange, onViewActivityDetails } = this.props;
    return (
      <TileWrapper style={this.boxWithShadow} viewAll>
        <Anchor
          onPress={() =>
            viewAll
              ? onViewActivityDetails(waysToEarnRow)
              : handleComponentChange('earnExtraPointsPageMobile')
          }
        >
          <EarnExtraPointsTileImage viewAll>
            <ImageSize resizeMode="contain" source={sourceMap[waysToEarnRow.activityCode]} />
          </EarnExtraPointsTileImage>
          <ViewWithSpacing spacingStyles="margin-top-LRG">
            <BodyCopy
              component="p"
              fontSize="fs16"
              fontWeight="extrabold"
              color="gray.900"
              fontFamily="secondary"
              textAlign="center"
              text={waysToEarnRow.activityTitle}
              data-locator={`earnExtraPointsActivityTitle_${waysToEarnRow.activityCode}`}
            />
          </ViewWithSpacing>
          <EarnPointDesc viewAll>
            <BodyCopy
              component="p"
              fontSize={`${viewAll ? 'fs14' : 'fs16'}`}
              fontWeight="regular"
              fontFamily="secondary"
              textAlign="center"
              color="gray.900"
              text={waysToEarnRow.description}
              data-locator={`earnExtraPointsDescription_${waysToEarnRow.activityCode}`}
            />
          </EarnPointDesc>
        </Anchor>
      </TileWrapper>
    );
  }
}

export default DetailedEarnExtraPointsTile;
