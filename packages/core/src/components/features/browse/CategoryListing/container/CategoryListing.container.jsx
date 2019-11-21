import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import CategoryListing from './views/CategoryListing';
import { getCategoryIds, getImagesGrids, getSeoText, getCategoryName } from '../utils/utility';
import { getLabels } from './CategoryListing.selectors';

export class CategoryListingContainer extends PureComponent {
  static getInitialProps = async ({ props }) => {
    const {
      getLayout,
      router: { asPath },
    } = props;

    await getLayout(getCategoryName(asPath));
  };

  componentDidUpdate(prevProps) {
    const {
      getLayout,
      router: { asPath },
    } = this.props;

    const {
      router: { asPath: prevAsPath },
    } = prevProps;
    if (getCategoryName(prevAsPath) !== getCategoryName(asPath)) {
      getLayout(getCategoryName(asPath));
    }
  }

  render() {
    const {
      layouts,
      Modules,
      navigationData,
      router: {
        query: { cid },
        asPath,
      },
    } = this.props;

    const categoryListingSlots =
      (layouts[getCategoryName(asPath)] && layouts[getCategoryName(asPath)].slots) || [];

    const categoryIds = getCategoryIds(categoryListingSlots);
    const categoryPromoModules = getImagesGrids(categoryIds, Modules);
    const seoText = getSeoText(navigationData, cid);
    return (
      <Fragment>
        <CategoryListing
          {...this.props}
          seoText={seoText}
          categoryPromoModules={categoryPromoModules}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
    layouts: state.Layouts || {},
    Modules: state.Modules || {},
    navigationData: (state.Navigation && state.Navigation.navigationData) || [],
    labels: getLabels(state),
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
  layouts: PropTypes.shape({}).isRequired,
  navigationData: PropTypes.shape([]).isRequired,
  getLayout: PropTypes.func.isRequired,
};

export default withIsomorphicRenderer({
  WrappedComponent: CategoryListingContainer,
  mapStateToProps,
  mapDispatchToProps,
});
