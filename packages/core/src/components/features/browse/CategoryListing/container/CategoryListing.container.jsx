import React, { PureComponent, Fragment } from 'react';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import CategoryListing from './views/CategoryListing';

export class CategoryListingContainer extends PureComponent {
  static getInitialProps = async ({ props }) => {
    const { getLayout } = props;
    await getLayout('boy', 'categoryListingPage');
  };

  render() {
    return (
      <Fragment>
        <CategoryListing />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
  };
};

export const mapDispatchToProps = dispatch => ({
  getLayout: (pageName, layoutName) => dispatch(fetchPageLayout(pageName, layoutName)),
});

export default withIsomorphicRenderer({
  WrappedComponent: CategoryListingContainer,
  mapStateToProps,
  mapDispatchToProps,
});
