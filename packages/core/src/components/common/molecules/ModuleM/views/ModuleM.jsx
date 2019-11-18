import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { getViewportInfo, isClient } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import { Anchor, Col, DamImage, Row, BodyCopy, Button } from '../../../atoms';
import { getLocator, isGymboree } from '../../../../../utils';
import { Grid, LinkText, PromoBanner } from '../..';
import style, { ImageGrid, CtaButtonWrapper, ImageRoundFlex } from '../styles/ModuleM.style';
import config from '../moduleM.config';

/**
 * @class ModuleM - global reusable component will display display a featured
 * category module with category links and featured product images
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText the list of data for header
 * @param {promoBanner} promoBanner promo banner data
 * @param {divTabs} divTabs division tabs data
 */
export class ModuleM extends React.PureComponent {
  constructor(props) {
    super(props);
    const viewportInfo = isClient() ? getViewportInfo() : null;
    this.state = {
      isMobile: viewportInfo && viewportInfo.isMobile,
      isTablet: viewportInfo && viewportInfo.isTablet,
      productCategoryImageList: [],
      singleCTAButton: {},
      activeTab: 'tablList-0',
    };
    this.gridImageRef = React.createRef();
  }

  componentDidMount() {
    const { divTabs } = this.props;
    window.addEventListener('resize', throttle(this.windowResizeEventHandler.bind(this), 500));
    this.setState({
      productCategoryImageList: divTabs[0].smallCompImage,
      singleCTAButton: divTabs[0].linkClass,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeEventHandler.bind(this));
  }

  /**
   * Set state based on view port.
   */
  windowResizeEventHandler = () => {
    const viewportInfo = isClient() ? getViewportInfo() : null;
    this.setState({
      isMobile: viewportInfo && viewportInfo.isMobile,
      isTablet: viewportInfo && viewportInfo.isTablet,
    });
  };

  /**
   * Returns module header
   */
  getHeaderText = headerText => {
    return (
      <div className="promo-header-wrapper">
        <LinkText
          component="div"
          headerText={headerText}
          className="promo-header"
          dataLocator={getLocator('moduleM_header_text')}
        />
      </div>
    );
  };

  /**
   * Returns promo banner for module
   */
  getPromoBanner = promoBanner => {
    return (
      promoBanner && (
        <PromoBanner
          promoBanner={promoBanner}
          className="promoBanner"
          dataLocator={getLocator('moduleM_promobanner_text')}
        />
      )
    );
  };

  /**
   * Returns viewport keys ie. sm|md|lg
   */
  getViewportKey = () => {
    let gutterViewportKey;
    const { isMobile, isTablet } = this.state;
    if (isMobile) gutterViewportKey = 'sm';
    else if (isTablet) gutterViewportKey = 'md';
    else gutterViewportKey = 'lg';

    return gutterViewportKey;
  };

  /**
   *  Renders image grid for tab item
   */
  getProductImageGrid = selectedProductList => {
    const { singleCTAButton } = this.state;
    const viewportKey = this.getViewportKey();
    const imageData = config[`images${selectedProductList.length}`];
    const rowMaxImages = imageData ? imageData.rowMaxImages[viewportKey] : 0;
    let rowFirstElement = 0;
    let rowLastElement = rowMaxImages - 1;
    let rows = 1;

    return (
      <Row className="image-items-container" noLastMargin>
        {selectedProductList &&
          selectedProductList.map((productItem, index) => {
            const { image, link } = productItem;
            /**
             * Calculate each row first element and last element and apply margin left and right respectively.
             */
            if (index + 1 === rowMaxImages * rows) {
              rows += 1;
              rowLastElement = index;
            }

            if (index === rowLastElement + 1) {
              rowFirstElement = index;
            }

            return (
              <ImageGrid
                colSize={imageData.colSize}
                length={selectedProductList.length}
                offsetLeft={index === rowFirstElement ? imageData.offsetLeft : {}}
                offsetRight={rowLastElement === index ? imageData.offsetRight : {}}
                ignoreNthRule
                ignoreGutter={
                  rowLastElement === index ? { large: true, medium: true, small: true } : {}
                }
              >
                <Anchor
                  to={link.url}
                  asPath={link.url}
                  dataLocator={`${getLocator('moduleM_product_image')}${index}`}
                >
                  <div ref={this.gridImageRef} className="moduleM__productImage">
                    <DamImage
                      imgConfigs={config.IMG_DATA.productImgConfig}
                      imgData={image}
                      link={link}
                    />
                  </div>
                  <BodyCopy
                    component="div"
                    className="moduleM__productName"
                    fontSize="fs15"
                    color="text.primary"
                    fontFamily="primary"
                  >
                    {link.text}
                  </BodyCopy>
                </Anchor>
              </ImageGrid>
            );
          })}
        {singleCTAButton && selectedProductList.length > 0 && (
          <CtaButtonWrapper
            length={selectedProductList.length}
            colSize={config[`images${selectedProductList.length}`].colSize}
            ignoreNthRule
            offsetRight={imageData.offsetRight}
            ignoreGutter={{ large: true, medium: true, small: true }}
            isNotInlineBlock
            className="moduleM__gridButton"
          >
            <Anchor
              to={singleCTAButton.url}
              asPath={singleCTAButton.url}
              title={singleCTAButton.text}
              dataLocator={`${getLocator('moduleM_shopAllBtn')}`}
              className="moduleM__shopAllBtn"
            >
              {singleCTAButton.text}
            </Anchor>
          </CtaButtonWrapper>
        )}
      </Row>
    );
  };

  /**
   *  Renders flex image grid for tab item
   */
  getProductImageFlex = selectedProductList => {
    const { singleCTAButton } = this.state;
    return (
      <div className="image-items-container__flex">
        {selectedProductList &&
          selectedProductList.map((product, index) => {
            const { link, image } = product;
            return (
              <div className="image-items-container__flex--item">
                <Anchor
                  to={link.url}
                  asPath={link.url}
                  dataLocator={`${getLocator('moduleM_product_image')}${index}`}
                >
                  <DamImage
                    imgConfigs={config.IMG_DATA.productImgConfig}
                    imgData={image}
                    link={link}
                  />
                  <BodyCopy
                    component="div"
                    className="moduleM__productName"
                    fontSize="fs15"
                    color="text.primary"
                    fontFamily="secondary"
                  >
                    {link.text}
                  </BodyCopy>
                </Anchor>
              </div>
            );
          })}
        {singleCTAButton ? (
          <div className="moduleM__shopAllBtnWrapper">
            <Anchor
              to={singleCTAButton.url}
              asPath={singleCTAButton.url}
              title={singleCTAButton.tex}
              dataLocator={`${getLocator('moduleM_shopAllBtn')}`}
              className="moduleM__shopAllBtn"
            >
              {singleCTAButton.text}
            </Anchor>
          </div>
        ) : null}
      </div>
    );
  };

  /**
   *  Renders image grid for tab item
   *  specific for Gymboree
   */
  getCategoryImageList = selectedProductList => {
    return (
      selectedProductList && (
        <div className="image-items-container-category">
          {selectedProductList &&
            selectedProductList.map((productItem, index) => {
              const { image, link } = productItem;
              return (
                <ImageRoundFlex className="imagecategory__list">
                  <Anchor
                    to={link.url}
                    asPath={link.url}
                    dataLocator={`${getLocator('moduleM_product_image')}${index}`}
                  >
                    <DamImage
                      imgConfigs={config.IMG_DATA.productImgConfig}
                      imgData={image}
                      link={link}
                    />
                    <BodyCopy
                      component="div"
                      className="moduleM__productName"
                      fontSize="fs15"
                      color="text.primary"
                      fontFamily="secondary"
                    >
                      {link.text}
                    </BodyCopy>
                  </Anchor>
                </ImageRoundFlex>
              );
            })}
        </div>
      )
    );
  };

  /**
   *  Returns type of grid item
   */
  getProductImageList = (flexbox, list) =>
    parseInt(flexbox, 10) ? this.getProductImageFlex(list) : this.getProductImageGrid(list);

  onTabChange = (id, imageList, linkClass) => {
    this.setState({
      productCategoryImageList: imageList,
      singleCTAButton: linkClass,
      activeTab: id,
    });
  };

  /**
   *  Render button tab list
   */
  createProductTabList = tabList => {
    return (
      tabList &&
      tabList.map(list => {
        const { text: listItemText, smallCompImage, linkClass, id } = list;
        const { activeTab } = this.state;
        return (
          <div
            key={`modMTabs-${listItemText.text}`}
            className="product-tab-list__item"
            data-locator=""
          >
            <Button
              active={id === activeTab}
              buttonVariation="mini-nav"
              onClick={() => this.onTabChange(id, smallCompImage, linkClass)}
            >
              {listItemText.text}
            </Button>
          </div>
        );
      })
    );
  };

  /**
   *  Creates button tab list data
   */
  createTabList = tabList =>
    tabList.map((list, index) => Object.assign({}, list, { id: `tablList-${index}` }));

  render() {
    const { className, headerText, promoBanner, divTabs, flexbox } = this.props;
    const { productCategoryImageList } = this.state;

    return (
      <Grid className={`${className} moduleM`}>
        <Row fullBleed={{ small: true, medium: true }} className="topview">
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className="header-container"
          >
            {headerText && this.getHeaderText(headerText)}
            {promoBanner && this.getPromoBanner(promoBanner)}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className="product-tab-list"
          >
            {divTabs &&
              divTabs.length > 1 &&
              this.createProductTabList(this.createTabList(divTabs))}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {isGymboree()
              ? this.getCategoryImageList(productCategoryImageList)
              : this.getProductImageList(flexbox, productCategoryImageList)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

ModuleM.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.shape([]),
  promoBanner: PropTypes.shape([]),
  divTabs: PropTypes.shape([]),
  flexbox: PropTypes.bool,
  singleCTAButton: PropTypes.shape({}),
  ctaItems: PropTypes.shape({}),
};

ModuleM.defaultProps = {
  className: '',
  headerText: [],
  promoBanner: [],
  divTabs: [],
  type: 0,
  singleCTAButton: [],
  ctaItems: [],
};

const styledModuleM = withStyles(errorBoundary(ModuleM), style);
styledModuleM.defaultProps = ModuleM.defaultProps;
export default styledModuleM;
export { ModuleM as ModuleMVanilla };
