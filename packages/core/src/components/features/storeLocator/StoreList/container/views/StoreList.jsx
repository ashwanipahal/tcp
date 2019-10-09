import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  routeToStoreDetails,
  scrollToParticularElement,
  isClient,
  getLocator,
} from '../../../../../../utils';
import { Anchor } from '../../../../../common/atoms';
import { StoreSelector, StoresCountryTile } from '../../../../../common/molecules';
import style from '../styles/StoreList.style';

/**
 *
 * @param {String} className - classname
 * @param {Object} labels - labels for the page
 * @param {Object} storesList - list of US and CA stores
 */
export const StoreList = ({ className, labels, storesList }) => {
  const [location, setLocation] = useState();
  useEffect(() => {
    const scrollToElem = document.getElementById(`scroll-${location}`);
    if (scrollToElem) {
      scrollToParticularElement(scrollToElem);
    }
  });
  const { storeListUS, storeListCA } = storesList;
  const finalStores =
    Array.isArray(storeListUS) && Array.isArray(storeListCA)
      ? [...storeListUS, ...storeListCA]
      : [];
  const stores = finalStores.map(store => ({
    title: store.displayName,
    content: store.displayName,
    value: store.displayName,
  }));

  return (
    <div className={className}>
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        handleLinkClick={e => {
          e.preventDefault();
          if (isClient()) window.history.back();
        }}
        noLink
        className={`${className}__backlink`}
        title={labels.lbl_storelist_backLink}
        dataLocator={getLocator('store_USCanadabacklink')}
      >
        <span className="left-arrow" />
        {labels.lbl_storelist_backLink}
      </Anchor>
      {finalStores.length > 0 && (
        <StoreSelector
          titleText={labels.lbl_storelist_searchByStates}
          defaultSelectText={labels.lbl_storelist_searchByStates_dropdown}
          options={stores}
          selectedLocation={location}
          selectionCallback={(_, v) => setLocation(v)}
          dataLocator="store_USCanadasearchlabel"
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
            dataLocatorKey="USCanada"
          />
        ))}
    </div>
  );
};

StoreList.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
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
  labels: {},
};

export default withStyles(StoreList, style);

export { StoreList as StoreListVanilla };
