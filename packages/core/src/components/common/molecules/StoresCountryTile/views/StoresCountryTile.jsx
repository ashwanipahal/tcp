import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  CollapsibleLocations,
  LocationTile,
} from '@tcp/core/src/components/common/molecules/StoreLocations';
import { CountryName } from '@tcp/core/src/components/common/molecules/StoresIntlTile/styles/StoresIntlTile.style';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import { getViewportInfo, isClient } from '@tcp/core/src/utils';
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
    const { labels, titleClickCb } = this.props;
    return (
      <LocationTile
        labels={labels}
        store={store}
        locatorGetDirections=""
        titleClickCb={() => titleClickCb(store)}
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
    const { children, className, title } = this.props;
    if (isClient() && (getViewportInfo().isMobile || getViewportInfo().isTablet)) {
      return (
        <CollapsibleLocations
          header={this.getCollapsibleHeader()}
          body={this.getCollapsibleContent()}
          className={className}
          iconClose="plus-icon"
          iconOpen="minus-icon"
        />
      );
    }
    return (
      <div className={className}>
        <CountryName>{title}</CountryName>
        {this.getAddressTiles()}
        {children}
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
};

StoresCountryTile.defaultProps = {
  children: null,
  stores: [],
};

export default withStyles(StoresCountryTile, style);
