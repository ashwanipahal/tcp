import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import CategoryListing from './views/CategoryListing';
import { getCategoryIds, getImagesGrids } from '../utils/utility';

export class CategoryListingContainer extends PureComponent {
  static getInitialProps = async ({ props }) => {
    const {
      getLayout,
      router: {
        query: { cid },
      },
    } = props;

    await getLayout(cid, 'categoryListingPage');
  };

  componentDidUpdate(prevProps) {
    const {
      getLayout,
      router: {
        query: { cid },
      },
    } = this.props;

    const {
      router: {
        query: { cid: preCid },
      },
    } = prevProps;
    if (preCid !== cid) {
      getLayout(cid, 'categoryListingPage');
    }
  }

  render() {
    const { categoryListingSlots, Modules } = this.props;
    const categoryIds = getCategoryIds(categoryListingSlots);
    const categoryPromoModules = getImagesGrids(categoryIds, Modules);
    return (
      <Fragment>
        <CategoryListing {...this.props} categoryPromoModules={categoryPromoModules} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
    categoryListingSlots: (state.categoryListingPage && state.categoryListingPage.slots) || [],
    Modules: state.Modules || {},
  };
};

export const mapDispatchToProps = dispatch => ({
  getLayout: (pageName, layoutName) =>
    dispatch(fetchPageLayout(pageName, layoutName, { clpPage: true })),
});

CategoryListingContainer.propTypes = {
  categoryListingSlots: PropTypes.shape([]).isRequired,
  Modules: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  getLayout: PropTypes.func.isRequired,
};

export default withIsomorphicRenderer({
  WrappedComponent: CategoryListingContainer,
  mapStateToProps,
  mapDispatchToProps,
});
