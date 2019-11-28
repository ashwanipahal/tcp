import React, { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf/RenderPerf';
import { PROMOTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';

const modules = {
  moduleA: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleA')),
  moduleX: lazy(() => import('@tcp/core/src/components/common/molecules/ModuleX')),
};

const PromoPDPBanners = ({ asPath, promos }) => {
  // isMounted state is needed to ensure the <Suspense> only renders client-side
  // We don't want to render this in SSR (and can't because NextJS will error).
  const [isMounted, setMounted] = useState(false);

  // Set mounted flag on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted ? (
    <Suspense fallback={null}>
      {promos &&
        promos.length &&
        promos.map(promo => {
          const { contentId, moduleName, data: slotData, ...others } = promo;
          const Module = modules[moduleName];
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

PromoPDPBanners.propTypes = {
  asPath: PropTypes.string,
  promos: PropTypes.arrayOf(
    PropTypes.shape({
      // Only including the most important property
      moduleName: PropTypes.string,
    })
  ),
};

PromoPDPBanners.defaultProps = {
  asPath: '',
  promos: [],
};

export default PromoPDPBanners;
