import React from 'react';
import PropTypes from 'prop-types';
import CategoryListingRoot from '../styles/CategoryListing.style.native';

const CategoryListing = ({ children }) => <CategoryListingRoot>{children}</CategoryListingRoot>;

CategoryListing.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

CategoryListing.defaultProps = {
  children: null,
};

export default CategoryListing;
