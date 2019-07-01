import mock from '../mock';
import ModuleDMock from '../../../common/moduleD/mock';
import ModuleHMock from '../../../common/moduleH/mock';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

/**
 * Abstractor layer for loading data from API for Layout
 */
const LayoutAbstractor = {
  getLayoutData: page => {
    return new Promise((resolve, reject) => {
      if (page === 'homepage') {
        const Layout = mock;
        sendResponse(Layout, resolve, reject);
      }
    }).then(data => data[page].items);
  },
  getModulesData: modules => {
    return new Promise((resolve, reject) => {
      if (modules.length) {
        const response = {
          data: {},
        };

        for (let i = 0; i < modules.length; i += 1) {
          const module = modules[i];
          switch (module.name) {
            case 'moduleD':
              response.data[module.data.slot] = ModuleDMock;
              break;
            case 'moduleH':
              response.data[module.data.slot] = ModuleHMock;
              break;
            default:
              break;
          }
        }

        sendResponse(response, resolve, reject);
      }
    });
  },
  processData: data => {
    const moduleObjects = LayoutAbstractor.collateModuleObject(data.items);
    return LayoutAbstractor.getModulesData(moduleObjects).then(response => {
      return response.data;
    });
  },
  collateModuleObject: items => {
    const moduleIds = [];
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
  },
  getMock: () => {
    return mock;
  },
};

export default LayoutAbstractor;
