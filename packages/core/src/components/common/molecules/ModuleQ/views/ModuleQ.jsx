import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, BodyCopy, Col, Image, Row } from '../../../atoms';
import { Carousel, Grid, LinkText, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import StyliticsProductTabList from '../../../organisms/StyliticsProductTabList';
import moduleQStyle, { StyledSkeleton } from '../styles/ModuleQ.style';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../ModuleQ.config';
import constant from '../ModuleQ.constant';

/**
 * @class ModuleQ - global reusable component will display a featured content
 * module with 2-4 tabs of outfits carousels of up to 7 outfits each
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText the list of data for header texts
 * @param {promoBanner} promoBanner the list of data for promo banner
 * @param {divTabs} divTabs the list of data for product tabs
 */
class ModuleQ extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCatId: '',
      currentTabItem: [],
    };
  }

  onProductTabChange = (catId, tabItem) => {
    this.setState({ currentCatId: catId, currentTabItem: tabItem });
  };

  /** This method is to add protocol to image url
   * since image is coming from unbox without protocol
   * and it breaks on local without protocol
   * TODO: It will be removed refactored later
   */
  getUrlWithHttp = url => url.replace(/(^\/\/)/, 'https:$1');

  /**
   * This function is being called to render carousel items.
   * @param {object} item image object for the carousel
   * @param {integer} index Index for the carousel item
   */
  getSlideItem = (item, index) => {
    const { id, items, largeImageUrl, pdpUrl } = item;
    const { shopThisLookLabel } = this.props;
    const looksImages = items.slice(0, 2);
    const hiddenImagesCount = items.length - looksImages.length;
    const outfitParams = pdpUrl && pdpUrl.split('/');
    const { RECOMMENDATION } = constant;
    return (
      <div>
        <Anchor
          key={id}
          className="moduleQ-image-link"
          to={
            outfitParams &&
            outfitParams.length > 1 &&
            `/outfit?outfitId=${outfitParams[outfitParams.length - 2]}&vendorColorProductIdsList=${
              outfitParams[outfitParams.length - 1]
            }&viaModule=${RECOMMENDATION}`
          }
          asPath={pdpUrl}
          dataLocator={`${getLocator('moduleQ_product_image')}${index}`}
        >
          <div className="looks-large-image">
            <Image alt={id} src={this.getUrlWithHttp(largeImageUrl)} />
            <div className="shop-this-look-link">
              <Anchor withCaret centered>
                <BodyCopy component="span" color="gray.900" fontFamily="secondary" fontSize="fs12">
                  {shopThisLookLabel}
                </BodyCopy>
              </Anchor>
            </div>
          </div>
          <div className="looks-images-wrapper">
            {looksImages.map(({ smallImageUrl, name, remoteId }) => {
              return (
                <div className="looks-image">
                  <Image key={remoteId} alt={name} src={this.getUrlWithHttp(smallImageUrl)} />
                </div>
              );
            })}
            {hiddenImagesCount > 0 ? (
              <div className="looks-image looks-image-last">
                <BodyCopy
                  color="gray.900"
                  fontFamily="secondary"
                  fontSize="fs22"
                  fontWeight="extrabold"
                >
                  {`+${hiddenImagesCount}`}
                </BodyCopy>
              </div>
            ) : null}
          </div>
        </Anchor>
      </div>
    );
  };

  getCurrentCtaButton = () => {
    const { currentTabItem } = this.state;
    if (!currentTabItem || !currentTabItem.length) {
      return null;
    }
    const { singleCTAButton: currentSingleCTAButton } = currentTabItem.length && currentTabItem[0];

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
            dataLocator={getLocator('moduleQ_cta_btn')}
          >
            <Button buttonVariation="fixed-width" className="cta-btn">
              {currentSingleCTAButton.text}
            </Button>
          </Anchor>
        </Col>
      </Row>
    ) : null;
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      className,
      bgClass,
      divTabs,
      headerText,
      promoBanner,
      styliticsProductTabList,
      hideTabs,
      selectedColorProductId,
    } = this.props;
    const { currentCatId } = this.state;
    const { CAROUSEL_OPTIONS, TOTAL_IMAGES } = config;
    let selectedProductList = styliticsProductTabList[currentCatId] || [];
    selectedProductList = selectedProductList.slice(0, TOTAL_IMAGES);
    const showCarousel = selectedProductList && selectedProductList.length > 3;
    const bgName = `${className} ${bgClass} moduleQ`;
    // eslint-disable-next-line no-nested-ternary
    const showBg = hideTabs ? (showCarousel ? bgName : '') : bgName;
    const IconPath = getIconPath('carousel-big-carrot');
    let dataStatus = true;
    if (styliticsProductTabList && styliticsProductTabList.completed) {
      dataStatus = styliticsProductTabList.completed[currentCatId];
    }

    return (
      <Grid className={showBg}>
        <Row centered>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {headerText && (
              <LinkText
                component="div"
                headerText={headerText}
                className="moduleQ-header"
                headingClass="moduleQ-promo-header"
                dataLocator={getLocator('moduleQ_header_text')}
              />
            )}
            {!hideTabs && promoBanner && (
              <PromoBanner
                promoBanner={promoBanner}
                className="moduleQ-promo"
                dataLocator={getLocator('moduleQ_promobanner_text')}
              />
            )}
          </Col>
          <div>
            <StyliticsProductTabList
              onProductTabChange={this.onProductTabChange}
              tabItems={divTabs}
              selectedColorProductId={selectedColorProductId}
              dataLocator={getLocator('moduleQ_cta_link')}
            />
          </div>
        </Row>
        <Row fullBleed={{ small: true, medium: true }}>
          <Col
            className="moduleQ__carousel-wrapper"
            colSize={{
              small: 6,
              medium: 8,
              large: 8,
            }}
            offsetLeft={{
              small: 0,
              medium: 0,
              large: 2,
            }}
            offsetRight={{
              small: 0,
              medium: 0,
              large: 2,
            }}
          >
            {dataStatus ? (
              <StyledSkeleton
                col={3}
                colSize={{ small: 2, medium: 2, large: 4 }}
                removeLastMargin
                showArrows
              />
            ) : null}
            {showCarousel ? (
              <Carousel
                options={CAROUSEL_OPTIONS}
                carouselConfig={{
                  autoplay: false,
                  variation: 'big-arrows',
                  customArrowLeft: IconPath,
                  customArrowRight: IconPath,
                }}
              >
                {selectedProductList.map((item, index) => this.getSlideItem(item, index))}
              </Carousel>
            ) : null}
          </Col>
        </Row>
        {showCarousel ? this.getCurrentCtaButton() : null}
      </Grid>
    );
  }
}

ModuleQ.defaultProps = {
  shopThisLookLabel: '',
  bgClass: '',
  className: '',
  promoBanner: [],
  hideTabs: false,
  selectedColorProductId: '',
};

ModuleQ.propTypes = {
  bgClass: PropTypes.string,
  shopThisLookLabel: PropTypes.string,
  className: PropTypes.string,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
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
  styliticsProductTabList: PropTypes.oneOfType(
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
  hideTabs: PropTypes.bool,
  selectedColorProductId: PropTypes.string,
};

const styledModuleQ = withStyles(errorBoundary(ModuleQ), moduleQStyle);
styledModuleQ.defaultProps = ModuleQ.defaultProps;
export default styledModuleQ;
export { ModuleQ as ModuleQVanilla };
