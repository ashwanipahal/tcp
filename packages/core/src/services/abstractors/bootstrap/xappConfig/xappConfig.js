import mock from './mock';
import handler from '../../../handler';
import { getAPIConfig } from '../../../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../../api.constants';

/**
 * Abstractor layer for loading data from API for Labels related components
 */
const Abstractor = {
  getData: module => {
    const apiConfig = getAPIConfig();
    const data = {
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return Abstractor.processData(mock);
  },
  processData: ({ configurationKey = [] }) => {
    const xappConfig = {};
    configurationKey.forEach(({ key, value }) => {
      xappConfig[key] = value;
    });
    return xappConfig;
  },
};
export default Abstractor;
