import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import { PropTypes } from 'prop-types';
import OutfitListing from '../views/index';
import getLabels from './OutfitListing.selectors';
import { getStyliticsProductTabListSelector } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.selector';
import { styliticsProductTabListDataReqforOutfit } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.actions';

class OutfitListingContainer extends React.PureComponent {
  static getInitialProps = async ({ props }) => {
    const { getStyliticsProductTabListData, asPath, navigation } = props;
    const categoryId = (navigation && navigation.getParam('outfitPath')) || asPath;
    await getStyliticsProductTabListData({ categoryId, count: 20 });
  };

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
      plpTopPromos,
      asPathVal,
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

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
    deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStyliticsProductTabListData: payload => {
      dispatch(styliticsProductTabListDataReqforOutfit(payload));
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
  plpTopPromos: PropTypes.shape({}),
  asPathVal: PropTypes.string,
};

OutfitListingContainer.defaultProps = {
  labels: {},
  breadCrumbs: [],
  navTree: {},
  currentNavIds: [],
  longDescription: '',
  categoryId: '',
  navigation: null,
  plpTopPromos: {},
  asPathVal: '',
};

export default withIsomorphicRenderer({
  WrappedComponent: OutfitListingContainer,
  mapStateToProps,
  mapDispatchToProps,
});
