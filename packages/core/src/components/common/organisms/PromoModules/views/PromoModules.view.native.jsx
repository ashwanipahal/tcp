import React from 'react';
import PropTypes from 'prop-types';
import { ModuleA, ModuleD, ModuleM, ModuleQ } from '@tcp/core/src/components/common/molecules';
import DivisionTabModule from '@tcp/core/src/components/common/molecules/DivisionTabModule';
import OutfitCarouselModule from '@tcp/core/src/components/common/molecules/OutfitCarouselModule';
import JeansModule from '@tcp/core/src/components/common/molecules/JeansModule';
import ModuleG from '@tcp/core/src/components/common/molecules/ModuleG';

const modules = {
  divisionTabs: DivisionTabModule,
  outfitCarousel: OutfitCarouselModule,
  jeans: JeansModule,
  moduleA: ModuleA,
  moduleD: ModuleD,
  moduleG: ModuleG,
  moduleM: ModuleM,
  moduleQ: ModuleQ,
};

const PromoModules = ({ categoryPath, plpTopPromos }) => {
  return (
    plpTopPromos &&
    plpTopPromos.map(promo => {
      const { contentId, moduleName, data: slotData, ...others } = promo;
      const Module = modules[moduleName];
      return (
        Module &&
        promo && (
          <Module
            key={contentId}
            data={promo}
            asPath={categoryPath}
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
