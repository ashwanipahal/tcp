import mock from './mock';
import handler from '../../../handler';

const processFooterMiddle = footerMiddleObj => {
  try {
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
  } catch (e) {
    return [];
  }
};

const processFooterTop = footerTop => {
  try {
    return {
      emailSignupBtn: footerTop.composites.buttonGroup[0],
      smsSignupBtn: footerTop.composites.buttonGroup[1],
      referFriendBtn: footerTop.composites.buttonGroup[2],
      legalLinks: footerTop.composites.legalLinks,
    };
  } catch (e) {
    return {};
  }
};

const processFooterBottom = footerBottom => {
  try {
    return {
      copyrightText: footerBottom.composites.richTextGroup[0].text,
      legalLinks: footerBottom.composites.linkList,
    };
  } catch (e) {
    return {};
  }
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
    ...processFooterTop(data.submodules.footerTop),
    navLinks: processFooterMiddle(data.submodules.footerMiddle.composites) || {},
    ...processFooterBottom(data.submodules.footerBottom),
  }),
};
export default Abstractor;
