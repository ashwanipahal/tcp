import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { routeToStoreDetails, scrollToParticularElement } from '../../../../../../utils';
import { StoreSelector, StoresCountryTile } from '../../../../../common/molecules';
import style from '../styles/StoreList.style';

export const StoreList = ({ className, labels, storesList }) => {
  const [location, setLocation] = useState();
  useEffect(() => {
    const scrollEle = document.getElementById(`scroll-${location}`);
    if (scrollEle) {
      scrollToParticularElement(scrollEle);
    }
  });
  const { storeListUS, storeListCA } = storesList;
  const finalStores = [...storeListUS, ...storeListCA];
  const stores = finalStores.map(store => ({
    title: store.displayName,
    content: store.displayName,
    value: store.displayName,
  }));

  return (
    <div className={className}>
      {finalStores.length > 0 && (
        <StoreSelector
          titleText={labels.lbl_storelist_searchByStates}
          defaultSelectText={labels.lbl_storelist_searchByStates_dropdown}
          options={stores}
          selectedLocation={location}
          selectionCallback={(_, v) => setLocation(v)}
        />
      )}
      {finalStores.length > 0 &&
        finalStores.map(store => (
          <StoresCountryTile
            title={store.displayName}
            labels={labels}
            stores={store.storesList}
            titleClickCb={item => {
              const { routerHandler } = routeToStoreDetails(item);
              routerHandler();
            }}
            isDefaultOpen={location === store.displayName}
          />
        ))}
    </div>
  );
};

StoreList.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  storesList: PropTypes.shape({
    storeListUS: PropTypes.shape([]),
    storeListCA: PropTypes.shape([]),
  }),
};

StoreList.defaultProps = {
  storesList: {
    storeListUS: [],
    storeListCA: [],
  },
};

export default withStyles(StoreList, style);

export { StoreList as StoreListVanilla };
