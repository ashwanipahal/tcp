import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router'; //eslint-disable-line
import { PropTypes } from 'prop-types';

const defaultResolver = mod => mod.default;

const CategoryListing = dynamic(() =>
  import('@tcp/core/src/components/features/browse/CategoryListing').then(defaultResolver)
);

const ProductListing = dynamic(() =>
  import('@tcp/core/src/components/features/browse/ProductListing').then(defaultResolver)
);

const ListingPage = ({ navigationData, router: { asPath } }) => (
  <>
    {navigationData &&
    navigationData.find(item => item.categoryContent && item.categoryContent.asPath === asPath) ? (
      <CategoryListing />
    ) : (
      <ProductListing />
    )}
  </>
);

const mapStateToProps = state => ({
  navigationData: state.Navigation.navigationData,
});

ListingPage.propTypes = {
  navigationData: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({}),
};

ListingPage.defaultProps = {
  navigationData: [{}],
  router: {},
};

export default withRouter(connect(mapStateToProps)(ListingPage));
