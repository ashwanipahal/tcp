import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; // eslint-disable-line
import OutfitListing from '../views/index';
import getLabels from './OutfitListing.selectors';
import { getStyliticsProductTabListSelector } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.selector';
import { styliticsProductTabListDataReqforOutfit } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.actions';

class OutfitListingContainer extends React.PureComponent {
  componentDidMount() {
    const { getStyliticsProductTabListData, asPath } = this.props;
    getStyliticsProductTabListData({ categoryId: asPath, count: 20 });
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
    } = this.props;
    return (
      <OutfitListing
        labels={labels}
        outfitDetails={styliticsProductTabList}
        breadCrumbs={breadCrumbs}
        navTree={navTree}
        currentNavIds={currentNavIds}
        longDescription={longDescription}
        categoryId={categoryId}
        asPath={asPath}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
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
};

OutfitListingContainer.defaultProps = {
  labels: {},
  getStyliticsProductTabListData: () => {},
  breadCrumbs: [],
  navTree: {},
  currentNavIds: [],
  longDescription: '',
  categoryId: '',
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitListingContainer)
);
