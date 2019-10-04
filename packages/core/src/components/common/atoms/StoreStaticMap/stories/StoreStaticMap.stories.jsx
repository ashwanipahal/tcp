import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import StoreStaticMap from '../views/StoreStaticMap';
import list from '../__mocks__/storesList.mock';
import { getViewportInfo } from '../../../../../utils';

const StoreStaticMapTest = ({ storesList, isCanada, isMobile, apiKey, centeredStoreId = '' }) => {
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
          apiKey={apiKey}
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
  apiKey: PropTypes.string.isRequired,
};

StoreStaticMapTest.defaultProps = {
  storesList: [],
  centeredStoreId: '',
  isMobile: false,
  isCanada: false,
};

const apiKey = 'AIzaSyCzOG6DZLR-haS8xvPOr73KkIWPMBbTVI8';

storiesOf('StoreStaticMap', module)
  .add('GoogleMap-StoreList', () => {
    return (
      <StoreStaticMap storesList={list} isMobile={getViewportInfo().isMobile} apiKey={apiKey} />
    );
  })
  .add('GoogleMap-Store', () => {
    return (
      <StoreStaticMap
        storesList={list}
        isMobile={getViewportInfo().isMobile}
        centeredStoreId="110850"
        apiKey={apiKey}
      />
    );
  })
  .add('GoogleMap-NoList', () => {
    return <StoreStaticMap isMobile={getViewportInfo().isMobile} apiKey={apiKey} />;
  })
  .add('GoogleMap-StoreList-MobileView', () => {
    return (
      <StoreStaticMapTest storesList={list} isMobile={getViewportInfo().isMobile} apiKey={apiKey} />
    );
  })
  .add('GoogleMap-Store-MobileView', () => {
    return (
      <StoreStaticMapTest
        storesList={list}
        isMobile={getViewportInfo().isMobile}
        centeredStoreId="110850"
        apiKey={apiKey}
      />
    );
  });
