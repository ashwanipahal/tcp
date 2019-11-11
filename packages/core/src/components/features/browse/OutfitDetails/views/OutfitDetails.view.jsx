import React from 'react';
import PropTypes from 'prop-types';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import { Row, Col, Image, Anchor } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailsStyle from '../OutfitDetails.style';
import OutfitProduct from '../molecules/OutfitProduct/OutfitProduct';
import { routerPush } from '../../../../../utils';

const routesBack = e => {
  e.preventDefault();
  if (window.history.length > 2) window.history.back();
  else {
    routerPush('/', '/home');
  }
};

const OutfitDetailsView = ({
  className,
  outfitImageUrl,
  outfitProducts,
  plpLabels,
  handleAddToBag,
  addToBagEcom,
  currentState,
  addToBagError,
  addToBagErrorId,
  isLoggedIn,
  addToFavorites,
  currencyExchange,
  currencySymbol,
  labels,
  pdpLabels,
  outfitId,
}) => {
  const backLabel = labels && labels.lbl_outfit_back;
  const recommendationAttributes = {
    variations: 'moduleO',
    page: Constants.RECOMMENDATIONS_PAGES_MAPPING.OUTFIT,
    partNumber: outfitId,
    priceOnly: true,
    showLoyaltyPromotionMessage: false,
    headerAlignment: 'left',
  };
  return (
    <>
      <Row className={className}>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          ignoreGutter={{ small: true }}
          className="outfit-back-button"
        >
          <Anchor
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            handleLinkClick={routesBack}
            noLink
            className={`${className}__backlink`}
            title={backLabel}
          >
            <span className="left-arrow" />
            {backLabel}
          </Anchor>
        </Col>
        <Col
          colSize={{ small: 6, medium: 3, large: 5 }}
          ignoreGutter={{ small: true }}
          className="outfit-image"
        >
          <Image className="promo-area-0" src={outfitImageUrl} />
        </Col>
        <hr className="outfit-line-break" />
        <Col
          colSize={{ small: 6, medium: 5, large: 6 }}
          offsetLeft={{ large: 1 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <ul className="outfiting-list-container">
            {outfitProducts &&
              outfitProducts.map((product, index) => (
                <li key={product.generalProductId}>
                  <OutfitProduct
                    plpLabels={plpLabels}
                    labels={labels}
                    outfitProduct={product}
                    productIndexText={`Product ${index + 1} of ${outfitProducts.length}`}
                    handleAddToBag={() => {
                      handleAddToBag(addToBagEcom, product, product.generalProductId, currentState);
                    }}
                    className="outfiting-list-details"
                    addToBagError={addToBagErrorId === product.generalProductId && addToBagError}
                    isLoggedIn={isLoggedIn}
                    addToFavorites={addToFavorites}
                    currencySymbol={currencySymbol}
                    currencyExchange={currencyExchange}
                  />
                </li>
              ))}
          </ul>
        </Col>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <div className="placeholder promo-area-1">{pdpLabels.completeTheLook}</div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <Recommendations {...recommendationAttributes} />
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <Recommendations
            headerLabel={pdpLabels.recentlyViewed}
            portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
            {...recommendationAttributes}
          />
        </Col>
      </Row>
    </>
  );
};

OutfitDetailsView.propTypes = {
  className: PropTypes.string,
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
  addToBagEcom: PropTypes.func.isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  currentState: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}),
  addToBagError: PropTypes.string,
  addToBagErrorId: PropTypes.string,
  addToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  currencyExchange: PropTypes.string,
  currencySymbol: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  outfitId: PropTypes.string,
};

OutfitDetailsView.defaultProps = {
  className: '',
  outfitImageUrl: '',
  outfitProducts: null,
  plpLabels: {},
  labels: {},
  addToBagError: '',
  addToBagErrorId: '',
  isLoggedIn: false,
  currencyExchange: 1,
  currencySymbol: 'USD',
  pdpLabels: {},
  outfitId: '',
};

export default withStyles(OutfitDetailsView, OutfitDetailsStyle);
