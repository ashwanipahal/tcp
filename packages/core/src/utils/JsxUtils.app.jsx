import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { SafeAreaView } from 'react-navigation';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import HeaderNew from '../../../mobileapp/src/components/common/molecules/Header/HeaderNew';
import { headerStyle } from '../../../mobileapp/src/components/common/molecules/Header/Header.style';

const getLoading = () => {
  return (
    <BodyCopy
      margin="12px 0 0 0"
      dataLocator="pdp_product_badges"
      mobileFontFamily="secondary"
      fontSize="fs14"
      fontWeight="semibold"
      color="gray.900"
      text="Loading..."
      textAlign="center"
    />
  );
};

const getNewHeader = (navigation, showSearch, navTitle) => {
  const title = navTitle || (navigation && navigation.getParam('title'));
  const capitalizedTitle = title && title.toUpperCase();
  return {
    header: props => (
      <SafeAreaView style={headerStyle} forceInset={{ top: 'always' }}>
        <HeaderNew {...props} title={capitalizedTitle} showSearch={showSearch} />
      </SafeAreaView>
    ),
    headerBackground: 'transparent',
  };
};

export { getLoading, getNewHeader };
