import React from 'react';
import { withRouter } from 'next/router'; //eslint-disable-line

import GetCandidGallery from '@tcp/core/src/components/common/molecules/GetCandidGallery/views/GetCandidGallery';
import StoresInternational from '@tcp/core/src/components/features/storeLocator/StoresInternational/container';
import HelpCenter from '@tcp/core/src/components/common/molecules/HelpCenter/container';

const Content = props => {
  const { router } = props;
  const { contentType } = router.query;
  let contentComponent;

  switch (contentType) {
    case 'mystyleplace':
      contentComponent = <GetCandidGallery />;
      break;
    case 'international-stores':
      contentComponent = <StoresInternational />;
      break;
    case 'help-center':
      contentComponent = <HelpCenter />;
      break;
    default:
      contentComponent = null;
  }
  return contentComponent;
};

export default withRouter(Content);
