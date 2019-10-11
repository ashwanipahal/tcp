import getActiveStatus from '../utils';

describe('', () => {
  it('should call getActiveStatus with id as collection', () => {
    getActiveStatus(['abc'], ['abc']);
  });

  it('should call getActiveStatus with id equals to selected tab ids', () => {
    getActiveStatus(1, 1);
  });

  it('should call getActiveStatus with id not equals to selected tab ids', () => {
    getActiveStatus(1, 2);
  });
});
