import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { getViewportInfo, isClient, isGymboree } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import { Anchor, Col, Image, Row, BodyCopy } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Grid, LinkText, PromoBanner } from '../..';
import ProductTabList from '../../../organisms/ProductTabList';
import style, { ImageGrid, CtaButtonWrapper, ImageRoundFlex } from '../styles/ModuleM.style';
import mock from '../../../../../services/abstractors/common/moduleM/mock';
import config from '../moduleM.config';

export class ModuleM extends React.PureComponent {
  constructor(props) {
    super(props);
    const viewportInfo = isClient() ? getViewportInfo() : null;
    this.state = {
      currentCatId: '',
      isMobile: viewportInfo && viewportInfo.isMobile,
      isTablet: viewportInfo && viewportInfo.isTablet,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', throttle(this.windowResizeEventHandler.bind(this), 500));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.windowResizeEventHandler.bind(this), 500));
  }

  onTabChange = catId => {
    this.setState({ currentCatId: catId });
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

  getCTAButton = (singleCTAButton, ctaConfig) => {
    return (
      singleCTAButton && (
        <CtaButtonWrapper
          colSize={
            Object.keys(ctaConfig).length > 0
              ? ctaConfig.colSize
              : {
                  small: 2,
                  medium: 2,
                  large: 2,
                }
          }
          offsetRight={Object.keys(ctaConfig).length > 0 ? ctaConfig.offsetRight : null}
          className="moduleM__shopAllBtnWrapper"
          ignoreGutter={{ large: true, medium: true, small: true }}
          length={ctaConfig.length}
        >
          <Anchor
            to={singleCTAButton.url}
            asPath={singleCTAButton.url}
            title={singleCTAButton.tex}
            dataLocator={`${getLocator('moduleM_shopAllBtn')}`}
            className="moduleM__shopAllBtn"
          >
            {singleCTAButton.text}
          </Anchor>
        </CtaButtonWrapper>
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
    const { singleCTAButton } = mock.Modules.moduleM;
    const gutterViewportKey = this.getViewportKey();
    let rowCount = 0;
    let rowLastElementIndex = 0;
    let lastElementConfig = {};

    return (
      <Row className="image-items-container">
        {selectedProductList.map((productItem, index) => {
          if (productItem.uniqueId) {
            const {
              pdpUrl,
              pdpAsPath,
              uniqueId,
              imageUrl: [imageUrl],
              product_name: productName,
            } = productItem;

            /**
             * Calculating the offset boolean.
             * The below calculation will determine, whether offset right and ignore gutter props will be passed to the col or not.
             * This will insure to provide a margin right offset to every last element of the row.
             * If in a row, we have to show 5 elements, in case of index 4[5th element], if the below calculated below remainder,
             * is 0, then only apply margin right offset to the element.
             *
             * gutterViewportKey - to determine the viewport and it can be only values from [sm, lg, md]
             */
            const setOffsetsProp =
              (index + 1) %
                config[`images${selectedProductList.length}`].rowMaxImages[gutterViewportKey] ===
              0;
            /**
             * Calculate the row count and every row last item index, so to provide a approx margin offset to it.
             */
            if (setOffsetsProp) {
              rowCount += 1;
              rowLastElementIndex = index;
            }
            /**
             * Create config for last shop all button cta.
             */
            if (index + 1 === selectedProductList.length) {
              lastElementConfig = {
                colSize: config[`images${selectedProductList.length}`].colSize,
                offsetRight: config[`images${selectedProductList.length}`].offsetRight,
                length: selectedProductList.length,
              };
            }
            const isRowFirstElement = index * rowCount === rowLastElementIndex + 1;
            return (
              <ImageGrid
                key={uniqueId}
                imageindex={index}
                colSize={config[`images${selectedProductList.length}`].colSize}
                offsetRight={
                  setOffsetsProp ? config[`images${selectedProductList.length}`].offsetRight : null
                }
                offsetLeft={
                  index === 0 || isRowFirstElement
                    ? config[`images${selectedProductList.length}`].offsetLeft
                    : null
                }
                ignoreGutter={
                  setOffsetsProp &&
                  config[`images${selectedProductList.length}`].rows[gutterViewportKey] > 1
                    ? { large: true, medium: true, small: true }
                    : null
                }
                ignoreNthRule
                length={selectedProductList.length}
              >
                <Anchor
                  to={pdpUrl}
                  asPath={pdpAsPath}
                  dataLocator={`${getLocator('moduleM_product_image')}${index}`}
                >
                  <Image alt={productName} src={imageUrl} />
                  <BodyCopy
                    component="div"
                    className="moduleM__productName"
                    fontSize="fs15"
                    color="text.primary"
                    fontFamily="secondary"
                  >
                    {productName}
                  </BodyCopy>
                </Anchor>
              </ImageGrid>
            );
          }
          return (
            <Col
              key={index.toString()}
              className="image-item-wrapper"
              colSize={{ small: 2, medium: 4, large: 4 }}
            >
              {productItem}
            </Col>
          );
        })}
        {this.getCTAButton(singleCTAButton, lastElementConfig)}
      </Row>
    );
  };

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

  getCategoryImageList = ctaItems => {
    return (
      ctaItems && (
        <div className="image-items-container-category">
          {ctaItems.map((productItem, index) => {
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

  render() {
    // change the below destructuring to this.props
    // TO DO -- MOCK IMPLEMENTATION REMOVAL
    const { className } = this.props;
    const { productTabList, Modules } = mock;
    const { headerText, promoBanner, divTabs, ctaItems } = Modules.moduleM;

    const { currentCatId } = this.state;
    let data = productTabList[currentCatId] || [];
    const imageListCtaItems = ctaItems || [];
    const { TOTAL_IMAGES } = config;
    data = data.slice(0, TOTAL_IMAGES);

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
            {this.getHeaderText(headerText)}
            {this.getPromoBanner(promoBanner)}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {divTabs && (
              <div className="product-tab-list">
                <ProductTabList
                  onProductTabChange={this.onTabChange}
                  tabItems={divTabs}
                  dataLocator={getLocator('moduleM_cta_link')}
                />
              </div>
            )}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {isGymboree()
              ? this.getCategoryImageList(imageListCtaItems)
              : this.getProductImageGrid(data)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

ModuleM.propTypes = {
  className: PropTypes.string,
};

ModuleM.defaultProps = {
  className: '',
};

const styledModuleM = withStyles(errorBoundary(ModuleM), style);
styledModuleM.defaultProps = ModuleM.defaultProps;
export default styledModuleM;
export { ModuleM as ModuleMVanilla };
