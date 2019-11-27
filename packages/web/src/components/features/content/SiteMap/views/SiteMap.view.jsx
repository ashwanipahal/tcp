import React from 'react';
import { PropTypes } from 'prop-types';
import { Heading, Anchor, BodyCopy, Col, Row } from '@tcp/core/src/components/common/atoms';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../SiteMap.style';

class SiteMap extends React.PureComponent {
  componentDidMount() {
    const { getSiteMapData } = this.props;
    getSiteMapData();
  }

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
    const { className, siteMapData } = this.props;
    const { categories, content, url } = siteMapData;
    return (
      <Row className={`${className} siteMap`}>
        <Col colSize={{ small: 6, medium: 8, large: 10 }} offsetLeft={{ large: 1 }}>
          <div className="siteMap_heading-container">
            <Heading component="h5" variant="h5" className="site_map_heading">
              <Anchor className="heading_link" to={url} asPath={url}>
                {content}
              </Anchor>
            </Heading>
          </div>
          <div className="categories_container">
            {categories.map(item => this.createLink(item, 1))}
          </div>
        </Col>
      </Row>
    );
  }
}

SiteMap.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  content: PropTypes.string,
  url: PropTypes.string,
};

SiteMap.defaultProps = {
  categories: [],
  content: '',
  url: '',
};

export default withStyles(errorBoundary(SiteMap), style);
export { SiteMap as SiteMapVanilla };
