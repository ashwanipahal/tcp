import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import { isGymboree, isTCP, getIconPath, getLocator } from '@tcp/core/src/utils';
import style from '../BrandTabs.style';

const BrandTabs = ({ className, data, tcpBrandName, gymBrandName }) => {
  return (
    <Fragment>
      <div className={className}>
        {data.map(tabData => {
          const { class: logoClass, target, url } = tabData;
          let active = false;

          if (logoClass === 'header__brand-tab--tcp' && isTCP()) {
            active = true;
          }
          if (logoClass === 'header__brand-tab-gymboree' && isGymboree()) {
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
                alt={logoClass === 'header__brand-tab--tcp' ? tcpBrandName : gymBrandName}
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
  tcpBrandName: PropTypes.string.isRequired,
  gymBrandName: PropTypes.string.isRequired,
};

export default withStyles(errorBoundary(BrandTabs), style);
export { BrandTabs as BrandTabsVanilla };
