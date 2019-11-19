import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@tcp/core/src/components/common/molecules';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style, { customBreadCrumbStyle } from '../styles/CategoryListing.style';
import GlobalNavigationMenuDesktopL2 from '../../../ProductListing/molecules/GlobalNavigationMenuDesktopL2/views';
import FixedBreadCrumbs from '../../../ProductListing/molecules/FixedBreadCrumbs/views';
import CategoryPromoImages from '../../molecules/CategoryPromoImages';

class CategoryListing extends PureComponent {
  render() {
    const { className, navTree, currentNavIds, breadCrumbs, categoryPromoModules } = this.props;

    return (
      <div className={className}>
        <Grid className={className}>
          <Row fullBleed>
            <Col className="bread-crumb-container" colSize={{ large: 12, medium: 8, small: 6 }}>
              <FixedBreadCrumbs inheritedStyles={customBreadCrumbStyle} crumbs={breadCrumbs} />
            </Col>
            <Row fullBleed>
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <div className="promo-area-1">PROMO AREA 1</div>
              </Col>
            </Row>
          </Row>
          <Row fullBleed>
            <Col
              colSize={{ large: 2, medium: 0, small: 0 }}
              hideCol={{ small: true, medium: true }}
            >
              <div className="sidebar">
                <GlobalNavigationMenuDesktopL2
                  navigationTree={navTree}
                  activeCategoryIds={currentNavIds}
                />
              </div>
            </Col>
            <Col colSize={{ large: 10, medium: 8, small: 6 }}>
              <Row fullBleed>
                <Col
                  colSize={{ large: 12, medium: 8, small: 6 }}
                  ignoreGutter={{ small: true, medium: true, large: true }}
                >
                  <CategoryPromoImages categoryPromoImages={categoryPromoModules} />
                </Col>
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
  navTree: PropTypes.shape({}),
  categoryPromoModules: PropTypes.shape({}),
  breadCrumbs: PropTypes.shape([]),
  currentNavIds: PropTypes.arrayOf(PropTypes.string),
};

CategoryListing.defaultProps = {
  navTree: {},
  categoryPromoModules: {},
  currentNavIds: [],
  breadCrumbs: [],
};

export default withStyles(CategoryListing, style);
export { CategoryListing as CategoryListingVanilla };
