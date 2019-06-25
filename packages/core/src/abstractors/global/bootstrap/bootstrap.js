import layoutAbstractor from '../layout';
import labelsAbstractor from '../labels';
import headerAbstractor from '../header';
import footerAbstractor from '../footer';

/**
 * Responsible for making all the http requests that need to be resolved before loading the application
 *  -   Layout
 *  -   Header
 *  -   Footer
 *  -   Labels
 */
const processLayoutData = (items, moduleIds) => {
  items.forEach(({ layout: { slots } }) => {
    slots.forEach(slot =>
      moduleIds.push({
        name: slot.moduleName,
        data: {
          contentId: slot.contentId,
          slot: slot.name,
        },
      })
    );
  });
  return moduleIds;
};

const fetchModules = async moduleIds => {
  return layoutAbstractor.getModulesData(moduleIds);
};

const fetchLayout = async page => {
  return layoutAbstractor.getLayoutData(page);
};

const bootstrap = async pages => {
  const response = {};
  let moduleIds = [];
  try {
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      // eslint-disable-next-line no-await-in-loop
      const layout = await fetchLayout(page);
      moduleIds = processLayoutData(layout, moduleIds);
      // eslint-disable-next-line no-await-in-loop
      const moduleData = await fetchModules(moduleIds);
      response[`${page}`] = moduleData.data;
    }
    response.header = await headerAbstractor.getHeaderData();
    response.footer = await footerAbstractor.getFooterData();
    response.labels = await labelsAbstractor.getLabelsData();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return response;
};

export default bootstrap;
