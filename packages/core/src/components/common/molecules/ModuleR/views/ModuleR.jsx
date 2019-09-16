/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Anchor, Button, Col, Row, Image } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import { Grid, LinkText, PromoBanner } from '../..';
import ProductTabList from '../../../organisms/ProductTabList';
import { getLocator, redirectToPdp } from '../../../../../utils';
import { mediaQuery } from '../../../../../../styles/themes/TCP/mediaQuery';
import moduleRStyle, { ImageGridCol } from '../styles/ModuleR.style';

class ModuleR extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: null,
    };
  }

  /*
    This method is to update the state with selected category Id.
  */
  onProductTabChange = catId => {
    this.setState({
      selectedCategoryId: catId,
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
    const { layout } = this.props;
    const promoComponent = this.getPromoComponent();
    let productsList = selectedProductList;

    if (layout === 'default') {
      if (window.matchMedia(mediaQuery.smallMax).matches) {
        productsList = productsList.slice(0, 8);
        productsList.splice(4, 0, promoComponent);
      } else if (window.matchMedia(mediaQuery.mediumMax).matches) {
        productsList = productsList.slice(0, 10);
        productsList.splice(5, 0, promoComponent);
      } else {
        productsList = productsList.slice(0, 16);
        productsList.splice(8, 0, promoComponent);
      }
    } else if (window.matchMedia(mediaQuery.smallMax).matches) {
      productsList = productsList.slice(0, 9);
    } else if (window.matchMedia(mediaQuery.mediumMax).matches) {
      productsList = productsList.slice(0, 12);
    } else {
      productsList = productsList.slice(0, 18);
    }

    return productsList;
  };

  /*
    This method is to get the list of category items coming from CMS
  */
  getCategoryList() {
    const { divTabs } = this.props;

    return divTabs.map(item => {
      const {
        category: { cat_id: catId },
        text: { text },
      } = item;
      return { text, catId };
    });
  }

  /*
    This method is to get the list of tabs data coming from CMS
  */
  getDivTabMap() {
    const { divTabs } = this.props;
    return divTabs.reduce((map, item) => {
      const {
        category: { cat_id: catId },
      } = item;
      const tabsMap = map;
      tabsMap[catId] = item;
      return tabsMap;
    }, {});
  }

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

  render() {
    const { className, productTabList, headerText, layout } = this.props;
    const divTabsMap = this.getDivTabMap();
    const promoComponent = this.getPromoComponent();
    const { selectedCategoryId } = this.state;
    const selectedDivTab = divTabsMap[selectedCategoryId] || {};
    const selectedSingleCTAButton = selectedDivTab.singleCTAButton;
    let selectedProductList = productTabList[selectedCategoryId] || [];

    if (selectedProductList.length) {
      selectedProductList = this.getSelectedProductList(selectedProductList);
    }

    return (
      <Grid className={`${className} moduleR`}>
        <Row>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <LinkText
              component="div"
              headerText={headerText}
              className="promo-header"
              headingClass="moduleR-promo-header"
              dataLocator={getLocator('moduleR_header_text')}
            />
          </Col>
          {layout === 'alt' ? <div className="promo-wrapper">{promoComponent}</div> : null}
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <ProductTabList
              onProductTabChange={this.onProductTabChange}
              categoryList={this.getCategoryList()}
              dataLocator={getLocator('moduleR_cta_link')}
            />
          </Col>
        </Row>
        {this.getImageGrid(selectedProductList)}
        <Row centered>
          <Col
            className="button-wrapper"
            colSize={{
              small: 4,
              medium: 2,
              large: 2,
            }}
          >
            {selectedSingleCTAButton ? (
              <Anchor
                noLink
                to="/c/toddler-girl-bottoms"
                asPath="/c/toddler-girl-bottoms"
                dataLocator={getLocator('moduleR_cta_btn')}
              >
                <Button buttonVariation="fixed-width" className="cta-btn">
                  {selectedSingleCTAButton.text}
                </Button>
              </Anchor>
            ) : null}
          </Col>
        </Row>
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
  layout: 'default',
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
  layout: PropTypes.string,
};

export default withStyles(ModuleR, moduleRStyle);
export { ModuleR as ModuleRVanilla };
