import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import config from '../config';
import style from '../BrandTabs.style';

const BrandTabs = ({ className, data }) => (
  <Fragment>
    <div className={className}>
      {data.map(tabData => {
        const { active, alt, logoClass, target, url } = tabData;
        return (
          <Anchor
            className={active ? 'header-topnav__brand-tabs--activeTab' : ''}
            to={url}
            target={target}
            key={tabData.id}
          >
            <Image
              alt={alt}
              className={logoClass}
              src={config.BRAND_TABS[logoClass]}
              data-locator={config.BRAND_TABS.data_locator[logoClass]}
            />
          </Anchor>
        );
      })}
    </div>
  </Fragment>
);

BrandTabs.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ).isRequired,
};

export default withStyles(BrandTabs, style);
export { BrandTabs as BrandTabsVanilla };
