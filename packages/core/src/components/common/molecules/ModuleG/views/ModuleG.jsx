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

  onAddToBagClick = () => {
    const { onQuickViewOpenClick } = this.props;
    const { next } = this.state;
    const data = this.getImagesData();
    onQuickViewOpenClick({
      colorProductId: data.length && data[0][next].prodpartno,
    });
  };

  getCurrentCtaButton = () => {
    const { currentCatId, next } = this.state;
    const { divTabs } = this.props;
    let currentSingleCTAButton = {};
    divTabs.forEach(tab => {
      if (JSON.stringify(tab.category.cat_id) === JSON.stringify(currentCatId)) {
        currentSingleCTAButton = tab.singleCTAButtonCart;
      }
    });
    const data = this.getImagesData();
    return Object.keys(currentSingleCTAButton).length ? (
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
              add to bag
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
              to={`${currentSingleCTAButton.url}${data.length && data[0][next].pdpAsPath}`}
              target={currentSingleCTAButton.target}
              title={currentSingleCTAButton.title}
              asPath={`${currentSingleCTAButton.url}${data.length && data[0][next].pdpAsPath}`}
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
        return showPlusButton;
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
