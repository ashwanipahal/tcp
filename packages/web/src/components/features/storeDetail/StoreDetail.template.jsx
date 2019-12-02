import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { fetchStoreIdFromUrlPath } from '@tcp/core/src/utils';
import StoreDetailContainer from '@tcp/core/src/components/features/storeLocator/StoreDetail';

const StoreDetail = ({ router }) => {
  const {
    query: { storeStr },
  } = router;

  return <StoreDetailContainer storeId={fetchStoreIdFromUrlPath(storeStr)} />;
};

StoreDetail.propTypes = {
  router: PropTypes.shape({}).isRequired,
};
export default withRouter(StoreDetail);
