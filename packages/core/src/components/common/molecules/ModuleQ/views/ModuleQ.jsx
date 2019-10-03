/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, BodyCopy, Col, Image, Row } from '../../../atoms';
import { Carousel, Grid, LinkText, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import StyliticsProductTabList from '../../../organisms/StyliticsProductTabList';
import moduleQStyle from '../styles/ModuleQ.style';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../ModuleQ.config';

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
      currentTabItem: {},
    };
  }

  onProductTabChange = (catId, tabItem) => {
    this.setState({ currentCatId: catId, currentTabItem: tabItem });
  };

  getUrlWithHttp = url => url.replace(/(^\/\/)/, 'https:$1');

  getSlideItem = item => {
    const { id, items, largeImageUrl, pdpUrl } = item;
    const looksImage = items.slice(0, 2);
    const hiddenImagesCount = items.length - looksImage.length;
    return (
      <Anchor
        key={id}
        className="moduleQ-image-link"
        to={pdpUrl}
        asPath={pdpUrl}
        dataLocator={`${getLocator('moduleQ_product_image')}`}
      >
        <div className="looks-large-image">
          <Image alt={id} src={this.getUrlWithHttp(largeImageUrl)} />
        </div>
        <div className="looks-images-wrapper">
          {looksImage.map(({ smallImageUrl, name, remoteId }) => {
            return (
              <div className="looks-image">
                <Image key={remoteId} alt={name} src={this.getUrlWithHttp(smallImageUrl)} />
              </div>
            );
          })}
          <div className="looks-image looks-image-last">
            <BodyCopy fontFamily="secondary" fontSize="fs22" fontWeight="extrabold">
              {`+${hiddenImagesCount}`}
            </BodyCopy>
          </div>
        </div>
      </Anchor>
    );
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

  render() {
    const {
      className,
      bgClass,
      divTabs,
      headerText,
      promoBanner,
      styliticsProductTabList,
    } = this.props;
    const { currentCatId } = this.state;
    const { CAROUSEL_OPTIONS, TOTAL_IMAGES } = config;
    let selectedProductList = styliticsProductTabList[currentCatId] || [];
    selectedProductList = selectedProductList.slice(0, TOTAL_IMAGES);
    selectedProductList = selectedProductList.concat(selectedProductList);

    return (
      <Grid className={`${className} ${bgClass} moduleQ`}>
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
                dataLocator={getLocator('moduleQ_header_text')}
              />
            )}
            {promoBanner && (
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
            {selectedProductList.length ? (
              <Carousel
                options={CAROUSEL_OPTIONS}
                carouselConfig={{
                  autoplay: false,
                  variation: 'big-arrows',
                  customArrowLeft: getIconPath('carousel-big-carrot'),
                  customArrowRight: getIconPath('carousel-big-carrot'),
                }}
              >
                {selectedProductList.map(item => this.getSlideItem(item))}
              </Carousel>
            ) : null}
          </Col>
        </Row>
        {this.getCurrentCtaButton()}
      </Grid>
    );
  }
}

ModuleQ.defaultProps = {
  bgClass: '',
  className: '',
  promoBanner: [],
};

ModuleQ.propTypes = {
  bgClass: PropTypes.string,
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
};

const styledModuleQ = withStyles(errorBoundary(ModuleQ), moduleQStyle);
styledModuleQ.defaultProps = ModuleQ.defaultProps;
export default styledModuleQ;
export { ModuleQ as ModuleQVanilla };
