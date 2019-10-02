import BagpageUtil from '../Bagpage.utils';

describe('Bag page Utils JS', () => {
  it('should match the state getElementStickyPosition', () => {
    const elem = {
      offsetTop: 50,
    };
    expect(BagpageUtil.getElementStickyPosition(elem)).toBe(50);
  });

  it('should call getPageLevelHeaderHeight', () => {
    document.body.innerHTML = '<div class="condensed-header"></div>';
    expect(BagpageUtil.getPageLevelHeaderHeight()).toBe(0);
  });
});
