import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import { createLayoutPath } from '@tcp/core/src/utils';
import GetCandidGallery from '@tcp/core/src/components/common/molecules/GetCandidGallery/views/GetCandidGallery';
import StoresInternational from '@tcp/core/src/components/features/storeLocator/StoresInternational/container';
import Static from '../components/features/content/Static';
import constants from '../constants';

class Content extends React.Component {
  static async getInitialProps({ store, isServer, query }) {
    const { contentType: urlPath } = query;
    const formattedUrlPath = createLayoutPath(urlPath);
    if (!isServer && urlPath) {
      const state = store.getState();
      if (
        urlPath &&
        !constants.staticPagesWithOwnTemplate.includes(urlPath) &&
        !state.Layouts[formattedUrlPath]
      ) {
        store.dispatch(fetchPageLayout(urlPath));
      }
    }
    return { formattedUrlPath };
  }

  render() {
    const { urlPath } = this.props;
    let contentComponent;
    switch (urlPath) {
      case 'mystyleplace':
        contentComponent = <GetCandidGallery />;
        break;
      case 'international-stores':
        contentComponent = <StoresInternational />;
        break;
      default:
        contentComponent = <Static urlPath={urlPath} />;
    }
    return contentComponent;
  }
}

Content.pageInfo = {
  staticPage: true,
  paramName: 'contentType',
};

Content.propTypes = {
  urlPath: PropTypes.string.isRequired,
};

export default withRouter(Content);
