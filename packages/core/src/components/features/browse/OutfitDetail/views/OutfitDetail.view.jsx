import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailStyle from '../OutfitDetail.style';

const OutfitDetailView = ({ className }) => {
  return (
    <div className={className}>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-0">Outfit Detail Page</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">BREAD CRUMB</div>
          {/* {breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />} */}
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">PROMO AREA 1</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">PROMO AREA 3</div>
        </Col>
      </Row>
    </div>
  );
};

OutfitDetailView.propTypes = {
  className: PropTypes.string,
};

OutfitDetailView.defaultProps = {
  className: '',
};

export default withStyles(OutfitDetailView, OutfitDetailStyle);
