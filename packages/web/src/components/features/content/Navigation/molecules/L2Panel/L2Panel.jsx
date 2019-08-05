import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import mock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import { Heading, Row, Col, Anchor, Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import PromoBadge from '../PromoBadge';
import style from './L2Panel.style';

const createShopByLinks = (links, column) => {
  return (
    <ul>
      {links.map((link, index) => {
        const { url, text, title, target } = link;
        const currentIndex = column > 1 ? index + 5 : index;
        return (
          <li>
            <Anchor
              to={url}
              title={title}
              target={target}
              data-locator={`l2_size_btn_${currentIndex}`}
            >
              <BodyCopy className="l2-circle-link">{text}</BodyCopy>
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

const createLinks = (links, column, categoryIndex) => {
  if (links.length) {
    return (
      <ul>
        {links.map((l2Links, index) => {
          const {
            categoryContent: { id, name, seoToken, mainCategory },
          } = l2Links;
          const promoBadge = mainCategory && mainCategory.promoBadge;
          const classForRedContent = id === '505519' ? `highlighted` : ``;
          const currentIndex = column > 1 ? index + 7 : index;
          return (
            <Anchor
              to={`/c/${seoToken}`}
              data-locator={`l2_col_${categoryIndex}_link_${currentIndex}`}
            >
              <BodyCopy
                className="l2-nav-link"
                fontFamily="secondary"
                fontSize={['fs13', 'fs13', 'fs14']}
                lineHeight="lh107"
                color="text.primary"
              >
                <span className={`nav-bar-l1-item-label ${classForRedContent}`}>{name}</span>
                <span
                  className="nav-bar-l1-item-content"
                  data-locator={`promo_badge_${currentIndex}`}
                >
                  {(promoBadge && <PromoBadge data={promoBadge} />) || ``}
                </span>
                <span className="icon-arrow" />
              </BodyCopy>
            </Anchor>
          );
        })}
      </ul>
    );
  }
  return ``;
};

const L2Panel = props => {
  const { className, panelData, categoryLayout, order, name, hideL2Drawer, l1Index } = props;

  return (
    <React.Fragment>
      <div data-locator="overrlay_img" className={`${className} nav-bar-l2-panel`}>
        <div className="sizes-rage-background">
          <span
            role="button"
            tabIndex={0}
            className="icon-back"
            onClick={hideL2Drawer}
            onKeyDown={hideL2Drawer}
          />
          <span className="l1-label">{name}</span>
        </div>
        <Row
          className="nav-bar-l2-details"
          tabIndex={0}
          fullBleed={{
            small: true,
            medium: true,
          }}
        >
          {order.map((category, categoryIndex) => {
            const colSize = {
              small: 6,
              medium: 8,
              large: panelData[category].length > 7 ? 4 : 2,
            };
            const firstCol = panelData[category].slice(0, 7);
            const secondCol = panelData[category].slice(7);
            const hideOnMobileClass = category === 'Lorem Ipsum' ? 's-display-none' : '';
            return (
              <React.Fragment>
                <Col colSize={colSize} className="l2-nav-category">
                  <div className="l2-nav-category-header">
                    <Heading
                      variant="h6"
                      className={`l2-nav-category-heading ${hideOnMobileClass}`}
                      data-locator={`l2_col_heading_${categoryIndex}`}
                    >
                      {category}
                    </Heading>
                    <span className="l2-nav-category-divider" />
                  </div>
                  <div className="l2-nav-category-links">
                    {createLinks(firstCol, 1, categoryIndex)}
                    {createLinks(secondCol, 2, categoryIndex)}
                  </div>
                </Col>
              </React.Fragment>
            );
          })}
          {categoryLayout &&
            categoryLayout.map(({ columns }) =>
              columns.map(({ imageBanner, shopBySize }) => {
                const shopBySizeCol1 = mock.shopBySizeMockData.slice(0, 5);
                const shopBySizeCol2 = mock.shopBySizeMockData.slice(5);
                return (
                  <React.Fragment>
                    {shopBySize && (
                      <Col
                        className="l2-nav-category shop-by-size-category"
                        colSize={{
                          small: 6,
                          medium: 8,
                          large: 2,
                        }}
                      >
                        <div className="l2-nav-category-header">
                          <Heading
                            variant="h6"
                            className="l2-nav-category-heading"
                            data-locator="l2_col_heading_3"
                          >
                            Shop By Size
                          </Heading>
                          <span className="l2-nav-category-divider" />
                        </div>
                        <div className="shop-by-size-links">
                          {createShopByLinks(shopBySizeCol1, 1)}
                          {createShopByLinks(shopBySizeCol2, 2)}
                        </div>
                      </Col>
                    )}
                    {imageBanner && (
                      <Col
                        className="l2-image-banner"
                        colSize={{
                          small: 6,
                          medium: 8,
                          large: 2,
                        }}
                      >
                        {imageBanner.map(({ image, link }) => (
                          <React.Fragment>
                            <Anchor
                              className="l2-image-banner-link"
                              to={link.url}
                              title={link.title}
                              data-locator={`overlay_img_link_${l1Index}`}
                              target={link.target}
                            >
                              <Image
                                className="l2-image-banner-image"
                                data-locator={`overlay_img_${l1Index}`}
                                {...image}
                              />
                              <BodyCopy
                                className="l2-nav-link"
                                fontFamily="secondary"
                                fontSize={['fs13', 'fs13', 'fs14']}
                                lineHeight="lh107"
                                color="text.primary"
                                textAlign="center"
                              >
                                <span className="nav-bar-l1-item-label">{link.text}</span>
                                <span className="icon-arrow" />
                              </BodyCopy>
                            </Anchor>
                          </React.Fragment>
                        ))}
                      </Col>
                    )}
                  </React.Fragment>
                );
              })
            )}
        </Row>
      </div>
    </React.Fragment>
  );
};

L2Panel.propTypes = {
  className: PropTypes.string.isRequired,
  panelData: PropTypes.shape([]).isRequired,
  order: PropTypes.shape([]).isRequired,
  categoryLayout: PropTypes.shape([]),
  name: PropTypes.string.isRequired,
  hideL2Drawer: PropTypes.func.isRequired,
  l1Index: PropTypes.number,
};

L2Panel.defaultProps = {
  categoryLayout: [],
  l1Index: 0,
};

export { L2Panel as L2PanelVanilla };
export default withStyles(L2Panel, style);
