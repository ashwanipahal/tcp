import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CollapsibleContainer from '@tcp/core/src/components/common/molecules/CollapsibleContainer';
import StoreAddressTile from '@tcp/core/src/components/common/molecules/StoreAddressTile';
import { propTypes } from '@tcp/core/src/components/common/molecules/StoreAddressTile/views/prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import { getViewportInfo, isClient } from '@tcp/core/src/utils';
import style, { collapsibleStyles, tileStyles } from '../styles/StoreLocations.style';

export const CollapsibleLocations = withStyles(CollapsibleContainer, collapsibleStyles);
export const LocationTile = withStyles(StoreAddressTile, tileStyles);

class StoreLocations extends PureComponent {
  getCollapsibleHeader() {
    const { labels } = this.props;
    return (
      <span className="collapsible-header-text">{labels.lbl_storedetails_locations_title}</span>
    );
  }

  getCollapsibleContent() {
    const { stores, children } = this.props;
    return (
      <div className="collapsible-content">
        {stores.map(store => this.getAddressTitle(store))}
        {children}
      </div>
    );
  }

  getAddressTitle(store) {
    const { labels, openStoreDetails } = this.props;
    const tileLabels = {
      ...labels,
      lbl_storelanding_getdirections_link: labels.lbl_storedetails_locations_details_btn,
    };
    return (
      <LocationTile
        labels={tileLabels}
        store={store}
        openStoreDirections={() => openStoreDetails(store)}
        locatorGetDirections="open-store-details"
      />
    );
  }

  render() {
    const { children, className, stores, labels } = this.props;
    if (isClient() && getViewportInfo().isMobile) {
      return (
        <CollapsibleLocations
          header={this.getCollapsibleHeader()}
          body={this.getCollapsibleContent()}
        />
      );
    }
    return (
      <div className={className}>
        <h3 className="locations-title">{labels.lbl_storedetails_locations_title}</h3>
        <Row fullBleed>
          {stores.map(store => (
            <Col key={store.basicInfo.storeName} colSize={{ small: 6, medium: 4, large: 3 }}>
              {this.getAddressTitle(store)}
            </Col>
          ))}
        </Row>
        {children}
      </div>
    );
  }
}

StoreLocations.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  labels: PropTypes.shape({
    lbl_storedetails_locations_details_btn: PropTypes.string,
    lbl_storedetails_locations_title: PropTypes.string,
  }).isRequired,
  stores: PropTypes.arrayOf(PropTypes.shape(propTypes.store)),
  openStoreDetails: PropTypes.func,
};

StoreLocations.defaultProps = {
  children: null,
  stores: [],
  openStoreDetails: null,
};

export default withStyles(StoreLocations, style);
