import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  CollapsibleLocations,
  LocationTile,
} from '@tcp/core/src/components/common/molecules/StoreLocations';
import { CountryName } from '@tcp/core/src/components/common/molecules/StoresIntlTile/styles/StoresIntlTile.style';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import { getLocator } from '@tcp/core/src/utils';
import { propTypes } from '@tcp/core/src/components/common/molecules/StoreAddressTile/views/prop-types';
import style from '../styles/StoresCountryTile.style';

class StoresCountryTile extends PureComponent {
  getCollapsibleHeader() {
    const { title } = this.props;
    return <CountryName className="title-mobile">{title}</CountryName>;
  }

  getCollapsibleContent() {
    const { children } = this.props;
    return (
      <div className="collapsible-content">
        {this.getAddressTiles()}
        {children}
      </div>
    );
  }

  getAddressTile(store) {
    const { labels, titleClickCb, dataLocatorKey } = this.props;
    return (
      <LocationTile
        labels={labels}
        store={store}
        locatorGetDirections=""
        titleClickCb={() => titleClickCb(store)}
        dataLocatorKey={dataLocatorKey}
      />
    );
  }

  getAddressTiles() {
    const { stores } = this.props;
    return (
      <Row fullBleed>
        {stores.map(store => (
          <Col
            className="store-country-item"
            key={store.basicInfo.storeName}
            colSize={{ small: 6, medium: 4, large: 2 }}
          >
            {this.getAddressTile(store)}
          </Col>
        ))}
      </Row>
    );
  }

  render() {
    const {
      children,
      className,
      title,
      isDefaultOpen,
      dataLocatorKey,
      onToggleCallback,
    } = this.props;
    return (
      <div className={className}>
        {children}
        <div className="storemodule__lg" id={`scroll-${title}`}>
          <CountryName data-locator={getLocator(`store_${dataLocatorKey}statelabel`)}>
            {title}
          </CountryName>
          {this.getAddressTiles()}
        </div>
        <div className="storemodule__sm">
          <CollapsibleLocations
            header={this.getCollapsibleHeader()}
            body={this.getCollapsibleContent()}
            className={className}
            iconClose="plus-icon"
            iconOpen="minus-icon"
            defaultOpen={isDefaultOpen}
            id={`scroll-${title}`}
            onToggleCallback={onToggleCallback}
            showHeaderAlways
            isAccordionTablet
          />
        </div>
      </div>
    );
  }
}

StoresCountryTile.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  stores: PropTypes.arrayOf(propTypes.store),
  labels: PropTypes.shape({}).isRequired,
  titleClickCb: PropTypes.func.isRequired,
  isDefaultOpen: PropTypes.bool,
  dataLocatorKey: PropTypes.string,
  onToggleCallback: PropTypes.func,
};

StoresCountryTile.defaultProps = {
  children: null,
  stores: [],
  isDefaultOpen: false,
  dataLocatorKey: '',
  onToggleCallback: null,
};

export default withStyles(StoresCountryTile, style);
