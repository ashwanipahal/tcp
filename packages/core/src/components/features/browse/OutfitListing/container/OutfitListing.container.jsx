import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OutfitListing from '../views/index';
import { getLabels, divisionTabs, getOutfitModule, getJeanModule } from './OutfitListing.selectors';
import { getStyliticsProductTabListSelector } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.selector';
import { styliticsProductTabListDataReqforOutfit } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.actions';

class OutfitListingContainer extends React.PureComponent {
  componentDidMount() {
    const { getStyliticsProductTabListData, asPath, navigation } = this.props;
    const categoryId = (navigation && navigation.getParam('outfitPath')) || asPath;
    getStyliticsProductTabListData({ categoryId, count: 20 });
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
      divisionTabsModule,
      outfitModule,
      jeansModule,
    } = this.props;

    const outfitPath = asPath || (navigation && navigation.getParam('outfitPath'));

    console.log('jeansModule #### ', jeansModule);
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
        divisionTab={divisionTabsModule}
        outfitModule={outfitModule}
        jeansModule={jeansModule}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
    divisionTabsModule: divisionTabs(state),
    outfitModule: getOutfitModule(state),
    jeansModule: getJeanModule(state),
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
  getStyliticsProductTabListData: PropTypes.func,
  styliticsProductTabList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  categoryId: PropTypes.string,
  navigation: PropTypes.instanceOf(Object),
  divisionTabsModule: PropTypes.shape({}),
  outfitModule: PropTypes.shape({}),
  jeansModule: PropTypes.shape({}),
};

OutfitListingContainer.defaultProps = {
  labels: {},
  getStyliticsProductTabListData: () => {},
  breadCrumbs: [],
  navTree: {},
  currentNavIds: [],
  longDescription: '',
  categoryId: '',
  navigation: null,
  divisionTabsModule: {},
  outfitModule: {},
  jeansModule: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutfitListingContainer);
