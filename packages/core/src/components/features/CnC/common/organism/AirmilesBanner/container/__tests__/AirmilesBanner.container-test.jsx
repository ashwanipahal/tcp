import React from 'react';
import { shallow } from 'enzyme';
import { AirmilesBannerContainer, mapDispatchToProps } from '../AirmilesBanner.container';
import AirmilesBannerView from '../../views/AirmilesBanner.view';

describe('AirmilesBannerContainer', () => {
  const props = {
    onAddAirmilesBanner: jest.fn(),
    getAirmilesBannerData: {},
    getAirmilesBannerLabels: {},
  };

  it('should not render AirmilesBanner view section in US site', () => {
    const tree = shallow(<AirmilesBannerContainer {...props} />);
    expect(tree.is(AirmilesBannerView)).toBeFalsy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action AirmilesBanner which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onAddAirmilesBanner();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
