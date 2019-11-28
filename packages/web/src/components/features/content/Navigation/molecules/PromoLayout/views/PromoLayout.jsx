import React from 'react';
import PropTypes from 'prop-types';
import { configureInternalNavigationFromCMSUrl, getViewportInfo } from '@tcp/core/src/utils';
import { Heading, Col, Anchor, BodyCopy, DamImage } from '@tcp/core/src/components/common/atoms';
import { StyledPromoBanner } from '../PromoLayout.style';

import { imageConfig, colStructure } from '../PromoLayout.config';

/**
 * This function will be used to create the shop by size link.
 * @param {*} links
 * @param {*} column
 * @param {*} hideL2Nav
 */
const createShopByLinks = (links, column, hideL2Nav) => {
  return (
    <ul>
      {links.map((link, index) => {
        const { url, text, title, target } = link;
        const to = configureInternalNavigationFromCMSUrl(url);
        const currentIndex = column > 1 ? index + 5 : index;
        return (
          <li>
            <Anchor
              to={to}
              asPath={url}
              title={title}
              target={target}
              dataLocator={`l2_size_btn_${currentIndex}`}
              onClick={() => hideL2Nav()}
            >
              <BodyCopy className="l2-circle-link">{text}</BodyCopy>
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

/**
 * This function will be used to create the image banner.
 * @param {*} imageBanner
 * @param {*} l1Index
 * @param {*} categoryLayoutColName
 * @param {*} colSize
 * @param {*} colIndex
 * @param {*} hideL2Nav
 */
const createImgBanner = (
  imageBanner,
  l1Index,
  categoryLayoutColName,
  colSize,
  colIndex,
  hideL2Nav
) => {
  const imgBannerLength = imageBanner ? imageBanner.length : 0;
  const colProps = colStructure[categoryLayoutColName];
  let imgConfig = imageConfig['one-col-img'];
  if (imageConfig[colProps.imgClass] && colIndex === 0) {
    imgConfig = imageConfig[colProps.imgClass];
  } else if (imgBannerLength > 1) {
    imgConfig = imageConfig['half-img'];
  }
  return (
    imageBanner && (
      <Col
        className="l2-image-banner"
        colSize={{
          small: 6,
          medium: 8,
          large: colSize || 2,
        }}
        ignoreNthRule
      >
        {imageBanner.map(({ image, link }, index) => (
          <React.Fragment>
            <Anchor
              className="l2-image-banner-link"
              to={configureInternalNavigationFromCMSUrl(link.url)}
              asPath={link.url}
              title={link.title}
              dataLocator={`overlay_img_link_${l1Index}`}
              target={link.target}
              onClick={() => hideL2Nav()}
            >
              <DamImage
                imgData={image}
                data-locator={`overlay_img_${l1Index}`}
                imgConfigs={imgConfig.crops}
                className="l2-image-banner-image"
              />

              <BodyCopy
                className={`l2-nav-link ${
                  imgBannerLength > 1 && index === 0 ? 'l2-nav-split-nav-link' : ''
                }`}
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
    )
  );
};
/**
 * This function will be used to create the promo banner.
 * @param {*} textBanner
 * @param {*} l1Index
 * @param {*} hideL2Nav
 */
const createPromoBanner = (textBanner, l1Index, hideL2Nav) => {
  const isSplitView = textBanner && textBanner.length > 1;
  const textContainerClassName = isSplitView ? 'l2-half-promo-box' : '';
  const promoHalfClass = isSplitView ? 'promo-banner-half' : '';
  const arrowContainerClassName = isSplitView ? 'l2-nav-split-nav-link promo-box-link' : '';
  const showBanner = false;
  return (
    showBanner && (
      <Col
        className="l2-promo-box-wrapper"
        colSize={{
          small: 6,
          medium: 8,
          large: 2,
        }}
        ignoreNthRule
      >
        {textBanner.map((item, index) => {
          const { link, set } = item;
          const borderColorClass = set && set[0] ? set[0].val : 'border-pink';
          const promoTextColorClass = set && set[1] ? set[1].val : 'text-pink';
          return (
            <React.Fragment>
              <Anchor
                className="l2-image-banner-link"
                to={configureInternalNavigationFromCMSUrl(link.url)}
                asPath={link.url}
                title={link.title}
                dataLocator={`overlay_img_link_${l1Index}`}
                target={link.target}
                onClick={() => hideL2Nav()}
              >
                <div className={`l2-promo-box ${textContainerClassName} ${borderColorClass}`}>
                  <StyledPromoBanner
                    promoBanner={textBanner}
                    className={`promoBanner ${promoTextColorClass} ${promoHalfClass}`}
                  />
                </div>
                <BodyCopy
                  className={`l2-nav-link ${index === 0 ? arrowContainerClassName : ''}`}
                  fontFamily="secondary"
                  fontSize={['fs13', 'fs13', 'fs14']}
                  color="text.primary"
                  textAlign="right"
                >
                  <span className="nav-bar-l1-item-label">{link.text}</span>
                  <span className="icon-arrow" />
                </BodyCopy>
              </Anchor>
            </React.Fragment>
          );
        })}
      </Col>
    )
  );
};
/**
 * This function will be used to create the shop by size column.
 * @param {*} shopBySize
 * @param {*} hideL2Nav
 * @param {*} categoryLayoutColName
 * @param {*} colSize
 */
const createShopBySize = (shopBySize, hideL2Nav, categoryLayoutColName, colSize) => {
  const sizes = shopBySize ? shopBySize[0] : {};
  const shopBySizeCol1 = shopBySize ? sizes.linkList.slice(0, 5) : [];
  const shopBySizeCol2 = shopBySize ? sizes.linkList.slice(5) : [];
  return (
    shopBySize && (
      <Col
        className="l2-nav-category shop-by-size-category"
        colSize={{
          small: 6,
          medium: 8,
          large: colSize || 2,
        }}
        ignoreNthRule
      >
        <div className="l2-nav-category-header">
          <Heading variant="h6" className="l2-nav-category-heading" dataLocator="l2_col_heading_3">
            {shopBySize ? sizes.text.text : ''}
          </Heading>
          <span className="l2-nav-category-divider" />
        </div>
        <div className="shop-by-size-links">
          {createShopByLinks(shopBySizeCol1, 1, hideL2Nav)}
          {createShopByLinks(shopBySizeCol2, 2, hideL2Nav)}
        </div>
      </Col>
    )
  );
};

/**
 * This function will be used to render imagebanner, promo banner and shop by size columns.
 * @param {*} columns
 * @param {*} l1Index
 * @param {*} hideL2Nav
 * @param {*} categoryLayoutColName
 * @param {*} panelColCount
 */

const createCategoryCol = (columns, l1Index, hideL2Nav, categoryLayoutColName, panelColCount) => {
  let totalCount = panelColCount;
  const isDesktopView = getViewportInfo().isDesktop;
  const colProps = colStructure[categoryLayoutColName];
  return columns.map(({ imageBanner, shopBySize, textBanner }, colIndex) => {
    const colSize = colProps && colProps.col[colIndex] ? colProps.col[colIndex] : 2;
    totalCount += colSize;
    const createElem = isDesktopView ? totalCount <= 12 : true;
    if (!createElem) {
      return null;
    }
    return (
      <React.Fragment>
        {shopBySize
          ? createShopBySize(shopBySize, hideL2Nav, categoryLayoutColName, colSize)
          : null}
        {imageBanner
          ? createImgBanner(
              imageBanner,
              l1Index,
              categoryLayoutColName,
              colSize,
              colIndex,
              hideL2Nav
            )
          : null}
        {textBanner ? createPromoBanner(textBanner, l1Index, hideL2Nav) : null}
      </React.Fragment>
    );
  });
};

/**
 * This component will render the promo layout section
 * @param {*} props
 */
const PromoLayout = props => {
  const { categoryLayout, l1Index, hideL2Nav, panelColCount } = props;
  return (
    <React.Fragment>
      {categoryLayout &&
        categoryLayout.map(({ columns, name }) =>
          createCategoryCol(columns, l1Index, hideL2Nav, name, panelColCount)
        )}
    </React.Fragment>
  );
};

PromoLayout.propTypes = {
  categoryLayout: PropTypes.shape([]),
  l1Index: PropTypes.number,
  hideL2Nav: PropTypes.func.isRequired,
  panelColCount: PropTypes.number.isRequired,
};

PromoLayout.defaultProps = {
  categoryLayout: [],
  l1Index: 0,
};

export { PromoLayout as PromoLayoutVanilla };
export default PromoLayout;
