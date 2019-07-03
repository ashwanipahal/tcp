import { requireNamedOnlineModule } from '../resourceLoader';

describe('requireUrlScript', () => {
  it('should call requireUrlScript', () => {
    const mockedRequireUrlScript = jest.fn();
    requireNamedOnlineModule('google.maps');
    expect(mockedRequireUrlScript).toHaveBeenCalled();
  });
});
