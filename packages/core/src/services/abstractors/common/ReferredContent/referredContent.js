import handler from '../../../handler';
import Abstractor from '../../bootstrap/labels';
import { getAPIConfig } from '../../../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../../api.constants';

/**
 * Responsible for content fetching using content ID
 */
const ReferredContentDataAbstractor = {
  getData: async id => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'referredContent',
        data: { cid: id, type: 'referredContent' },
      })
      .then(response => (response ? response.data : {}));
  },
  processData: async data => {
    const result = {};
    const {
      name,
      composites: { richTextList },
    } = data.moduleX;
    result.name = name;
    result.richText = richTextList[0].text;
    return result;
  },
};

/**
 * Responsible for hitting the labels api
 */
const LabelsDataAbstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data);
  },
};

/**
 * Responsible for loading the rich text from CMS
 * @param {String} cid - Content ID
 */
export const getReferredContentById = async cid => {
  const { getData, processData } = ReferredContentDataAbstractor;
  let response = {};

  try {
    const data = await getData(cid);
    response = await processData(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return response;
};

/**
 * Responsible for loading the labels from CMS
 * @param {String} category - page specific category
 * @param {String} subCategory - sub categories to fetch exact labels
 */
export const fetchLabels = async ({ category, subCategory }) => {
  const { getData } = LabelsDataAbstractor;
  const { processData } = Abstractor;
  const apiConfig = getAPIConfig();
  let response = {};
  const labelParams = {
    module: 'labels',
    data: {
      category,
      subCategory,
      brand: apiConfig.brandIdCMS || defaultBrand,
      channel: defaultChannel,
      country: apiConfig.siteIdCMS || defaultCountry,
    },
  };

  try {
    const data = await getData(labelParams.module, labelParams.data);
    response = await processData(data.labels);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return response;
};
