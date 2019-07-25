import handler from '../../handler';
import mockData from './__mocks__/PaymentBannerMock';

/**
 * Responsible for fetching data with GraphQL
 * @param {String} id - Content ID to fetch content from CMS
 */
const DataAbstractor = {
  getData: async id => {
    return handler
      .fetchModuleDataFromGraphQL([
        {
          name: 'paymentBanner',
          data: { cid: id, type: 'paymentBanner' },
        },
      ])
      .then(response => (response ? response.data : mockData));
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
 * Responsible for loading the rich text from CMS
 * @param {String} cid - Content ID
 */
const PaymentAbstractor = async cid => {
  const { getData, processData } = DataAbstractor;
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

export default PaymentAbstractor;
