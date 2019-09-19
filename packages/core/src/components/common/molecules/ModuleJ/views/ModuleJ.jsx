/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, Col, DamImage, Image, Row } from '../../../atoms';
import { Carousel, Grid, LinkText, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import moduleJStyle from '../styles/ModuleJ.style';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../config';

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

  getCurrentCtaButton() {
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
  }

  render() {
    const {
      className,
      productTabList,
      mediaLinkedList,
      headerText,
      layout,
      promoBanner,
      divTabs,
    } = this.props;

    const { currentCatId } = this.state;

    const { CAROUSEL_OPTIONS, PROMO_IMG_DATA, TOTAL_IMAGES } = config;
    let data = productTabList[currentCatId];
    data = data ? data.slice(0, TOTAL_IMAGES) : [];

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
                  alt: mediaLinkedList[0] && mediaLinkedList[0].image.alt,
                  url: mediaLinkedList[0] && mediaLinkedList[0].image.url,
                }}
                data-locator={`${getLocator('moduleJ_promobanner_img')}${1}`}
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
              <div className="promo-header-wrapper">
                <LinkText
                  component="div"
                  headerText={[headerText[0]]}
                  className="promo-header"
                  dataLocator={getLocator('moduleJ_header_text_0')}
                />
              </div>

              <div className="promo-header-wrapper">
                <LinkText
                  component="div"
                  headerText={[headerText[1]]}
                  className="promo-header"
                  dataLocator={getLocator('moduleJ_header_text_1')}
                />
              </div>
              {promoBanner && (
                <PromoBanner
                  promoBanner={promoBanner}
                  className="promoBanner"
                  dataLocator={getLocator('moduleJ_promobanner_text')}
                />
              )}
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
                imgData={{
                  alt: mediaLinkedList[1] && mediaLinkedList[1].image.alt,
                  url: mediaLinkedList[1] && mediaLinkedList[1].image.url,
                }}
                data-locator={`${getLocator('moduleJ_promobanner_img')}${2}`}
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
              <LinkText
                component="div"
                headerText={headerText}
                className="promo-header"
                dataLocator={getLocator('moduleJ_header_text')}
              />
              {promoBanner && (
                <PromoBanner
                  promoBanner={promoBanner}
                  className="promoBanner"
                  dataLocator={getLocator('moduleJ_promobanner_text')}
                />
              )}
            </Col>
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            >
              <ProductTabList onProductTabChange={this.onTabChange} tabItems={divTabs} />
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
                {data.map(({ imageUrl, pdpUrl, pdpAsPath }, index) => {
                  return (
                    <div key={index.toString()}>
                      <Anchor
                        className="image-link"
                        to={pdpUrl}
                        asPath={pdpAsPath}
                        dataLocator={`${getLocator('moduleJ_product_image')}${index}`}
                      >
                        <Image src={imageUrl[0]} />
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
  className: '',
  headerText: [],
  productTabList: {},
  mediaLinkedList: [],
  promoBanner: [],
  layout: 'default',
  divTabs: [],
};

ModuleJ.propTypes = {
  className: PropTypes.string,
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
  ),
  headerText: PropTypes.arrayOf(PropTypes.shape({})),
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
  promoBanner: PropTypes.arrayOf(PropTypes.shape({})),
  layout: PropTypes.string,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ),
};

const styledModuleJ = withStyles(errorBoundary(ModuleJ), moduleJStyle);
styledModuleJ.defaultProps = ModuleJ.defaultProps;
export default styledModuleJ;
export { ModuleJ as ModuleJVanilla };
