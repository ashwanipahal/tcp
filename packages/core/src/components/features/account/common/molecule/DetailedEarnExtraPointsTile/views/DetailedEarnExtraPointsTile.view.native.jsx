import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import { getAPIConfig } from '@tcp/core/src/utils';
import {
  TileWrapper,
  EarnPointDesc,
  EarnExtraPointsTileImage,
} from '../styles/DetailedEarnExtraPointsTile.style.native';

export class DetailedEarnExtraPointsTile extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    waysToEarnRow: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
    waysToEarnRow: {},
  };

  render() {
    const { waysToEarnRow } = this.props;
    const imageHost = getAPIConfig().assetHost;

    return (
      <View>
        <TileWrapper>
          <EarnExtraPointsTileImage>
            <BodyCopy component="div" className="earnExtraPointsTileImage">
              <Image
                data-locator={`earnExtraPointsImage_${waysToEarnRow.activityCode}`}
                src={`${imageHost}/${waysToEarnRow.iconImage}`}
              />
            </BodyCopy>
          </EarnExtraPointsTileImage>
          <BodyCopy
            component="p"
            fontSize="fs16"
            fontWeight="black"
            fontFamily="secondary"
            textAlign="center"
            text={waysToEarnRow.activityTitle}
            data-locator={`earnExtraPointsActivityTitle_${waysToEarnRow.activityCode}`}
          />
          <EarnPointDesc>
            <BodyCopy
              component="p"
              fontSize="fs16"
              fontWeight="regular"
              fontFamily="secondary"
              textAlign="center"
              text={waysToEarnRow.description}
              data-locator={`earnExtraPointsDescription_${waysToEarnRow.activityCode}`}
            />
          </EarnPointDesc>
        </TileWrapper>
      </View>
    );
  }
}

export default DetailedEarnExtraPointsTile;
