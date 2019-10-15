import gql from 'graphql-tag';
import logger from '@tcp/core/src/utils/loggerInstance';
import mock from './mock';
import handler, { executeStatefulAPICall } from '../../../handler';
import countryListQuery from '../../../handler/graphQL/queries/countryList';

/**
 * Abstractor layer for loading Country List data
 */
const Abstractor = {
  getData: () => {
    const query = gql(countryListQuery.getQuery());
    return handler
      .executeGraphQLQuery(query)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  submitData: payload => {
    return executeStatefulAPICall(payload)
      .then(res => {
        return res.body;
      })
      .catch(Abstractor.handleError);
  },
  getMock: () => {
    return mock;
  },
  processData: data => data,
  handleError: e => logger.error(e),
};
export default Abstractor;
