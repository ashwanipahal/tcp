import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Image from '@tcp/core/src/components/common/atoms/Image';
import utils from '@tcp/core/src/utils/utilMethods';
import config from '../config';
import style from '../BrandTabs.style';

const BrandTabs = ({ className, data }) => {
  return (
    <Fragment>
      <div className={className}>
        {data.map(tabData => {
          const { title: alt, class: logoClass, target, url } = tabData;
          let active = false;

          if (logoClass === 'header__brand-tab--tcp' && utils.brand() === 'tcp') {
            active = true;
          }
          if (logoClass === 'header__brand-tab-gymboree' && utils.brand() === 'gymboree') {
            active = true;
          }
          return (
            <Anchor
              className={active ? 'header-topnav__brand-tabs--activeTab' : ''}
              to={url}
              target={target}
              key={logoClass}
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
};

BrandTabs.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ).isRequired,
};

export default withStyles(BrandTabs, style);
export { BrandTabs as BrandTabsVanilla };
