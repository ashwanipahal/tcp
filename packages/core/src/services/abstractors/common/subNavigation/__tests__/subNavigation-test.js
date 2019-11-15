import { fromJS } from 'immutable';
import { DataAbstractor } from '../subNavigation';

jest.mock('../../../../handler/handler');

it('Sub navigation Abstractor | DataAbstractor | processData', () => {
  const rawData = fromJS({
    subNavigation: [],
  });
  const processedData = fromJS({
    subNavigation: [],
  });
  DataAbstractor.processData(rawData).then(data => {
    expect(data).toMatchObject(processedData);
  });
});
