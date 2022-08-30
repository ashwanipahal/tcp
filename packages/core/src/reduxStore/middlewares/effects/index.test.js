import configureMockStore from 'redux-mock-store';
import factory from '.';

describe(__filename, () => {
  it('throws an error when created without a function to call', () => {
    expect(() => {
      factory.create();
    }).toThrow('needs a function');
  });

  it('calls the supplied function when matching actions get dispatched', () => {
    const track = jest.fn();
    const conditions = [action => action.type === 'FOO'];
    const middleware = factory.create(track, conditions);
    const mockStore = configureMockStore([middleware]);
    const store = mockStore();
    store.dispatch({ type: 'FOO' });
    expect(track).toBeCalledTimes(1);
  });
});
