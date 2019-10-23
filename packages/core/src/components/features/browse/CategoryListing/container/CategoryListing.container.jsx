import React, { PureComponent, Fragment } from 'react';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryListing from './views/CategoryListing';

export class CategoryListingContainer extends PureComponent {
  pageInfo = {
    name: 'categoryListingPage',
  };

  render() {
    const { getLayout } = this.props;
    return (
      <Fragment>
        <CategoryListing getLayout={getLayout} />
      </Fragment>
    );
  }
}

CategoryListingContainer.propTypes = {
  getLayout: PropTypes.func.isRequired,
};

CategoryListingContainer.defaultProps = {};

const mapStateToProps = () => {
  return {};
};

export const mapDispatchToProps = dispatch => ({
  getLayout: (pageName, layoutName) => dispatch(fetchPageLayout(pageName, layoutName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListingContainer);
