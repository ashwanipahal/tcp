import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getViewportInfo } from '@tcp/core/src/utils';
import { Heading, Row, Col, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import PromoLayout from '../PromoLayout';
import { keyboard } from '../../../../../../constants/constants';
import { HideDrawerConsumer } from '../L1NavItem/L1NavItem';
import PromoBadge from '../PromoBadge';
import L3Panel from '../L3Panel';
import style from './L2Panel.style';
import ClickTracker from '../../../../../common/atoms/ClickTracker';

const UNIDENTIFIED_GROUP = 'UNIDENTIFIED_GROUP';
const MAX_ITEMS_IN_COL = 8;
const FOUR_COL = 4;
const TWO_COL = 2;

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

/**
 * This function will return whether the next column after unbxd data is shop by size or not.
 * @param {*} categoryLayout
 */
const isNextColShopBySize = categoryLayout => {
  if (categoryLayout) {
    const [categoryData] = categoryLayout;
    const { name } = categoryData;
    return name === 'shopBySizeTwoColumns';
  }
  return false;
};

const renderL3Panel = (
  hasSubCategories,
  index,
  l3Drawer,
  hideL3Drawer,
  name,
  subCategories,
  { accessibilityLabels, hideL2Drawer, hideL2Nav, closeNav, analyticsData }
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
        analyticsData={analyticsData}
      />
    )
  );
};

const openL3Nav = (id, hasL3, hideL2Nav, openL3Drawer, closeNav, e) => {
  if (!getViewportInfo().isDesktop) {
    openL3Drawer(`l3-drawer-${id.toString()}`, hasL3)(e);
    const drawerElement = document.getElementById('tcp-nav-drawer');
    if (drawerElement) {
      drawerElement.scrollTop = 0;
    }
    if (!hasL3) {
      closeNav();
    }
  } else {
    hideL2Nav();
  }
};

/* Method to close L2Drawer on keydown(ENTER and SPACE) */
const keydownHideL2Drawer = (e, hideL2Drawer) => {
  const { KEY_ENTER, KEY_SPACE } = keyboard;
  if (e.which === KEY_ENTER || e.which === KEY_SPACE) {
    hideL2Drawer(e);
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
    analyticsData,
  }
) => {
  const navHandler = {
    accessibilityLabels,
    hideL2Drawer,
    context,
    closeNav,
    analyticsData,
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
              <ClickTracker
                clickData={{
                  pageNavigationText: `${analyticsData}-${name.toLowerCase()}`,
                }}
              >
                <Anchor
                  asPath={asPath}
                  to={url}
                  onClick={e =>
                    openL3Nav(currentIndex, hasL3, context.hideL2Nav, openL3Drawer, closeNav, e)
                  }
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
              </ClickTracker>
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

/**
 * This function will return the total column used by unbxd data.
 * @param {*} panelData
 */
const getPanelColCount = panelData => {
  let count = 0;
  Object.keys(panelData).map(category => {
    const { items } = panelData[category];
    count += items.length > MAX_ITEMS_IN_COL ? FOUR_COL : TWO_COL;
    return category;
  });
  return count;
};

/**
 * This function will be used create the unbxd columns header.
 * @param {*} label
 * @param {*} hideOnMobileClass
 * @param {*} categoryIndex
 */
const getHeader = (label, hideOnMobileClass, categoryIndex) => {
  return label ? (
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
  );
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
    analyticsData,
  } = props;
  const { previousButton } = accessibilityLabels;
  const isShopBySizeCol = isNextColShopBySize(categoryLayout);
  const panelDataCount = getPanelColCount(panelData);
  let tempPanelDataCount = 0;
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
                  onKeyDown={e => keydownHideL2Drawer(e, hideL2Drawer)}
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
                      const columnClass = firstCol.length && secondCol.length ? 'half-width' : '';
                      // tempPanelDataCount will be used to identify the last unbxd column
                      tempPanelDataCount += items.length > MAX_ITEMS_IN_COL ? FOUR_COL : TWO_COL;
                      const isLastPanelCol = tempPanelDataCount === panelDataCount;
                      // setting tempPanelDataCount to 0 because it will be equal to totalpanel data count and is last column
                      tempPanelDataCount = isLastPanelCol ? 0 : tempPanelDataCount;
                      const hideOnMobileClass =
                        category === UNIDENTIFIED_GROUP ? 's-display-none' : '';
                      const noBorderClass = isLastPanelCol && !isShopBySizeCol ? 'no-border' : '';
                      return (
                        <React.Fragment>
                          <Col
                            colSize={colSize}
                            ignoreNthRule
                            className={`l2-nav-category ${noBorderClass}`}
                          >
                            {getHeader(label, hideOnMobileClass, categoryIndex)}
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
                                analyticsData,
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
                                analyticsData,
                              })}
                            </div>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  <PromoLayout
                    categoryLayout={categoryLayout}
                    l1Index={l1Index}
                    hideL2Nav={context.hideL2Nav}
                    panelColCount={getPanelColCount(panelData)}
                  />
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
  analyticsData: PropTypes.string.isRequired,
};

L2Panel.defaultProps = {
  categoryLayout: [],
  l1Index: 0,
};

export { L2Panel as L2PanelVanilla };
export default withStyles(L2Panel, style);
