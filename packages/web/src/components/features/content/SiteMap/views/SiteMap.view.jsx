import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../SiteMap.style';
import { Heading, Anchor } from '@tcp/core/src/components/common/atoms';

class SiteMap extends React.PureComponent {
  printCurrentLink = (items, level) => {
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

  createLink = (items, level) => {
    return this.printCurrentLink(items, level);
    // return items.category && items.category.length > 0 ? items.map(item => this.createLink(items.category, level + 1)) : null;
  };

  render() {
    // const { siteMapData } = this.props;
    const siteMapData = {content: "The Children Place - Kids Clothes",
    url: "us/c/toddler-boy-clothes",
    categories: [
      {
        href: "us/c/toddler-boy-clothes",
        name: "TODDLER BOY",
        category: []
      },
      {
        href: "us/c/toddler-girl-clothes",
        name: "TODDLER GIRL",
        category: []
      },
      {
        href: "us/c/boys-clothing",
        name: "BOY",
        category: []
      },
      {
        href: "us/c/baby-clothes",
        name: "BABY",
        category: []
      },
      {
        href: "us/c/girls-clothing",
        name: "GIRL",
        category: []
      }]}
    const { content, url, categories } = siteMapData;

    return (
      <div className="site_map_container">
        <div className="site_map_heading_container">
          <Heading component="h5" variant="h5" className="site_map_heading">
            <Anchor className="heading_link" to={url.replace('/c/', '/c?cid=')} asPath={url}>
              {content}
            </Anchor>
          </Heading>
        </div>
        <div className="categories_container">{categories.map((item => this.createLink(item, 1)))}</div>
      </div>
    );
  }
}

SiteMap.propTypes = {};

SiteMap.defaultProps = {};

export default withStyles(errorBoundary(SiteMap), style);
export { SiteMap as SiteMapVanilla };
