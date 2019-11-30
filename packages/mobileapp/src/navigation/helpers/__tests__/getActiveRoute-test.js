import { getActiveRoute } from '../getActiveRoute';

describe('getActiveRoute', () => {
  it('should return active route correctly', () => {
    const activeRoute = getActiveRoute({
      routes: [
        {
          routeName: 'test',
          params: {},
        },
      ],
      index: 0,
    });

    expect(activeRoute.routeName).toBe('test');
  });

  it('should return null if no navigation state is passed', () => {
    const activeRoute = getActiveRoute();

    expect(activeRoute).toBeNull();
  });

  it('should return active route for nested navigation as well', () => {
    const activeRoute = getActiveRoute({
      routes: [
        {
          routeName: 'test',
          params: {},
          index: 0,
          routes: [
            {
              routeName: 'nestedRoute',
            },
          ],
        },
      ],
      index: 0,
    });

    expect(activeRoute.routeName).toBe('nestedRoute');
  });
});
