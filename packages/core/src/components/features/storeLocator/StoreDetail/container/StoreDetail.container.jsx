import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Router from 'next/router';
import { getNearByStore } from './StoreDetail.actions';
import StoreDetail from './views/StoreDetail';
import { getAPIConfig } from '../../../../../utils';
import {
  getCurrentStore,
  formatCurrentStoreToObject,
  getNearByStores,
  getLabels,
} from './StoreDetail.selectors';
// TO DO - To integrate with the labels in CMS
import mockLabels from '../../../../common/molecules/StoreAddressTile/__mocks__/labels.mock';

export class StoreDetailContainer extends PureComponent {
  static openStoreDetails(store) {
    const {
      basicInfo: {
        id,
        storeName,
        address: { city, state, zipCode },
      },
    } = store;
    const { siteId } = getAPIConfig();
    const url = `/${siteId}/store/${storeName
      .replace(/\s/g, '')
      .toLowerCase()}-${state.toLowerCase()}-${city
      .replace(/\s/g, '')
      .toLowerCase()}-${zipCode}-${id}`;

    if (Router) Router.push(url);
  }

  static openStoreDirections(store) {
    const {
      basicInfo: { address },
    } = store;
    const { addressLine1, city, state, zipCode } = address;
    window.open(
      `https://maps.google.com/maps?daddr=${addressLine1},%20${city},%20${state},%20${zipCode}`
    );
  }

  static routesBack(e) {
    e.preventDefault();
    window.history.back();
  }

  componentDidMount() {
    const { loadNearByStoreInfo, currentStoreInfo, formatStore } = this.props;
    const store = formatStore(currentStoreInfo);
    if (store.basicInfo && Object.keys(store.basicInfo).length > 0) {
      const { basicInfo } = store;
      const { coordinates, id } = basicInfo;
      const payloadArgs = {
        storeLocationId: id,
        getNearby: true,
        latitude: coordinates.lat,
        longitude: coordinates.long,
        currentStore: store,
      };
      loadNearByStoreInfo(payloadArgs);
    }
  }

  render() {
    const { currentStoreInfo, formatStore, nearByStores, labels } = this.props;
    const store = formatStore(currentStoreInfo);
    const otherStores = nearByStores && nearByStores.length > 0 ? nearByStores : [];

    return store && Object.keys(store).length > 0 ? (
      <StoreDetail
        className="storedetailinfo"
        store={store}
        labels={labels || mockLabels.StoreLocator}
        otherStores={otherStores}
        openStoreDetails={selectedStore => this.constructor.openStoreDetails(selectedStore)}
        openStoreDirections={() => this.constructor.openStoreDirections(store)}
        routesBack={this.constructor.routesBack}
      />
    ) : null;
  }
}

StoreDetailContainer.propTypes = {
  currentStoreInfo: PropTypes.instanceOf(Map),
  formatStore: PropTypes.func.isRequired,
  nearByStores: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({
    lbl_storelocators_landingpage_openInterval: PropTypes.string,
    lbl_storelocators_landingpage_milesAway: PropTypes.string,
    lbl_storelocators_landingpage_getdirections_link: PropTypes.string,
    lbl_storelocators_landingpage_favStore: PropTypes.string,
    lbl_storelocators_landingpage_setfavStore: PropTypes.string,
    lbl_storelocators_common_atThisPlace: PropTypes.string,
    lbl_storelocators_landingpage_storedetails_link: PropTypes.string,
    lbl_storelocators_details_getdirections_btn: PropTypes.string,
    lbl_storelocators_details_callstore_btn: PropTypes.string,
    lbl_storelocators_details_changestore_btn: PropTypes.string,
    lbl_storelocators_detail_mallType: PropTypes.string,
    lbl_storelocators_detail_entranceType: PropTypes.string,
    lbl_storelocators_details_locations_details_btn: PropTypes.string,
    lbl_storelocators_details_locations_title: PropTypes.string,
  }).isRequired,
  loadNearByStoreInfo: PropTypes.func.isRequired,
};

StoreDetailContainer.defaultProps = {
  currentStoreInfo: fromJS({
    basicInfo: {
      id: '',
      storeName: '',
      phone: '',
      coordinates: {},
      address: {},
    },
    hours: {},
    features: {},
  }),
};

const mapStateToProps = state => {
  return {
    currentStoreInfo: getCurrentStore(state),
    formatStore: store => formatCurrentStoreToObject(store),
    nearByStores: getNearByStores(state),
    labels: getLabels(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  loadNearByStoreInfo: payload => {
    dispatch(getNearByStore(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreDetailContainer);
