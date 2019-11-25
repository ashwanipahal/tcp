import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  ModuleA,
  ModuleD,
  ModuleM,
  ModuleQ,
  ModuleX,
} from '@tcp/core/src/components/common/molecules';
import DivisionTabModule from '@tcp/core/src/components/common/molecules/DivisionTabModule';
import OutfitCarouselModule from '@tcp/core/src/components/common/molecules/OutfitCarouselModule';
import JeansModule from '@tcp/core/src/components/common/molecules/JeansModule';
import ModuleG from '@tcp/core/src/components/common/molecules/ModuleG';
import Espot from '@tcp/core/src/components/common/molecules/Espot';

const modules = {
  divisionTabs: DivisionTabModule,
  outfitCarousel: OutfitCarouselModule,
  jeans: JeansModule,
  moduleA: ModuleA,
  moduleD: ModuleD,
  moduleG: ModuleG,
  moduleM: ModuleM,
  moduleQ: ModuleQ,
  moduleX: ModuleX,
};

const userSpecificModuleX = (userType, isPlcc, isLoggedIn) => {
  if (
    (userType === 'plcc' && isPlcc) ||
    (userType === 'mpr' && isLoggedIn) ||
    (userType === 'guest' && !isLoggedIn)
  ) {
    return true;
  }
  return false;
};

const PromoModules = ({ plpTopPromos, navigation, isLoggedIn, isPlcc }) => {
  const asPath =
    (navigation && navigation.getParam('url') && navigation.getParam('url').split('?cid=')) || [];
  const navAsPath = `${asPath[0]}/${asPath[1]}`;
  return (
    plpTopPromos &&
    plpTopPromos.map(promo => {
      const { contentId, moduleName, data: slotData, userType, ...others } = promo;
      const Module = modules[moduleName];
      // This is user specific moduleX - eg. For loyalty Banner on PLP
      if (userType && moduleName === 'moduleX') {
        const isUserSpecificModuleX = userSpecificModuleX(userType, isPlcc, isLoggedIn);
        if (isUserSpecificModuleX) {
          return (
            <Espot
              richTextHtml={
                promo.richTextList && promo.richTextList[0] && promo.richTextList[0].text
              }
            />
          );
        }
        return null;
      }
      return (
        Module &&
        promo && (
          <Module
            key={contentId}
            data={promo}
            asPath={navAsPath}
            navigation={navigation}
            ignoreLazyLoadImage
            {...slotData}
            {...others}
          />
        )
      );
    })
  );
};

PromoModules.propTypes = {
  asPath: PropTypes.string,
  plpTopPromos: PropTypes.shape({}),
};

PromoModules.defaultProps = {
  asPath: '',
  plpTopPromos: [],
};

export default PromoModules;
