import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, Col, DamImage, Image, Row } from '../../../atoms';
import { Carousel, Grid, LinkText, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import moduleJStyle from '../styles/ModuleJ.style';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../moduleJ.config';

class ModuleJ extends React.PureComponent {
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
          <Button
            buttonVariation="fixed-width"
            className="cta-btn"
            cta={currentSingleCTAButton}
            dataLocator={getLocator('moduleJ_cta_btn')}
          >
            {currentSingleCTAButton.text}
          </Button>
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
    const { className, productTabList, mediaLinkedList, layout, divTabs } = this.props;
    const { currentCatId } = this.state;
    const promoMediaLinkedList = mediaLinkedList || [];
    const { image: promoImage1, link: promoLink1 } = promoMediaLinkedList[0] || {};
    const { image: promoImage2, link: promoLink2 } = promoMediaLinkedList[1] || {};
    const { CAROUSEL_OPTIONS, PROMO_IMG_DATA, TOTAL_IMAGES } = config;
    let data = productTabList[currentCatId] || [];
    data = data.slice(0, TOTAL_IMAGES);
    return (
      <Grid className={`${className} moduleJ layout-${layout}`}>
        {layout !== 'alt' ? (
          <Row fullBleed={{ small: true, medium: true }} className="topview">
            <Col
              className="topbar"
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            />
            <Col
              className="promo-image-left"
              colSize={{
                small: 0,
                medium: 2,
                large: 3,
              }}
              hideCol={{
                small: true,
              }}
            >
              <DamImage
                imgConfigs={PROMO_IMG_DATA.imgConfig}
                imgData={{
                  alt: promoImage1.alt,
                  url: promoImage1.url,
                }}
                data-locator={`${getLocator('moduleJ_promobanner_img')}${1}`}
                link={promoLink1}
              />
            </Col>
            <Col
              className="promo"
              colSize={{
                small: 6,
                medium: 4,
                large: 6,
              }}
              ignoreGutter={{
                small: true,
              }}
            >
              {this.getHeaderText()}
              {this.getPromoBanner()}
              <ProductTabList
                onProductTabChange={this.onTabChange}
                tabItems={divTabs}
                dataLocator={getLocator('moduleJ_cta_link')}
              />
            </Col>
            <Col
              className="promo-image-right"
              colSize={{
                small: 6,
                medium: 2,
                large: 3,
              }}
            >
              <DamImage
                className="promo-img"
                imgConfigs={PROMO_IMG_DATA.imgConfig}
                imgData={promoImage2}
                data-locator={`${getLocator('moduleJ_promobanner_img')}${2}`}
                link={promoLink2}
              />
            </Col>
          </Row>
        ) : (
          <Row fullBleed={{ small: true, medium: true, large: true }} className="topview">
            <Col
              className="promo-alt"
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
              ignoreGutter={{
                small: true,
                medium: true,
                large: true,
              }}
            >
              {this.getHeaderText()}
              {this.getPromoBanner()}
            </Col>
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
        )}
        <Row>
          <Col
            className="moduleJ__carousel-wrapper"
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
        </Row>

        {this.getCurrentCtaButton()}
      </Grid>
    );
  }
}

ModuleJ.defaultProps = {
  mediaLinkedList: [],
  promoBanner: [],
  layout: 'default',
};

ModuleJ.propTypes = {
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
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
  layout: PropTypes.string.isRequired,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
};

const styledModuleJ = withStyles(errorBoundary(ModuleJ), moduleJStyle);
styledModuleJ.defaultProps = ModuleJ.defaultProps;
export default styledModuleJ;
export { ModuleJ as ModuleJVanilla };
