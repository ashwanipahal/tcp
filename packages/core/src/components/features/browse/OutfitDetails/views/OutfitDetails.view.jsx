import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailsStyle from '../OutfitDetails.style';
import OutfitProductList from '../molecules/OutfitProductList/OutfitProductList';

const OutfitDetailsView = ({ className, outfitImageUrl, outfitProducts }) => {
  return (
    <div className={className}>
      <Row className="placeholder">
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
              outfitProducts.map(product => (
                <li key={product.generalProductId}>
                  <OutfitProductList outfitProduct={product} />
                </li>
              ))}
          </ul>
        </Col>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <div className="promo-area-1">Complete the look</div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">You may also like</div>
        </Col>
      </Row>
    </div>
  );
};

OutfitDetailsView.propTypes = {
  className: PropTypes.string,
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
};

OutfitDetailsView.defaultProps = {
  className: '',
  outfitImageUrl: '',
  outfitProducts: {},
};

export default withStyles(OutfitDetailsView, OutfitDetailsStyle);
