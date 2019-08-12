import gql from 'graphql-tag';
import mock from './mock';
import handler, { executeExternalAPICall } from '../../../handler';
import countryListQuery from '../../../handler/graphQL/queries/countrySelector';
import endpoints from '../../../endpoints';

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
  submitData: () => {
    const payload = {
      header: {
        'X-Cookie': '',
        storeId: '10152',
        catalogId: '10552',
        langId: '-1',
      },
      body: {
        storeId: '10152',
        catalogId: '10552',
        langId: '-1',
        cc: 'US',
        er: '1.0',
        mm: '1.0',
        URL: 'http://www.childrensplace.com/',
        ccd: 'CA',
        languageTCP: 'en_US',
        selLanguage: 'en_US',
        curr: 'USD',
        orderId: '.',
        USA: 'USD',
        CA: 'CAD',
      },
      webService: endpoints.addShipToStore,
    };
    return executeExternalAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  getMock: () => {
    return mock;
  },
  processData: data => data,
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
