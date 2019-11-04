import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { configureInternalNavigationFromCMSUrl } from '@tcp/core/src/utils';
import { Heading, Col, Anchor, Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../CategoryLayout.style';

const colStructure = {
  shopBySizeTwoColumns: { col: [2, 2], imgClass: '' },
  oneColumns: { col: [6], imgClass: 'three-col-img' },
  threeColumns: { col: [2, 2, 2], imgClass: '' },
  twoColumns67by33: { col: [4, 2], imgClass: 'two-col-img' },
};

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

const createImgBanner = (imageBanner, l1Index, categoryLayoutColName, colIndex) => {
  const imgBannerLength = imageBanner ? imageBanner.length : 0;
  const colProps = colStructure[categoryLayoutColName];
  const imgClassName = `${imgBannerLength > 1 ? 'half-img' : ''} ${
    colProps ? colProps.imgClass : ''
  }`;
  return (
    imageBanner && (
      <Col
        className="l2-image-banner"
        colSize={{
          small: 6,
          medium: 8,
          large: colProps[colIndex] ? colProps[colIndex].col : 2,
        }}
        ignoreNthRule
      >
        {imageBanner.map(({ image, link }, index) => (
          <React.Fragment>
            <Anchor
              className="l2-image-banner-link"
              to={link.url}
              title={link.title}
              dataLocator={`overlay_img_link_${l1Index}`}
              target={link.target}
            >
              <Image
                className={`l2-image-banner-image ${imgClassName}`}
                data-locator={`overlay_img_${l1Index}`}
                {...image}
              />
              <BodyCopy
                className={`l2-nav-link ${
                  imgBannerLength > 1 && index === 0 ? 'half-img-link' : ''
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

const createShopBySize = (shopBySize, hideL2Nav, categoryLayoutColName, colIndex) => {
  const sizes = shopBySize ? shopBySize[0] : {};
  const shopBySizeCol1 = shopBySize ? sizes.linkList.slice(0, 5) : [];
  const shopBySizeCol2 = shopBySize ? sizes.linkList.slice(5) : [];
  const colProps = colStructure[categoryLayoutColName];
  return (
    shopBySize && (
      <Col
        className="l2-nav-category shop-by-size-category"
        colSize={{
          small: 6,
          medium: 8,
          large: colProps[colIndex] ? colProps[colIndex].col : 2,
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

const createShopBySizeCol = (columns, l1Index, hideL2Nav, categoryLayoutColName) => {
  return columns.map(({ imageBanner, shopBySize }, colIndex) => {
    return (
      <React.Fragment>
        {createShopBySize(shopBySize, hideL2Nav, categoryLayoutColName, colIndex)}
        {createImgBanner(imageBanner, l1Index, categoryLayoutColName, colIndex)}
      </React.Fragment>
    );
  });
};

const CategoryLayout = props => {
  const { categoryLayout, l1Index, hideL2Nav } = props;
  console.log(categoryLayout);
  return (
    <React.Fragment>
      {categoryLayout &&
        categoryLayout.map(({ columns, name }) =>
          createShopBySizeCol(columns, l1Index, hideL2Nav, name)
        )}
    </React.Fragment>
  );
};

CategoryLayout.propTypes = {
  categoryLayout: PropTypes.shape([]),
  l1Index: PropTypes.number,
  hideL2Nav: PropTypes.func.isRequired,
};

CategoryLayout.defaultProps = {
  categoryLayout: [],
  l1Index: 0,
};

export { CategoryLayout as CategoryLayoutVanilla };
export default withStyles(CategoryLayout, style);
