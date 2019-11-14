import { fromJS, List } from 'immutable';
import { getNavigationData, DataAbstractor } from '../subNavigation';
import mockLeftSideNavigation from '../mock';

jest.mock('../../../../handler/handler');

it('help cener Abstractor | DataAbstractor | processData', () => {
  const rawData = fromJS({
    subNavigation: []
  });
  const processedData = fromJS({
    subNavigation: []
  });
  DataAbstractor.processData(rawData).then(data => {
    expect(data).toMatchObject(processedData);
  });
});
