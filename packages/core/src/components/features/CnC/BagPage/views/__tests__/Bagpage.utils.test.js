import BagpageUtil from '../Bagpage.utils';

describe('Bag page Utils JS', () => {
  it('should match the state getElementStickyPosition', () => {
    const elem = {
      offsetLeft: 50,
      scrollLeft: 10,
      scrollTop: 10,
      offsetTop: 30,
      offsetParent: {
        offsetLeft: 50,
        scrollLeft: 10,
        scrollTop: 10,
        offsetTop: 30,
      },
    };
    expect(BagpageUtil.getElementStickyPosition(elem)).toBe(40);
  });

  it('should call getPageLevelHeaderHeight', () => {
    document.body.innerHTML = '<div class="condensed-header"></div>';
    expect(BagpageUtil.getPageLevelHeaderHeight()).toBe(0);
  });
});
