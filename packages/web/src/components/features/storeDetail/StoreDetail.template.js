import React from 'react';
import { withRouter } from 'next/router';
import { fetchStoreIdFromUrlPath } from '@tcp/core/src/utils';
import StoreDetailContainer from '@tcp/core/src/components/features/storeLocator/StoreDetail';

const StoreDetail = ({ router }) => {
  const {
    query: { storeStr },
  } = router;

  return <StoreDetailContainer storeId={fetchStoreIdFromUrlPath(storeStr)} />;
};

StoreDetail.getInitActions = () => initActions;

StoreDetail.getInitialProps = pageProps => {
  return {
    ...pageProps,
    ...{
      pageData: {
        pageName: 'companyinfo:companyinfo',
        pageType: 'companyinfo',
        pageSection: 'companyinfo',
        pageSubSection: 'companyinfo',
      },
    },
  };
};

export default withRouter(StoreDetail);
