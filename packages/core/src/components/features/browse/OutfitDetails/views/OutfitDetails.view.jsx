import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailsStyle from '../OutfitDetails.style';
import OutfitProduct from '../molecules/OutfitProduct/OutfitProduct';
import AddedToBagContainer from '../../../CnC/AddedToBag';

const OutfitDetailsView = ({
  className,
  outfitImageUrl,
  outfitProducts,
  plpLabels,
  handleAddToBag,
  addToBagEcom,
  currentState,
}) => {
  return (
    <>
      <Row className={className}>
        <Col colSize={{ small: 6, medium: 3, large: 5 }} ignoreGutter={{ small: true }}>
          <Image className="promo-area-0" src={outfitImageUrl} />
        </Col>
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
                    outfitProduct={product}
                    productIndexText={`Product ${index + 1} of ${outfitProducts.length}`}
                    handleAddToBag={() => {
                      handleAddToBag(addToBagEcom, product, product.generalProductId, currentState);
                    }}
                  />
                </li>
              ))}
          </ul>
        </Col>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <div className="placeholder promo-area-1">Complete the look</div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="placeholder promo-area-1">You may also like</div>
        </Col>
      </Row>
      <AddedToBagContainer />
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
};

OutfitDetailsView.defaultProps = {
  className: '',
  outfitImageUrl: '',
  outfitProducts: null,
  plpLabels: {},
};

export default withStyles(OutfitDetailsView, OutfitDetailsStyle);
