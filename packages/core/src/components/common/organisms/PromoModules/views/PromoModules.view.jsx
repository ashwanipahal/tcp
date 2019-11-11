import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/PromoModules.style';
import { Col } from '../../../atoms';

const defaultResolver = mod => mod.default;

const modules = {
  divisionTabs: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/DivisionTabModule').then(defaultResolver)
  ),
  outfitCarousel: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/OutfitCarouselModule').then(defaultResolver)
  ),
  jeans: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/JeansModule').then(defaultResolver)
  ),
  moduleA: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/ModuleA').then(defaultResolver)
  ),
  moduleD: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/ModuleD').then(defaultResolver)
  ),
  moduleG: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/ModuleG').then(defaultResolver)
  ),
  moduleM: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/ModuleM').then(defaultResolver)
  ),
  moduleQ: dynamic(() =>
    import('@tcp/core/src/components/common/molecules/ModuleQ').then(defaultResolver)
  ),
};

const PromoModules = ({ asPath, plpTopPromos }) => {
  return (
    <Col colSize={{ small: 6, medium: 8, desktop: 12 }}>
      {plpTopPromos &&
        plpTopPromos.map(promo => {
          const { contentId, moduleName, data: slotData, ...others } = promo;
          const Module = modules[moduleName];
          return (
            Module &&
            promo && (
              <Module key={contentId} data={promo} asPath={asPath} {...slotData} {...others} />
            )
          );
        })}
    </Col>
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

export default withStyles(PromoModules, styles);
