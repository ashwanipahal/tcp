import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitListingStyle from '../OutfitListing.style';

const OutfitListingView = ({ className, labels }) => {
  return (
    <div className={className}>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-0">{labels.lbl_outfit_title}</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">{labels.lbl_outfit_breadcrumb}</div>
        </Col>
      </Row>
    </div>
  );
};

OutfitListingView.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitListingView.defaultProps = {
  className: '',
  labels: {},
};

export default withStyles(OutfitListingView, OutfitListingStyle);
