import React from 'react';
import { PropTypes } from 'prop-types';
import { Anchor, BodyCopy, Col, Row } from '@tcp/core/src/components/common/atoms';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import mock from '@tcp/core/src/services/abstractors/common/sitemap/mock';
import style from '../SiteMap.style';

class SiteMap extends React.PureComponent {
  componentDidMount() {
    const { getSiteMapData } = this.props;
    getSiteMapData();
  }

  printCurrentLink = (items, level) => {
    return (
      <Anchor className={`Link_level_${level}`} to={items.href} asPath={items.href}>
        {items.name}
      </Anchor>
    );
  };

  createLink = (items, level) => {
    return this.printCurrentLink(items, level);
    // return items.category && items.category.length > 0 ? items.map(item => this.createLink(items.category, level + 1)) : null;
  };

  render() {
    const { className } = this.props;
    const { siteMap: siteMapData } = mock;
    const { categories, content } = siteMapData;
    console.log(categories);
    return (
      <Row className={`${className} siteMap`}>
        <Col
          colSize={{ small: 6, medium: 8, large: 10 }}
          offsetLeft={{ large: 1 }}
          offsetRight={{ large: 1 }}
        >
          <div className="siteMap_heading-container">
            <BodyCopy
              component="h3"
              className="siteMap_heading"
              fontWeight="medium"
              fontSize="fs24"
              textAlign="center"
              letterSpacing="normal"
            >
              {content}
            </BodyCopy>
          </div>
          <div className="categories_container">
            {categories &&
              categories.map(({ name, href, category }) => {
                return (
                  name && (
                    <ol className="level-two-container">
                      <BodyCopy
                        component="h4"
                        className="level-two-title"
                        color="gray.900"
                        fontWeight="medium"
                        fontSize="fs16"
                        textAlign="left"
                        letterSpacing="normal"
                      >
                        {href ? (
                          <Anchor to={href} asPath={href}>
                            {name}
                          </Anchor>
                        ) : (
                          name
                        )}
                      </BodyCopy>
                      {category &&
                        category.map(({ name: nameL2, href: hrefL2, category: categoriesL3 }) => {
                          return (
                            nameL2 && (
                              <li>
                                <ul className="level-three-container">
                                  <BodyCopy
                                    component="h5"
                                    className="level-three-title"
                                    color="gray.900"
                                    fontWeight="medium"
                                    fontSize="fs14"
                                    textAlign="left"
                                    letterSpacing="normal"
                                  >
                                    {href ? (
                                      <Anchor to={hrefL2} asPath={hrefL2}>
                                        {nameL2}
                                      </Anchor>
                                    ) : (
                                      nameL2
                                    )}
                                  </BodyCopy>
                                  {categoriesL3 &&
                                    categoriesL3.map(({ name: nameL3, href: hrefL3 }) => {
                                      return (
                                        nameL3 && (
                                          <li>
                                            {href ? (
                                              <Anchor to={hrefL3} asPath={hrefL3}>
                                                {nameL3}
                                              </Anchor>
                                            ) : (
                                              nameL3
                                            )}
                                          </li>
                                        )
                                      );
                                    })}
                                </ul>
                              </li>
                            )
                          );
                        })}
                    </ol>
                  )
                );
              })}
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
