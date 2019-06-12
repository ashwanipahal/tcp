import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Image from '@tcp/core/src/components/common/atoms/Image';
import config from '@tcp/web/config';
import style from '../BrandTabs.style';

const BrandTabs = ({ className, data }) => (
  <Fragment>
    <div className={className}>
      {data.map(tabData => {
        const { active, alt, logoClass, target, title, url } = tabData;
        return (
          <Anchor
            className={active ? 'activeTab' : ''}
            to={url}
            title={title}
            target={target}
            key={tabData.id}
          >
            <Image
              alt={alt}
              className={logoClass}
              src={config.BRAND_TABS[logoClass]}
              title={title}
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
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default withStyles(BrandTabs, style);
export { BrandTabs as BrandTabsVanilla };
