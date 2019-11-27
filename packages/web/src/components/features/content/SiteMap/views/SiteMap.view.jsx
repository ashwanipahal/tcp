import React from 'react';
import { PropTypes } from 'prop-types';
import { Heading, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../SiteMap.style';

class SiteMap extends React.PureComponent {
  componentDidMount() {
    const { getSiteMapData, siteMapData } = this.props;
    if (!siteMapData) {
      getSiteMapData();
    }
  }

  createLink = (items, level) => {
    return (
      <Anchor
        className={`Link_level_${level}`}
        to={items.href.replace('/c/', '/c?cid=')}
        asPath={items.href}
      >
        {items.name}
      </Anchor>
    );
  };

  render() {
    const { className } = this.props;
    return (
      <div className={`${className} site_map_container`}>
        Sitemap
        {/* <div className="site_map_heading_container">
          <Heading component="h5" variant="h5" className="site_map_heading">
            <Anchor
              className="heading_link"
              to={url.replace('/c/', '/c?cid=')}
              asPath={url}
            >
              {content}
            </Anchor>
          </Heading>
        </div>
        <div className="categories_container">
          {categories.map(item => createLink(item, 1))}
        </div> */}
      </div>
    );
  }
}

SiteMap.propTypes = {};

SiteMap.defaultProps = {};

export default withStyles(errorBoundary(SiteMap), style);
export { SiteMap as SiteMapVanilla };
