import React, { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf/RenderPerf';
import { PROMOTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';

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
  // We don't want to render this in SSR (and can't because NextJS will error).
  const [isMounted, setMounted] = useState(false);

  // Set mounted flag on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted ? (
    <Suspense fallback={null}>
      {plpTopPromos.map(promo => {
        const { contentId, moduleName, data: slotData, ...others } = promo;
        const Module = modules[moduleName];
        return (
          Module && (
            <Module key={contentId} data={promo} asPath={asPath} {...slotData} {...others} />
          )
        );
      })}
      {/* UX timer for when the lazy promos above resolve */}
      <RenderPerf.Measure name={PROMOTION_VISIBLE} />
    </Suspense>
  ) : null;
};

PromoModules.propTypes = {
  asPath: PropTypes.string,
  plpTopPromos: PropTypes.arrayOf(
    PropTypes.shape({
      // Only including the most important property
      moduleName: PropTypes.string,
    })
  ),
};

PromoModules.defaultProps = {
  asPath: '',
  plpTopPromos: [],
};

export default PromoModules;
