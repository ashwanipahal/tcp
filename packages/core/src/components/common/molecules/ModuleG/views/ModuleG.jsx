/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Button,
  Col,
  // DamImage,
  Image,
  Row,
} from '../../../atoms';
import { Carousel, Grid, LinkText, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import moduleGStyle, { StyledSkeleton } from '../styles/ModuleG.style';
import {
  // configureInternalNavigationFromCMSUrl,
  getIconPath,
  getLocator,
} from '../../../../../utils';
import config from '../config';
import QuickViewModal from '../../../organisms/QuickViewModal/container/QuickViewModal.container';
import ProductTabListActions from '../../../organisms/ProductTabList/container/ProductTabList.actions';

class ModuleG extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCatId: [],
      next: 0,
    };
  }

  onTabChange = catId => {
    this.setState({ currentCatId: catId });
  };

  getImagesData = () => {
    const { currentCatId } = this.state;
    const { productTabList } = this.props;
    const { TOTAL_IMAGES } = config;
    let data = [];
    data = currentCatId.map(item => [...data, ...(productTabList[item] || [])]);
    data = data.slice(0, TOTAL_IMAGES);
    if (Object.keys(productTabList).length) {
      return data;
    }
    return [];
  };

  getProcessedCategoryIds = (catIds) => {
    const processedCatId = [];
    if(catIds.length) {
      catIds.forEach(item => processedCatId.push(item.val || item)); 
    }
    return processedCatId;
  }

  onAddToBagClick = () => {
    const { onQuickViewOpenClick } = this.props;
    const { next } = this.state;
    const data = this.getImagesData();
    onQuickViewOpenClick([
      {
        colorProductId: data.length && data[0][next].prodpartno,
      },
      {
        colorProductId: data.length && data[1][next].prodpartno,
      },
    ]);
  };

  getProcessedCategoryIds = (catIds) => {
    const processedCatId = [];
    if(catIds.length) {
      catIds.forEach(item => processedCatId.push(item.val || item)); 
    }
    return processedCatId;
  }

  getCurrentCtaButton = () => {
    debugger;
    const { currentCatId, next } = this.state;
    const { divTabs, productTabList } = this.props;
    let currentSingleCTAButton = {};

    const processedDivTabs = Object.assign([], divTabs);
    const tabs = {};
    processedDivTabs.forEach((tab, index) => {
      debugger;
      const tabList = tab.category.map(cat => cat.val);
      tabs[index] = tabList;
    });

    divTabs.forEach((tab, index) => {
      debugger;
      if (JSON.stringify(tabs[index]) === JSON.stringify(currentCatId)) {
        currentSingleCTAButton = tab.singleCTAButtonCart;
      }
    });

    let productExists = false;
    if (currentCatId.length) {
      currentCatId.forEach(id => {
        productExists =
          Object.keys(productTabList).length > 2 &&
          productTabList[id] &&
          productTabList[id].length > 0;
      });
    }
    const data = this.getImagesData();
    return productExists && Object.keys(currentSingleCTAButton).length ? (
      <>
        <Row centered>
          <Col
            colSize={{
              small: 4,
              medium: 2,
              large: 2,
            }}
          >
            <Button
              onClick={() => this.onAddToBagClick()}
              buttonVariation="fixed-width"
              className="cta-btn"
            >
              {currentSingleCTAButton.title}
            </Button>
          </Col>
        </Row>
        <Row centered>
          <Col
            colSize={{
              small: 4,
              medium: 2,
              large: 2,
            }}
            className="carousel-bottom-link"
          >
            <Anchor
              noLink
              to={`${currentSingleCTAButton.url}${data &&
                data.length &&
                data[0][next] &&
                data[0][next].pdpAsPath}`}
              target={currentSingleCTAButton.target}
              title={currentSingleCTAButton.title}
              asPath={`${currentSingleCTAButton.url}${data &&
                data.length &&
                data[0][next] &&
                data[0][next].pdpAsPath}`}
              dataLocator={getLocator('moduleJ_cta_btn')}
            >
              <span className="shopall_footerlink">{currentSingleCTAButton.text}</span>
              <span className="right_chevron_arrow">
                <Image src={getIconPath('smallright')} />
              </span>
            </Anchor>
          </Col>
        </Row>
        <QuickViewModal />
      </>
    ) : null;
  };

  getHeaderText = () => {
    const { headerText, layout } = this.props;
    return headerText && layout !== 'alt' ? (
      <div className="promo-header-wrapper">
        <LinkText
          component="div"
          headerText={headerText}
          className="promo-header"
          dataLocator={getLocator('moduleG_header_text')}
        />
      </div>
    ) : (
      <LinkText
        component="div"
        headerText={headerText}
        className="promo-header"
        dataLocator={getLocator('moduleG_header_text')}
      />
    );
  };

  getPromoBanner = () => {
    const { promoBanner } = this.props;
    return (
      promoBanner && (
        <PromoBanner
          promoBanner={promoBanner}
          className="promoBanner"
          dataLocator={getLocator('moduleJ_promobanner_text')}
        />
      )
    );
  };

  renderCarousel = (type, currentCatId) => {
    debugger;
    const { productTabList } = this.props;
    const { CAROUSEL_OPTIONS, TOTAL_IMAGES } = config;
    let data = productTabList[currentCatId] || [];
    data = data.slice(0, TOTAL_IMAGES);
    let dataStatus = true;
    if (productTabList && productTabList.completed) {
      dataStatus = productTabList.completed[currentCatId];
    }
    if (dataStatus) {
      return (
        <StyledSkeleton
          col={6}
          colSize={{ small: 2, medium: 2, large: 2 }}
          showArrows
          removeLastMargin
        />
      );
    }
    if (data.length > 0) {
      return (
        <Col
          className={`moduleG__carousel-wrapper moduleG__carousel-${type}`}
          colSize={{
            small: 6,
            medium: 8,
            large: 10,
          }}
          offsetLeft={{
            small: 0,
            medium: 0,
            large: 1,
          }}
          offsetRight={{
            small: 0,
            medium: 0,
            large: 1,
          }}
        >
          {data.length > 0 ? (
            <Carousel
              options={CAROUSEL_OPTIONS}
              carouselConfig={{
                autoplay: false,
                variation: 'big-arrows',
                customArrowLeft: getIconPath('carousel-big-carrot'),
                customArrowRight: getIconPath('carousel-big-carrot'),
              }}
            >
              {data.map(({ imageUrl, pdpUrl, pdpAsPath, product_name: productName }, index) => {
                return (
                  <div key={index.toString()}>
                    <Anchor
                      className="image-link"
                      to={pdpUrl}
                      asPath={pdpAsPath}
                      dataLocator={`${getLocator('moduleJ_product_image')}${index}`}
                    >
                      <Image alt={productName} src={imageUrl[0]} />
                    </Anchor>
                  </div>
                );
              })}
            </Carousel>
          ) : null}
        </Col>
      );
    }

    return null;
  };

  render() {
    const {
      className,
      productTabList,
      // mediaLinkedList,
      // layout,
      divTabs,
    } = this.props;
    debugger;
    const { CAROUSEL_OPTIONS } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ next });
    };
    const { currentCatId } = this.state;
    // const promoMediaLinkedList = mediaLinkedList || [];
    // const { image: promoImage1, link: promoLink1 } = promoMediaLinkedList[0] || {};
    // const { image: promoImage2, link: promoLink2 } = promoMediaLinkedList[1] || {};
    let showPlusButton = false;
    const productTabsCompletionInfo = Object.assign({}, productTabList);
    // eslint-disable-next-line
    if (productTabsCompletionInfo && productTabsCompletionInfo.hasOwnProperty('completed')) {
      currentCatId.forEach(id => {
        // eslint-disable-next-line
        if (productTabsCompletionInfo.completed.hasOwnProperty(id)) {
          showPlusButton = true;
        } else {
          showPlusButton = false;
        }
      });
    }

    return (
      <Grid className={`${className} moduleG`}>
        <Row>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {this.getHeaderText()}
            <ProductTabList
              onProductTabChange={this.onTabChange}
              tabItems={divTabs}
              dataLocator={getLocator('moduleJ_cta_link')}
            />
          </Col>
        </Row>
        <Row className="wrapper" fullBleed={{ small: true, medium: true, large: false }}>
          {this.renderCarousel('top', currentCatId[0])}
          {showPlusButton ? (
            <div className="focusAreaView">
              <span className="focusArea-plus">
                <Image src={getIconPath('plus-icon')} />
              </span>
            </div>
          ) : null}
          {/* carousel bottom */}
          {this.renderCarousel('bottom', currentCatId[1])}
        </Row>
        {this.getCurrentCtaButton()}
      </Grid>
    );
  }
}

ModuleG.defaultProps = {
  // mediaLinkedList: [],
  promoBanner: [],
  layout: 'default',
};

ModuleG.propTypes = {
  className: PropTypes.string.isRequired,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ),
  onQuickViewOpenClick: PropTypes.func.isRequired,
  productTabList: PropTypes.oneOfType(
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          uniqueId: PropTypes.string.isRequired,
          imageUrl: PropTypes.array.isRequired,
          seo_token: PropTypes.string,
        })
      )
    )
  ).isRequired,
  // mediaLinkedList: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     image: PropTypes.object,
  //     link: PropTypes.object,
  //   })
  // ),
  layout: PropTypes.string.isRequired,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
};

const styledModuleG = withStyles(errorBoundary(ModuleG), moduleGStyle);
styledModuleG.defaultProps = ModuleG.defaultProps;
export default styledModuleG;
export { ModuleG as ModuleGVanilla };
