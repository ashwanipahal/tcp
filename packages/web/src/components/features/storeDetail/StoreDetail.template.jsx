import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { fetchStoreIdFromUrlPath } from '@tcp/core/src/utils';
import StoreDetailContainer from '@tcp/core/src/components/features/storeLocator/StoreDetail';
import { initActions } from '../content/HomePage/container/HomePage.actions';

const StoreDetail = ({ router }) => {
  const {
    query: { storeStr },
  } = router;

  return <StoreDetailContainer storeId={fetchStoreIdFromUrlPath(storeStr)} />;
};

StoreDetail.getInitActions = () => initActions;

StoreDetail.getInitialProps = () => {
  return {
    pageData: {
      pageName: 'companyinfo:companyinfo',
      pageType: 'companyinfo',
      pageSection: 'companyinfo',
      pageSubSection: 'companyinfo',
    },
  };
};

StoreDetail.propTypes = {
  router: PropTypes.shape({}).isRequired,
};
export default withRouter(StoreDetail);
