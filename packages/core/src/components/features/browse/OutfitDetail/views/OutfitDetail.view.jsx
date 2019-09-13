import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailStyle from '../OutfitDetail.style';
import config from '../OutfitDetail.config';

const OutfitDetailView = ({ className }) => {
  return (
    <div className={className}>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-0">{config.OUTFIT_TITLE}</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">{config.OUTFIT_BREADCRUMB}</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">{config.OUTFIT_PROMO_AREA_1}</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="product-detail-section">{config.OUTFIT_PROMO_AREA_2}</div>
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
