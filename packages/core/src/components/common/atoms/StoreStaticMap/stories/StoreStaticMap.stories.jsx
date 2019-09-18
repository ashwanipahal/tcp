import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import StoreStaticMap from '../views/StoreStaticMap';
import list from './storesList';
import { getViewportInfo } from '../../../../../utils';

const StoreStaticMapTest = ({ storesList, isCanada, isMobile, config, centeredStoreId = '' }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {isMobile ? (
        <button onClick={() => setShow(true)} style={{}}>
          Click Me
        </button>
      ) : null}
      {show || !isMobile ? (
        <StoreStaticMap
          storesList={storesList}
          isCanada={isCanada}
          isMobile
          config={config}
          centeredStoreId={centeredStoreId}
        />
      ) : null}
    </div>
  );
};
StoreStaticMapTest.propTypes = {
  storesList: PropTypes.shape([]),
  centeredStoreId: PropTypes.string,
  isCanada: PropTypes.bool,
  isMobile: PropTypes.bool,
  config: PropTypes.shape({
    googleApiKey: PropTypes.string.isRequired,
  }),
};

StoreStaticMapTest.defaultProps = {
  storesList: [],
  centeredStoreId: '',
  isMobile: false,
  isCanada: false,
  config: {},
};

const config = { googleApiKey: 'AIzaSyCzOG6DZLR-haS8xvPOr73KkIWPMBbTVI8' };

storiesOf('StoreStaticMap', module)
  .add('GoogleMap-StoreList', () => {
    return (
      <StoreStaticMap storesList={list} isMobile={getViewportInfo().isMobile} config={config} />
    );
  })
  .add('GoogleMap-Store', () => {
    return (
      <StoreStaticMap
        storesList={list}
        isMobile={getViewportInfo().isMobile}
        centeredStoreId="110850"
        config={config}
      />
    );
  })
  .add('GoogleMap-NoList', () => {
    return <StoreStaticMap isMobile={getViewportInfo().isMobile} config={config} />;
  })
  .add('GoogleMap-StoreList-MobileView', () => {
    return (
      <StoreStaticMapTest storesList={list} isMobile={getViewportInfo().isMobile} config={config} />
    );
  })
  .add('GoogleMap-Store-MobileView', () => {
    return (
      <StoreStaticMapTest
        storesList={list}
        isMobile={getViewportInfo().isMobile}
        centeredStoreId="110850"
        config={config}
      />
    );
  });
