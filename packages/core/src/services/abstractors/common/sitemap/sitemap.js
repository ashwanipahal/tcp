import gql from 'graphql-tag';
import logger from '@tcp/core/src/utils/loggerInstance';
import handler from '../../../handler';
import siteMapQuery from '../../../handler/graphQL/queries/sitemap';

/**
 * Abstractor layer for getting sitemap data
 */
const Abstractor = {
  getData: data => {
    const query = gql(siteMapQuery.getQuery(data));
    return handler
      .executeGraphQLQuery(query)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  processData: data => data,
  handleError: e => logger.error(e),
};

export default Abstractor;
