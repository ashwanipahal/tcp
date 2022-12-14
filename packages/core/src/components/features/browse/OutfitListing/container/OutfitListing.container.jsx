import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import { PropTypes } from 'prop-types';
import OutfitListing from '../views/index';
import getLabels from './OutfitListing.selectors';
import { getStyliticsProductTabListSelector } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.selector';
import { styliticsProductTabListDataReqforOutfit } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.actions';
import { getPlpProducts } from '../../ProductListing/container/ProductListing.actions';
import { getPLPTopPromos } from '../../ProductListing/container/ProductListing.selectors';

class OutfitListingContainer extends React.PureComponent {
  static getInitialProps = async ({ props }) => {
    const { getStyliticsProductTabListData, asPath, navigation, getProducts } = props;
    const categoryId = (navigation && navigation.getParam('outfitPath')) || asPath;
    await getStyliticsProductTabListData({ categoryId, count: 20 });
    if (navigation) {
      const newNavigationUrl = navigation.getParam('url');
      getProducts({ URI: 'category', url: newNavigationUrl, ignoreCache: true });
    }
  };

  componentDidUpdate({ navigation: oldNavigation }) {
    const { getProducts, navigation, getStyliticsProductTabListData } = this.props;
    // This is needed only for mobile app since the product listing container doesnt have a role here
    if (navigation) {
      const oldNavigationUrl = oldNavigation.getParam('url');
      const newNavigationUrl = navigation.getParam('url');
      const categoryId = newNavigationUrl && newNavigationUrl.split('/c?cid=')[1];
      if (oldNavigationUrl !== newNavigationUrl) {
        getProducts({ URI: 'category', url: newNavigationUrl, ignoreCache: true });
        getStyliticsProductTabListData({ categoryId, count: 20 });
      }
    }
  }

  render() {
    const {
      labels,
      styliticsProductTabList,
      asPath,
      breadCrumbs,
      navTree,
      currentNavIds,
      longDescription,
      categoryId,
      navigation,
      asPathVal,
      plpTopPromos,
    } = this.props;

    const outfitPath = asPath || (navigation && navigation.getParam('outfitPath'));

    return (
      <OutfitListing
        labels={labels}
        outfitDetails={styliticsProductTabList}
        breadCrumbs={breadCrumbs}
        navTree={navTree}
        currentNavIds={currentNavIds}
        longDescription={longDescription}
        categoryId={categoryId}
        asPath={outfitPath}
        navigation={navigation}
        plpTopPromos={plpTopPromos}
        asPathVal={asPathVal}
      />
    );
  }
}

OutfitListingContainer.pageInfo = {
  pageId: 'outfit',
  pageData: {
    pageName: 'outfit',
    pageSection: 'outfit',
    pageSubSection: 'outfit',
  },
};

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
    deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
    plpTopPromos: getPLPTopPromos(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStyliticsProductTabListData: payload => {
      dispatch(styliticsProductTabListDataReqforOutfit(payload));
    },
    getProducts: payload => {
      dispatch(getPlpProducts(payload));
    },
  };
};

OutfitListingContainer.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  asPath: PropTypes.string.isRequired,
  styliticsProductTabList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  categoryId: PropTypes.string,
  navigation: PropTypes.instanceOf(Object),
  plpTopPromos: PropTypes.arrayOf(PropTypes.shape({})),
  asPathVal: PropTypes.string,
  getProducts: PropTypes.func,
  getStyliticsProductTabListData: PropTypes.func.isRequired,
};

OutfitListingContainer.defaultProps = {
  labels: {},
  breadCrumbs: [],
  navTree: {},
  currentNavIds: [],
  longDescription: '',
  categoryId: '',
  navigation: null,
  plpTopPromos: [],
  asPathVal: '',
  getProducts: null,
};

export default withIsomorphicRenderer({
  WrappedComponent: OutfitListingContainer,
  mapStateToProps,
  mapDispatchToProps,
});
