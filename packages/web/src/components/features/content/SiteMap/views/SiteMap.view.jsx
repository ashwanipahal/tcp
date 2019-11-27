import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../SiteMap.style';
import { Heading, Anchor } from '@tcp/core/src/components/common/atoms';

class SiteMap extends React.PureComponent {

  createLink(items, level) {
      return (
        <Anchor
        className={`Link_level_${level}`}
        to={items.href.replace('/c/', '/c?cid=')}
        asPath={items.href}
      >
        {items.name}
      </Anchor>
      if(items.category && items.category.length > 0)
      {
        return items.map(item => createLink(items.category, level+1));
      }
      )
  }

  render() {
    const { siteMapData } = this.props;
    const { content, url, categories } = siteMapData;

    return (
      <div className="site_map_container">
        <div className="site_map_heading_container">
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
          {categories.map(item = createLink(item, 1))}
        </div>
      </div>
    );
  }
}

SiteMap.propTypes = {};

SiteMap.defaultProps = {};

export default withStyles(errorBoundary(SiteMap), style);
export { SiteMap as SiteMapVanilla };
