import React from 'react';
import PropTypes from 'prop-types';
import { ModuleA, ModuleX } from '@tcp/core/src/components/common/molecules';
import Espot from '@tcp/core/src/components/common/molecules/Espot';

const modules = {
  moduleA: ModuleA,
  moduleX: ModuleX,
};

const PromoPDPBanners = ({ promos, navigation }) => {
  const asPath =
    (navigation && navigation.getParam('url') && navigation.getParam('url').split('?cid=')) || [];
  const navAsPath = `${asPath[0]}/${asPath[1]}`;
  return (
    promos &&
    promos.length > 0 &&
    promos.map(promo => {
      const { contentId, moduleName, data: slotData, ...others } = promo;
      const Module = modules[moduleName];
      if (moduleName === 'moduleX') {
        return (
          <Espot
            richTextHtml={promo.richTextList && promo.richTextList[0] && promo.richTextList[0].text}
          />
        );
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

PromoPDPBanners.propTypes = {
  asPath: PropTypes.string,
  promos: PropTypes.shape({}),
};

PromoPDPBanners.defaultProps = {
  asPath: '',
  promos: [],
};

export default PromoPDPBanners;
export { PromoPDPBanners as PromoPDPBannersVanilla };
