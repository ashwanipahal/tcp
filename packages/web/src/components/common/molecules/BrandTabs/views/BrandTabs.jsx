import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { identifyBrand, getIconPath, getLocator } from '../../../../../utils';
import { brand } from '../../../../../constants';
import style from '../BrandTabs.style';

const BrandTabs = ({ className, data }) => {
  return (
    <Fragment>
      <div className={className}>
        {data.map(tabData => {
          const { title: alt, class: logoClass, target, url } = tabData;
          let active = false;

          if (logoClass === 'header__brand-tab--tcp' && identifyBrand() === brand.TCP) {
            active = true;
          }
          if (logoClass === 'header__brand-tab-gymboree' && identifyBrand() === brand.GYMBOREE) {
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
                src={getIconPath(logoClass)}
                data-locator={getLocator(logoClass)}
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
