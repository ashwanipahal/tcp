import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import mock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import { getViewportInfo } from '@tcp/core/src/utils';
import { Heading, Row, Col, Anchor, Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { HideDrawerConsumer } from '../L1NavItem/L1NavItem';
import PromoBadge from '../PromoBadge';
import L3Panel from '../L3Panel';
import style from './L2Panel.style';

const UNIDENTIFIED_GROUP = 'UNIDENTIFIED_GROUP';
const MAX_ITEMS_IN_COL = 8;
const FOUR_COL = 4;
const TWO_COL = 2;

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
              dataLocator={`l2_size_btn_${currentIndex}`}
            >
              <BodyCopy className="l2-circle-link">{text}</BodyCopy>
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

const renderArrowIcon = hasSubCategories => {
  return hasSubCategories && <span className="icon-arrow" />;
};

const renderLabel = (classForRedContent, promoBadge, name) => {
  return (
    <span className={`nav-bar-item-label ${classForRedContent} ${!promoBadge ? 'full-width' : ''}`}>
      {name}
    </span>
  );
};

const renderPromoBadge = (promoBadge, currentIndex) => {
  return (
    promoBadge && (
      <span className="nav-bar-item-content" data-locator={`promo_badge_${currentIndex}`}>
        {<PromoBadge data={promoBadge} />}
      </span>
    )
  );
};

const renderL3Panel = (
  hasSubCategories,
  index,
  l3Drawer,
  hideL3Drawer,
  name,
  subCategories,
  { accessibilityLabels, hideL2Drawer, hideL2Nav, closeNav }
) => {
  return (
    hasSubCategories && (
      <L3Panel
        id={`l3-drawer-${index.toString()}`}
        open={l3Drawer && l3Drawer.openDrawer}
        close={l3Drawer && l3Drawer.closeDrawer}
        hideL3Drawer={hideL3Drawer(`l3-drawer-${index.toString()}`)}
        hideL2Drawer={hideL2Drawer}
        hideL2Nav={hideL2Nav}
        name={name}
        links={subCategories}
        accessibilityLabels={accessibilityLabels}
        closeNav={closeNav}
      />
    )
  );
};

const openL3Nav = (id, hasL3, hideL2Nav, openL3Drawer, e) => {
  if (!getViewportInfo().isDesktop) {
    openL3Drawer(`l3-drawer-${id.toString()}`, hasL3)(e);
  } else {
    hideL2Nav();
  }
};

const createLinks = (
  links,
  column,
  categoryIndex,
  {
    openL3Drawer,
    hideL3Drawer,
    l3Drawer,
    className,
    accessibilityLabels,
    hideL2Drawer,
    context,
    closeNav,
  }
) => {
  const navHandler = {
    accessibilityLabels,
    hideL2Drawer,
    context,
    closeNav,
  };
  if (links.length) {
    return (
      <ul className={className}>
        {links.map((l2Links, index) => {
          const {
            url,
            asPath,
            categoryContent: { id, name, mainCategory },
            subCategories,
            hasL3,
          } = l2Links;
          const promoBadge = mainCategory && mainCategory.promoBadge;
          const classForRedContent = id === '505519' ? `highlighted` : ``;
          const currentIndex = column > 1 ? index + MAX_ITEMS_IN_COL : index;
          const hasSubCategories = subCategories && subCategories.length > 0;

          return (
            <li data-locator={`l2_col_${categoryIndex}_link_${currentIndex}`}>
              <Anchor
                asPath={asPath}
                to={url}
                onClick={e => openL3Nav(currentIndex, hasL3, context.hideL2Nav, openL3Drawer, e)}
              >
                <BodyCopy
                  className="l2-nav-link"
                  fontFamily="secondary"
                  fontSize={['fs13', 'fs13', 'fs14']}
                  lineHeight="lh107"
                  color="text.primary"
                >
                  {renderLabel(classForRedContent, promoBadge, name)}
                  {renderPromoBadge(promoBadge, currentIndex)}
                  {renderArrowIcon(hasSubCategories)}
                </BodyCopy>
              </Anchor>
              {renderL3Panel(
                hasSubCategories,
                currentIndex,
                l3Drawer,
                hideL3Drawer,
                name,
                subCategories,
                navHandler
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  return ``;
};

const L2Panel = props => {
  const {
    className,
    panelData,
    categoryLayout,
    name,
    hideL2Drawer,
    l1Index,
    openL3Drawer,
    hideL3Drawer,
    l3Drawer,
    accessibilityLabels,
    closeNav,
  } = props;
  const { previousButton } = accessibilityLabels;

  return (
    <HideDrawerConsumer>
      {context => (
        <React.Fragment>
          <div className="content-wrapper">
            <div data-locator="overrlay_img" className={`${className} nav-bar-l2-panel`}>
              <div className="sizes-range-background">
                <span
                  role="button"
                  aria-label={previousButton}
                  tabIndex={0}
                  className="icon-back"
                  onClick={hideL2Drawer}
                  onKeyDown={hideL2Drawer}
                />
                <span className="l1-label">{name}</span>
              </div>
              <Row className="content-wrapper">
                <Row
                  className="nav-bar-l2-details"
                  tabIndex={0}
                  fullBleed={{
                    small: true,
                    medium: true,
                  }}
                >
                  {Object.keys(panelData)
                    .sort((prevGroup, curGroup) => {
                      return parseInt(prevGroup.order, 10) - parseInt(curGroup.order, 10);
                    })
                    .map((category, categoryIndex) => {
                      const { items, label } = panelData[category];
                      const colSize = {
                        small: 6,
                        medium: 8,
                        large: items.length > MAX_ITEMS_IN_COL ? FOUR_COL : TWO_COL,
                      };
                      const firstCol = items.slice(0, MAX_ITEMS_IN_COL);
                      const secondCol = items.slice(MAX_ITEMS_IN_COL);
                      let columnClass = '';
                      if (firstCol.length && secondCol.length) {
                        columnClass = 'half-width';
                      }
                      const hideOnMobileClass =
                        category === UNIDENTIFIED_GROUP ? 's-display-none' : '';
                      return (
                        <React.Fragment>
                          <Col colSize={colSize} ignoreNthRule className="l2-nav-category">
                            {label ? (
                              <div className="l2-nav-category-header">
                                <Heading
                                  variant="h6"
                                  className={`l2-nav-category-heading ${hideOnMobileClass}`}
                                  dataLocator={`l2_col_heading_${categoryIndex}`}
                                >
                                  {label}
                                </Heading>
                                <span className="l2-nav-category-divider" />
                              </div>
                            ) : (
                              <div className="l2-nav-category-empty-header" />
                            )}
                            <div className="l2-nav-category-links">
                              {createLinks(firstCol, 1, categoryIndex, {
                                openL3Drawer,
                                hideL3Drawer,
                                l3Drawer,
                                className: { columnClass },
                                accessibilityLabels,
                                hideL2Drawer,
                                context,
                                closeNav,
                              })}
                              {createLinks(secondCol, 2, categoryIndex, {
                                openL3Drawer,
                                hideL3Drawer,
                                l3Drawer,
                                className: { columnClass },
                                accessibilityLabels,
                                hideL2Drawer,
                                context,
                                closeNav,
                              })}
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
                                ignoreNthRule
                              >
                                <div className="l2-nav-category-header">
                                  <Heading
                                    variant="h6"
                                    className="l2-nav-category-heading"
                                    dataLocator="l2_col_heading_3"
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
                                ignoreNthRule
                              >
                                {imageBanner.map(({ image, link }) => (
                                  <React.Fragment>
                                    <Anchor
                                      className="l2-image-banner-link"
                                      to={link.url}
                                      title={link.title}
                                      dataLocator={`overlay_img_link_${l1Index}`}
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
              </Row>
            </div>
          </div>
        </React.Fragment>
      )}
    </HideDrawerConsumer>
  );
};

L2Panel.propTypes = {
  className: PropTypes.string.isRequired,
  panelData: PropTypes.shape([]).isRequired,
  categoryLayout: PropTypes.shape([]),
  name: PropTypes.string.isRequired,
  hideL2Drawer: PropTypes.func.isRequired,
  l1Index: PropTypes.number,
  openL3Drawer: PropTypes.func.isRequired,
  hideL3Drawer: PropTypes.func.isRequired,
  closeNav: PropTypes.func.isRequired,
  l3Drawer: PropTypes.shape({}).isRequired,
  accessibilityLabels: PropTypes.shape({}).isRequired,
};

L2Panel.defaultProps = {
  categoryLayout: [],
  l1Index: 0,
};

export { L2Panel as L2PanelVanilla };
export default withStyles(L2Panel, style);
