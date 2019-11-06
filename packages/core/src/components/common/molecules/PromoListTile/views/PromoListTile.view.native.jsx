import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor, Image } from '@tcp/core/src/components/common/atoms';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import endpoints from '@tcp/core/src/components/features/account/common/externalEndpoints';
import { TileWrapper, PromoTileImage } from '../styles/PromoListTile.style.native';

/**
 * DetailedEarnExtraPointsTile component used for show details earn extra points.
 * @param - Received object of waysToEarnRow data
 * @param - Received object of label from cms
 */

const PromoListTile = ({ tileData }) => {
  return (
    <TileWrapper>
      <PromoTileImage>
        <Image url={tileData.image.url} width="60" height="50" />
      </PromoTileImage>
      <BodyCopyWithSpacing
        fontSize="fs16"
        fontFamily="secondary"
        fontWeight="black"
        textAlign="center"
        text={tileData.headLine[0].text}
        spacingStyles="margin-top-MED margin-right-SM margin-bottom-SM margin-left-SM"
      />
      <BodyCopy textAlign="center" fontSize="fs14" text={tileData.subHeadLine[0].text} />
      {tileData.buttonList && (
        <ViewWithSpacing spacingStyles="margin-top-MED margin-bottom-MED">
          <Anchor
            fontSizeVariation="large"
            underline
            noLink
            anchorVariation="primary"
            onPress={() => {
              UrlHandler(endpoints.myPlaceRewardsPage);
            }}
            text={tileData.buttonList[0].text}
          />
        </ViewWithSpacing>
      )}
    </TileWrapper>
  );
};

PromoListTile.propTypes = {
  tileData: PropTypes.shape({}),
};

PromoListTile.defaultProps = {
  tileData: {},
};

export default PromoListTile;
