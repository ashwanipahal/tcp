import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf/RenderPerf';
import { HERO_VISIBLE, NAVIGATION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import { Grid } from '@tcp/core/src/components/common/molecules';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/CategoryListing.style';

class CategoryListing extends PureComponent {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Grid className={className}>
          <Row fullBleed>
            <Col colSize={{ large: 12, medium: 8, small: 6 }}>Heading</Col>
            <Col colSize={{ large: 12, medium: 8, small: 6 }}>
              Promo Banner
              {/* UX timer */}
              <RenderPerf.Measure name={HERO_VISIBLE} />
            </Col>
          </Row>
          <Row fullBleed>
            <Col
              colSize={{ large: 3, medium: 8, small: 6 }}
              hideCol={{ small: true, medium: true }}
            >
              Left Panel
              {/* UX timer */}
              <RenderPerf.Measure name={NAVIGATION_VISIBLE} />
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
};

CategoryListing.defaultProps = {};

export default withStyles(CategoryListing, style);
export { CategoryListing as CategoryListingVanilla };
