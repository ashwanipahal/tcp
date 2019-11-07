import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitListingStyle from '../OutfitListing.style';
import GlobalNavigationMenuDesktopL2 from '../../ProductListing/molecules/GlobalNavigationMenuDesktopL2/views';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ReadMore from '../../ProductListing/molecules/ReadMore/views';
import SpotlightContainer from '../../ProductListing/molecules/Spotlight/container/Spotlight.container';
import OutfitTileSection from '../OutfitTileSection.view';

const OutfitListingView = ({
  className,
  labels,
  // eslint-disable-next-line no-unused-vars
  outfitDetails, // TODO: with Outfit lisiting functional story
  breadCrumbs,
  navTree,
  currentNavIds,
  longDescription,
  categoryId,
  asPath,
}) => {
  return (
    <>
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="bread-crumb">
              <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col hideCol={{ small: true, medium: true }} colSize={{ small: 6, medium: 8, large: 2 }}>
            <div className="sidebar">
              <GlobalNavigationMenuDesktopL2
                navigationTree={navTree}
                activeCategoryIds={currentNavIds}
              />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 10 }}>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <OutfitTileSection asPath={asPath} labels={labels} outfitDetails={outfitDetails} />
              {/* <ProductsGrid productsBlock={productsBlock} labels={labels} {...otherProps} /> */}
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <ReadMore
                description={longDescription}
                labels={labels}
                className={`${className} seo-text`}
              />
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <SpotlightContainer categoryId={categoryId} />
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

OutfitListingView.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  outfitDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  categoryId: PropTypes.string,
  asPath: PropTypes.string,
};

OutfitListingView.defaultProps = {
  className: '',
  labels: {},
  breadCrumbs: [],
  navTree: {},
  currentNavIds: [],
  longDescription: '',
  categoryId: '',
  asPath: '',
};

export default withStyles(OutfitListingView, OutfitListingStyle);
