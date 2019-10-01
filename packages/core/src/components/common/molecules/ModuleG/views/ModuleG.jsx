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
import moduleGStyle from '../styles/ModuleG.style';
import {
  // configureInternalNavigationFromCMSUrl,
  getIconPath,
  getLocator,
} from '../../../../../utils';
import config from '../config';

class ModuleG extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCatId: '',
      currentTabItem: {},
    };
  }

  onTabChange = (catId, tabItem) => {
    this.setState({ currentCatId: catId, currentTabItem: tabItem });
  };

  getCurrentCtaButton = () => {
    const { currentTabItem: { singleCTAButton: currentSingleCTAButton } = {} } = this.state;

    return currentSingleCTAButton ? (
      <Row centered>
        <Col
          colSize={{
            small: 4,
            medium: 2,
            large: 2,
          }}
        >
          <Anchor
            noLink
            to={currentSingleCTAButton.url}
            target={currentSingleCTAButton.target}
            title={currentSingleCTAButton.title}
            asPath={currentSingleCTAButton.url}
            dataLocator={getLocator('moduleJ_cta_btn')}
          >
            <Button buttonVariation="fixed-width" className="cta-btn">
              {currentSingleCTAButton.text}
            </Button>
          </Anchor>
        </Col>
      </Row>
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
          dataLocator={getLocator('moduleJ_header_text')}
        />
      </div>
    ) : (
      <LinkText
        component="div"
        headerText={headerText}
        className="promo-header"
        dataLocator={getLocator('moduleJ_header_text')}
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

  render() {
    const {
      className,
      productTabList,
      // mediaLinkedList,
      // layout,
      divTabs,
    } = this.props;
    const { currentCatId } = this.state;
    // const promoMediaLinkedList = mediaLinkedList || [];
    // const { image: promoImage1, link: promoLink1 } = promoMediaLinkedList[0] || {};
    // const { image: promoImage2, link: promoLink2 } = promoMediaLinkedList[1] || {};
    const {
      CAROUSEL_OPTIONS,
      // PROMO_IMG_DATA,
      TOTAL_IMAGES,
    } = config;
    let data = productTabList[currentCatId] || [];
    data = data.slice(0, TOTAL_IMAGES);

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
            <ProductTabList
              onProductTabChange={this.onTabChange}
              tabItems={divTabs}
              dataLocator={getLocator('moduleJ_cta_link')}
            />
          </Col>
        </Row>
        <Row className="wrapper">
          <Col
            className="moduleG__carousel-wrapper moduleG__carousel-top"
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
            {data ? (
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
          {/* carousel bottom */}
          {/* <Col
            className="moduleG__carousel-wrapper moduleG__carousel-bottom"
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
            {data ? (
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
          </Col> */}
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
