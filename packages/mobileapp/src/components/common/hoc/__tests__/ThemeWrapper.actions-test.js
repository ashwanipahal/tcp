import { UPDATE_APP_TYPE } from '../ThemeWrapper.constrants';
import updateAppType from '../ThemeWrapper.actions';

describe('#TheameWrapper actioons', () => {
  it('updateAppType type should should be UPDATE_APP_TYPE', () => {
    expect(updateAppType().type).toBe(UPDATE_APP_TYPE);
  });
  it('updateAppType default payload should undefined ', () => {
    expect(updateAppType().payload).toBe(undefined);
  });
});
