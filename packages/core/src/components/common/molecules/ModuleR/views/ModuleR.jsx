import React from 'react';
import PropTypes from 'prop-types';

import { Anchor, Button, Col, Row, Image } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import { Grid, LinkText, PromoBanner } from '../..';
import ProductTabList from '../../../organisms/ProductTabList';
import { getLocator, redirectToPdp, viewport } from '../../../../../utils';
import moduleRStyle, { ImageGridCol } from '../styles/ModuleR.style';

/**
 * @class ModuleR - global reusable component will display featured
 * category module with category links and featured product images
 * This component is plug and play at any given slot in layout by passing required data
 * @param {productTabList} productTabList the list of data for tabs
 * @param {headerText} headerText the list of data for header
 * @param {promoBanner} promoBanner promo banner data
 */
class ModuleR extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: null,
      currentTabItem: {},
    };
  }

  /*
    This method is to update the state with selected category Id.
  */
  onProductTabChange = (catId, tabItem) => {
    this.setState({
      selectedCategoryId: catId,
      currentTabItem: tabItem,
    });
  };

  /*
    This method is to return the promo banner component.
  */
  getPromoComponent = () => {
    const { promoBanner } = this.props;
    return (
      <PromoBanner promoBanner={promoBanner} dataLocator={getLocator('moduleR_promobanner_text')} />
    );
  };

  /*
    Slicing the product as per this module requirement. This will change as currently we
    don't have an option to configure count of product in the ProductTabList component. Also
    the products live in state. We might need to move the state to local state of the
    ProductTabList so that we can hand product list requirement according to the modules requirement.
  */
  getSelectedProductList = selectedProductList => {
    const { promoBanner, bannerPosition } = this.props;
    const promoComponent = this.getPromoComponent();
    let productsList = selectedProductList;
    const { small, medium } = viewport();

    if (promoBanner && bannerPosition === 'center') {
      if (small) {
        productsList = productsList.slice(0, 8);
        productsList.splice(4, 0, promoComponent);
      } else if (medium) {
        productsList = productsList.slice(0, 10);
        productsList.splice(5, 0, promoComponent);
      } else {
        productsList = productsList.slice(0, 16);
        productsList.splice(8, 0, promoComponent);
      }
    } else if (small) {
      productsList = productsList.slice(0, 9);
    } else if (medium) {
      productsList = productsList.slice(0, 12);
    } else {
      productsList = productsList.slice(0, 18);
    }

    return productsList;
  };

  /*
    This method is to return the Image grid item
  */
  getImageGrid = selectedProductList => {
    return (
      <Row className="image-items-container">
        {selectedProductList.map((productItem, index) => {
          if (productItem.uniqueId) {
            const {
              seo_token: seoToken,
              uniqueId,
              imageUrl: [imageUrl],
            } = productItem;
            return (
              <ImageGridCol
                key={uniqueId}
                imageIndex={index}
                colSize={{
                  small: 2,
                  medium: 2,
                  large: 2,
                }}
              >
                <Anchor
                  to={redirectToPdp(uniqueId, seoToken).url}
                  asPath={redirectToPdp(uniqueId, seoToken).asPath}
                  dataLocator={`${getLocator('moduleR_product_image')}${index}`}
                >
                  <Image src={imageUrl} />
                </Anchor>
              </ImageGridCol>
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
      </Row>
    );
  };

  getCurrentCTAButton() {
    const { currentTabItem: { singleCTAButton: currentSingleCTAButton } = {} } = this.state;

    return currentSingleCTAButton ? (
      <Row centered>
        <Col
          className="button-wrapper"
          colSize={{
            small: 4,
            medium: 2,
            large: 2,
          }}
        >
          {currentSingleCTAButton ? (
            <Anchor
              noLink
              to={currentSingleCTAButton.url}
              target={currentSingleCTAButton.target}
              asPath={currentSingleCTAButton.url}
              dataLocator={getLocator('moduleR_cta_btn')}
            >
              <Button buttonVariation="fixed-width" className="cta-btn">
                {currentSingleCTAButton.text}
              </Button>
            </Anchor>
          ) : null}
        </Col>
      </Row>
    ) : null;
  }

  render() {
    const { className, divTabs, productTabList, headerText, bannerPosition } = this.props;
    const promoComponent = this.getPromoComponent();
    const { selectedCategoryId } = this.state;
    let selectedProductList = productTabList[selectedCategoryId] || [];

    if (selectedProductList.length) {
      selectedProductList = this.getSelectedProductList(selectedProductList);
    }

    return (
      <Grid className={`${className} moduleR`}>
        <div>
          {headerText ? (
            <LinkText
              component="div"
              headerText={headerText}
              className="promo-header"
              headingClass="moduleR-promo-header"
              dataLocator={getLocator('moduleR_header_text')}
            />
          ) : null}
        </div>
        {bannerPosition === 'top' ? <div className="promo-wrapper">{promoComponent}</div> : null}
        <div>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            tabItems={divTabs}
            dataLocator={getLocator('moduleR_cta_link')}
          />
        </div>
        {this.getImageGrid(selectedProductList)}
        {this.getCurrentCTAButton()}
      </Grid>
    );
  }
}

ModuleR.defaultProps = {
  className: '',
  divTabs: [],
  headerText: [],
  productTabList: {},
  promoBanner: [],
  bannerPosition: 'center',
};

ModuleR.propTypes = {
  className: PropTypes.string,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ),
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.object,
      link: PropTypes.object,
      icon: PropTypes.object,
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
  ),
  promoBanner: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        textItems: PropTypes.array,
        link: PropTypes.object,
      })
    )
  ),
  bannerPosition: PropTypes.string,
};

export default withStyles(ModuleR, moduleRStyle);
export { ModuleR as ModuleRVanilla };
