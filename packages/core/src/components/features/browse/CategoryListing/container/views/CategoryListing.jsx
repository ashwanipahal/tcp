import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@tcp/core/src/components/common/molecules';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/CategoryListing.style';

class CategoryListing extends PureComponent {
  componentDidMount() {
    const { getLayout } = this.props;
    getLayout('boy', 'categoryListingPage');
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Grid className={className}>
          <Row fullBleed>
            <Col colSize={{ large: 12, medium: 8, small: 6 }}>Heading</Col>
            <Col colSize={{ large: 12, medium: 8, small: 6 }}>Promo Banner</Col>
          </Row>
          <Row fullBleed>
            <Col
              colSize={{ large: 3, medium: 8, small: 6 }}
              hideCol={{ small: true, medium: true }}
            >
              Left Panel
            </Col>
            <Col colSize={{ large: 3, medium: 8, small: 6 }}>
              <Row fullBleed>
                <Col colSize={{ large: 8, medium: 8, small: 6 }}>Category List Panel</Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>Recommendations</Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>Get Candid Section</Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>SEO Section</Col>
                <Col colSize={{ large: 12, medium: 8, small: 6 }}>Ratings and Review</Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

CategoryListing.propTypes = {
  className: PropTypes.string.isRequired,
  getLayout: PropTypes.func.isRequired,
};

CategoryListing.defaultProps = {};

export default withStyles(CategoryListing, style);
