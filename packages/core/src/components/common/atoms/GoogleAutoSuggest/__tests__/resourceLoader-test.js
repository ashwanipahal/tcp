import { requireNamedOnlineModule } from '../resourceLoader';

const namedModulesMap = {
  'google.maps': {
    url:
      'https://maps.googleapis.com/maps/api/js?v=3.27&client=gme-thechildrensplace&libraries=places,geometry',
    loadPromise: null,
  },
};
describe('requireUrlScript', () => {
  it('should call requireUrlScript', () => {
    const mockedRequireUrlScript = jest.fn();
    requireNamedOnlineModule('google.maps');
    expect(mockedRequireUrlScript).toHaveBeenCalled();
  });
});
