import gql from 'graphql-tag';
import mock from './mock';
import handler, { executeExternalAPICall } from '../../../handler';
import countryListQuery from '../../../handler/graphQL/queries/countrySelector';
import endpoints from '../../../endpoints';
import { API_CONFIG } from '../../../config';
import { isCanada } from '../../../../utils';

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
  submitData: data => {
    const siteConfig = isCanada() ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
    const { sitesInfo } = API_CONFIG;
    const payload = {
      header: {
        'X-Cookie': document.cookie,
        storeId: siteConfig.storeId,
        catalogId: siteConfig.catalogId,
        langId: sitesInfo.langId,
      },
      body: {
        storeId: siteConfig.storeId,
        catalogId: siteConfig.catalogId,
        langId: sitesInfo.langId,
        ccd: data.country,
        languageTCP: Abstractor.getModifiedLanguageCode(data.language),
        curr: data.currency,
        cc: data.oldCountry,
        selLanguage: Abstractor.getModifiedLanguageCode(data.oldLanguage),
        er: '1.0',
        mm: '1.0',
        orderId: '.',
        USA: 'USD',
        CA: 'CAD',
        URL: 'http://www.childrensplace.com/',
      },
      webService: endpoints.addShipToStore,
    };
    return executeExternalAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  getModifiedLanguageCode: code => {
    switch (code) {
      case 'en':
        return 'en_US';
      case 'es':
        return 'es_ES';
      case 'fr':
        return 'fr_FR';
      default:
        return code;
    }
  },
  getMock: () => {
    return mock;
  },
  processData: data => data,
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
