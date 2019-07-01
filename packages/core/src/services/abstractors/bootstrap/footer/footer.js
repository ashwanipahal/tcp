import mock from './mock';
import handler from '../../../handler';

const processFooterMiddle = footerMiddleObj => {
  const formattedFooterMiddleArray = [];
  formattedFooterMiddleArray.push(
    {
      header: footerMiddleObj.mprWrapper[0].linkClass,
      links: footerMiddleObj.mprWrapper[0].linkList,
    },
    {
      header: (footerMiddleObj.mprWrapper[1] && footerMiddleObj.mprWrapper[1].linkClass) || '',
      links: (footerMiddleObj.mprWrapper[1] && footerMiddleObj.mprWrapper[1].linkList) || [],
    }
  );

  // eslint-disable-next-line
  for (let i = 0; i < footerMiddleObj.linkColumns.length; i++) {
    formattedFooterMiddleArray.push({
      header: footerMiddleObj.linkColumns[i].text,
      links: footerMiddleObj.linkColumns[i].linkList,
      isSubHeader: footerMiddleObj.linkColumns[i].isSubHeader,
    });
  }
  return formattedFooterMiddleArray;
};

/**
 * Abstractor layer for loading data from API for Footer related components
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => ({
    submodules: {
      footerTop: data.submodules.footerTop,
      footerMiddle: processFooterMiddle(data.submodules.footerMiddle.composites),
      footerBottom: data.submodules.footerBottom,
    },
  }),
};
export default Abstractor;
