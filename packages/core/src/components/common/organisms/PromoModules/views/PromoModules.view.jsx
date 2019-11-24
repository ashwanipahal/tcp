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
  moduleX: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleX')),
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

const PromoModules = ({ asPath, plpTopPromos, isLoggedIn, isPlcc }) => {
  // isMounted state is needed to ensure the <Suspense> only renders client-side
  // We don't want to render this in SSR (and can't because NextJS will error).
  const [isMounted, setMounted] = useState(false);

  // Set mounted flag on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted ? (
    <Suspense fallback={null}>
      {plpTopPromos &&
        plpTopPromos.length &&
        plpTopPromos.map(promo => {
          const { contentId, moduleName, userType, data: slotData, ...others } = promo;
          const Module = modules[moduleName];
          // This is user specific moduleX - eg. For loyalty Banner on PLP
          if (userType && moduleName === 'moduleX') {
            const isUserSpecificModuleX = userSpecificModuleX(userType, isPlcc, isLoggedIn);
            if (isUserSpecificModuleX) {
              return (
                Module && (
                  <Module key={contentId} data={promo} asPath={asPath} {...slotData} {...others} />
                )
              );
            }
            return null;
          }
          return (
            Module && (
              <Module
                fullBleed
                key={contentId}
                data={promo}
                asPath={asPath}
                {...slotData}
                {...others}
              />
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
