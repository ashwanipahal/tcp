import handler from '../../handler';

const DataAbstractor = {
  getData: async id => {
    return handler
      .fetchModuleDataFromGraphQL([
        {
          name: 'paymentBanner',
          data: { cid: id, type: 'paymentBanner' },
        },
      ])
      .then(response => response.data)
      .then(DataAbstractor.processData);
  },
  processData: data => {
    const result = {};
    const {
      name,
      composites: { richTextList: text },
    } = data;
    result.name = name;
    result.richText = text;
    return result;
  },
};

/**
 * Responsible for loading the rich text from CMS
 * @param {String} cid - Content ID
 */
const PaymentAbstractor = async cid => {
  const { getData } = DataAbstractor;
  let fetchedData = {};

  try {
    fetchedData = await getData(cid);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return fetchedData;
};

export default PaymentAbstractor;
