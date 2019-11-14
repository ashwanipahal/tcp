import React, { Suspense, lazy, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import useBooleanState from '@tcp/core/src/hooks/useBooleanState';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf/RenderPerf.jsx';
import { PROMOTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import { Col } from '../../../atoms';

const modules = {
  divisionTabs: lazy(() => import('@tcp/core/src/components/common/molecules/DivisionTabModule')),
  outfitCarousel: lazy(() =>
    import('@tcp/core/src/components/common/molecules/OutfitCarouselModule')
  ),
  jeans: lazy(() => import('@tcp/core/src/components/common/molecules/JeansModule')),
  moduleA: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleA')),
  moduleD: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleD')),
  moduleG: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleG')),
  moduleM: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleM')),
  moduleQ: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleQ')),
};

const PromoModules = ({ asPath, plpTopPromos }) => {
  // isMounted state is needed to ensure the <Suspense> only renders client-side
  const [isMounted, setMounted] = useState(false);
  // Set mounted flag on mount
  useEffect(() => {
    setMounted(true);
  }, []);
  // Don't render anything if there are no promos
  if (Array.isArray(plpTopPromos) && plpTopPromos.length === 0) {
    return null;
  }
  return (
    <Col colSize={{ small: 6, medium: 8, desktop: 12 }}>
      {isMounted && (
        <Suspense fallback={null}>
          {plpTopPromos.map(promo => {
            const { contentId, moduleName, data: slotData, ...others } = promo;
            const Module = modules[moduleName];
            return (
              promo &&
              Module && (
                <Module key={contentId} data={promo} asPath={asPath} {...slotData} {...others} />
              )
            );
          })}
          {/* UX timer for when the suspended promos above resolve */}
          <RenderPerf.Measure name={PROMOTION_VISIBLE} />
        </Suspense>
      )}
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

export default PromoModules;
