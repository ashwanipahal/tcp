import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { getViewportInfo, isClient } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import { Anchor, Col, Image, Row, BodyCopy, Button } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Grid, LinkText, PromoBanner } from '../..';
import style, { ImageGrid, CtaButtonWrapper, ImageRoundFlex } from '../styles/ModuleM.style';
import config from '../moduleM.config';

export class ModuleM extends React.PureComponent {
  constructor(props) {
    super(props);
    const viewportInfo = isClient() ? getViewportInfo() : null;
    this.state = {
      isMobile: viewportInfo && viewportInfo.isMobile,
      isTablet: viewportInfo && viewportInfo.isTablet,
      productCategoryImageList: [],
    };
  }

  componentDidMount() {
    const { divTabs } = this.props;
    window.addEventListener('resize', throttle(this.windowResizeEventHandler.bind(this), 500));
    this.setState({
      productCategoryImageList: divTabs[0].smallCompImages,
      activeTab: divTabs[0].category.cat_id,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.windowResizeEventHandler.bind(this), 500));
  }

  /**
+   * Set state based on view port.
+   */
  windowResizeEventHandler = () => {
    const viewportInfo = isClient() ? getViewportInfo() : null;
    this.setState({
      isMobile: viewportInfo && viewportInfo.isMobile,
      isTablet: viewportInfo && viewportInfo.isTablet,
    });
  };

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

  getViewportKey = () => {
    let gutterViewportKey;
    const { isMobile, isTablet } = this.state;
    if (isMobile) gutterViewportKey = 'sm';
    else if (isTablet) gutterViewportKey = 'md';
    else gutterViewportKey = 'lg';

    return gutterViewportKey;
  };

  getProductImageGrid = selectedProductList => {
    const { singleCTAButton } = this.props;
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
                  <Image alt={image.title} src={image.url} />
                  {/* TO DO - Implement Dam image after cms integration */}
                  {/* <DamImage
                    imgConfigs={config.IMG_DATA.productImgConfig}
                    imgData={image}
                    data-locator={`${getLocator('moduleT_promobanner_img')}${1}`}
                    link={link}
                  /> */}
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
              </ImageGrid>
            );
          })}
        {selectedProductList.length > 0 && (
          <CtaButtonWrapper
            length={selectedProductList.length}
            colSize={config[`images${selectedProductList.length}`].colSize}
            ignoreNthRule
            offsetRight={imageData.offsetRight}
            ignoreGutter={{ large: true, medium: true, small: true }}
            isNotInlineBlock
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

  getProductImageFlex = selectedProductList => {
    const { singleCTAButton } = this.props;

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
                  <Image alt={image.title} src={image.url} />
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
      </div>
    );
  };

  getCategoryImageList = ctaItems => {
    return (
      ctaItems && (
        <div className="image-items-container-category">
          {ctaItems &&
            ctaItems.map((productItem, index) => {
              const { image, button } = productItem;
              return (
                <ImageRoundFlex className="imagecategory__list">
                  <Anchor
                    to={button.url}
                    asPath={button.url}
                    dataLocator={`${getLocator('moduleM_product_image')}${index}`}
                  >
                    <Image alt={image.alt} src={image.url} />
                    <BodyCopy
                      component="div"
                      className="moduleM__productName"
                      fontSize="fs15"
                      color="text.primary"
                      fontFamily="secondary"
                    >
                      {button.text}
                    </BodyCopy>
                  </Anchor>
                </ImageRoundFlex>
              );
            })}
        </div>
      )
    );
  };

  getProductImageList = (type, list) =>
    type === 'flex' ? this.getProductImageFlex(list) : this.getProductImageGrid(list);

  onTabChange = (id, imageList) => {
    this.setState({ productCategoryImageList: imageList, activeTab: id });
  };

  createProductTabList = tabList => {
    return (
      tabList &&
      tabList.map(list => {
        const {
          text: listItemText,
          smallCompImages,
          category: { cat_id: id },
        } = list;
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
              onClick={() => this.onTabChange(id, smallCompImages)}
            >
              {listItemText.text}
            </Button>
          </div>
        );
      })
    );
  };

  render() {
    const { className, headerText, promoBanner, divTabs, type, ctaItems } = this.props;
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
            {divTabs && this.createProductTabList(divTabs)}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {ctaItems && ctaItems.length > 0
              ? this.getCategoryImageList(ctaItems)
              : this.getProductImageList(type, productCategoryImageList)}
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
  type: PropTypes.string,
  singleCTAButton: PropTypes.shape({}),
  ctaItems: PropTypes.shape({}),
};

ModuleM.defaultProps = {
  className: '',
  headerText: [],
  promoBanner: [],
  divTabs: [],
  type: [],
  singleCTAButton: [],
  ctaItems: [],
};

const styledModuleM = withStyles(errorBoundary(ModuleM), style);
styledModuleM.defaultProps = ModuleM.defaultProps;
export default styledModuleM;
export { ModuleM as ModuleMVanilla };
