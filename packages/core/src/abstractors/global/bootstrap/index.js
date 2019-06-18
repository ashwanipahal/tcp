import layoutAbstractor from '../layout';
import labelsAbstractor from '../labels';
import headerAbstractor from '../header';
import footerAbstractor from '../footer';
import moduleDAbstractor from '../moduleD';

/**
 * Responsible for making all the http requests that need to be resolved before loading the application
 *  -   Layout
 *  -   Header
 *  -   Footer
 *  -   Labels
 *  -   Module D
 */
export default async () => {
  const response = {};
  try {
    response.layout = await layoutAbstractor.getLayoutData();
    response.header = await headerAbstractor.getHeaderData();
    response.footer = await footerAbstractor.getFooterData();
    response.labels = await labelsAbstractor.getLabelsData();
    response.moduleD = await moduleDAbstractor.getModuleDData();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return response;
};
