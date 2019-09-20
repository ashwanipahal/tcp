import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/StoreAddressTile.style';
import TileHeader from '../../../molecules/TileHeader';
import TileBody from '../../../molecules/TileBody';

class StoreAddressTile extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {}
  openStoreDetail(e) {}

  render() {
    const {
      isMobile,
      isSelected,
      storeInfo,
      storeIndex,
      labels,
      className,
      isFavoriteStore,
      onSetAsFavorite,
    } = this.props;
    const showGymboreeStore = storeInfo.isGym;
    const wrapperClass = `${className} storelocator-storedetail-tile${
      isSelected ? '-selected' : ''
    }`;
    return (
      <div className={wrapperClass} onClick={e => this.handleClick(e)}>
        <TileHeader
          storeIndex={storeIndex}
          store={storeInfo}
          labels={labels}
          className="storelocator-storedetail-tile-header"
        />
        <TileBody
          storeIndex={storeIndex}
          store={storeInfo}
          labels={labels}
          className={className}
          openStoreDetail={e => this.openStoreDetail}
          showGymboreeStore={showGymboreeStore}
          isFavoriteStore={isFavoriteStore}
          onSetAsFavorite={onSetAsFavorite}
          className="storelocator-storedetail-tile-body"
        />
      </div>
    );
  }
}

StoreAddressTile.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

StoreAddressTile.defaultProps = {
  children: null,
};

export default withStyles(StoreAddressTile, style);
