import configureMockStore from 'redux-mock-store';
import createMiddleware from '.';

describe(__filename, () => {
  const track = jest.fn();
  const conditions = [
    // Additional condition to default(s)
    action => action.payload === 1234,
  ];
  const middleware = createMiddleware(track, conditions);
  const mockStore = configureMockStore([middleware]);
  const store = mockStore();

  it('calls the supplied function when tracking actions get dispatched', () => {
    store.dispatch({ type: 'TRACK_SOMETHING' });
    store.dispatch({ type: 'TRACK_SOMETHING_ELSE' });
    store.dispatch({ type: 'FOO', payload: 1234 });
    expect(track).toBeCalledTimes(3);
  });
});
