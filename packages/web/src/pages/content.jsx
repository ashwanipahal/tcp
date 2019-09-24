import React from 'react';
import { withRouter } from 'next/router'; //eslint-disable-line

import GetCandidGallery from '@tcp/core/src/components/common/molecules/GetCandidGallery/views/GetCandidGallery';

const Content = props => {
  const { router } = props;
  const { contentType } = router.query;
  let contentComponent;

  switch (contentType) {
    case 'mystyleplace':
      contentComponent = <GetCandidGallery />;
      break;
    default:
      contentComponent = null;
  }
  return contentComponent;
};

export default withRouter(Content);
