import handler from '../../services/handler';

/**
 * Abstractor layer for loading data from API for Labels
 */
const Abstractor = {
  getData: (module, contentId) => {
    return handler.fetchDataFromGraphQL(module, contentId).then(Abstractor.processData);
  },
  processData: data => {
    return data;
  },
};

export default Abstractor;
