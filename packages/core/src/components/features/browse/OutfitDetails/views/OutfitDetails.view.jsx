import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailsStyle from '../OutfitDetails.style';

const OutfitDetailsView = ({ className }) => {
  return (
    <div className={className}>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 3, large: 5 }} ignoreGutter={{ small: true }}>
          <div className="promo-area-0">Image</div>
        </Col>
        <Col
          colSize={{ small: 6, medium: 5, large: 6 }}
          offsetLeft={{ large: 1 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <div className="promo-area-1">List</div>
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
  // labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitDetailsView.defaultProps = {
  className: '',
  // labels: {},
};

export default withStyles(OutfitDetailsView, OutfitDetailsStyle);
