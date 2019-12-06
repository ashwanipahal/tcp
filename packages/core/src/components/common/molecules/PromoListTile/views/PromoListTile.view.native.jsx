import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor, Image } from '@tcp/core/src/components/common/atoms';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

import { TileWrapper, PromoTileImage } from '../styles/PromoListTile.style.native';

/**
 * DetailedEarnExtraPointsTile component used for show details earn extra points.
 * @param - Received object of waysToEarnRow data
 * @param - Received object of label from cms
 */

const ctaHandler = (target, action, navigation, toggleModal) => {
  if (target === '_modal' && action === 'plccModal') {
    navigation.navigate('ApplyNow');
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
  }
};

const PromoListTile = ({ tileData, navigation, toggleModal }) => {
  return (
    <TileWrapper>
      <PromoTileImage>
        <Image url={tileData.image.url} alt="" width="60" height="50" />
      </PromoTileImage>
      <BodyCopyWithSpacing
        fontSize="fs16"
        fontFamily="secondary"
        fontWeight="bold"
        textAlign="center"
        text={tileData.headLine[0].text}
        spacingStyles="margin-top-MED margin-right-SM margin-bottom-SM margin-left-SM"
      />
      <BodyCopy
        textAlign="center"
        fontSize="fs14"
        fontFamily="secondary"
        fontWeight="regular"
        text={tileData.subHeadLine[0].text}
      />
      {tileData.buttonList && (
        <ViewWithSpacing spacingStyles="margin-top-MED margin-bottom-MED">
          <Anchor
            fontFamily="secondary"
            fontWeight="regular"
            fontSizeVariation="large"
            underline
            noLink
            anchorVariation="primary"
            onPress={() => {
              ctaHandler(
                tileData.buttonList[0].target,
                tileData.buttonList[0].action,
                navigation,
                toggleModal
              );
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
  navigation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

PromoListTile.defaultProps = {
  tileData: {},
};

export default PromoListTile;
