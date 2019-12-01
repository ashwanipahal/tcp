/* istanbul ignore file */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Anchor, BodyCopy, Col, Row } from '@tcp/core/src/components/common/atoms';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../SiteMap.style';

class SiteMap extends React.PureComponent {
  render() {
    const { className, siteMapData } = this.props;
    const { categories, content } = siteMapData;
    return (
      <Row className={`${className} siteMap`}>
        <div className="siteMap_heading-container">
          <BodyCopy
            component="h3"
            className="siteMap_heading"
            fontWeight="semibold"
            fontSize={['fs16', 'fs24']}
            textAlign="center"
            letterSpacing="normal"
          >
            {content}
          </BodyCopy>
        </div>
        <Col
          colSize={{ small: 4, medium: 6, large: 10 }}
          offsetLeft={{ small: 1, medium: 1, large: 1 }}
          offsetRight={{ small: 1, medium: 1, large: 1 }}
        >
          <div className="categories_container">
            {categories &&
              categories.map(({ name, href, category }) => {
                return (
                  name && (
                    <ol className="level-one-container">
                      <BodyCopy
                        component="h4"
                        className="level-one-title"
                        color="gray.900"
                        fontWeight="semibold"
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
                                <ul className="level-two-container">
                                  <BodyCopy
                                    component="h5"
                                    className="level-two-title"
                                    color="gray.900"
                                    fontWeight="semibold"
                                    fontSize="fs16"
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
                                          <li className="level-three-container">
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
  className: PropTypes.string,
  siteMapData: PropTypes.objectOf(PropTypes.shape({})),
};

SiteMap.defaultProps = {
  className: '',
  siteMapData: {},
};

export default withStyles(errorBoundary(SiteMap), style);
export { SiteMap as SiteMapVanilla };
