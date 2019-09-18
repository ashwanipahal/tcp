import React from 'react';
import { shallow } from 'enzyme';

import ProductAddToBagContainer from '../container/ProductAddToBag.container';

describe('ProductAddToBagVanilla native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductAddToBagContainer />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set color list', () => {
    const colorFitsSizesMap = {};
    wrapper.setProps({ colorFitsSizesMap });
    expect(wrapper.props().colorList).toEqual(colorFitsSizesMap);
  });

  it('should set fit list', () => {
    const fit = {};
    const fits = [fit];
    const color = { name: 'WHITE', hasFits: true, fits };
    const colorFitsSizesMap = { color };
    wrapper.setProps({ colorFitsSizesMap });
    wrapper.instance().setState({ selectedColor: color, selectedFit: fit });
    expect(wrapper.props().fitList).toEqual(fits);
  });

  it('should set size list', () => {
    const sizes = [];
    const fit = { sizes };
    const fits = [fit];
    const color = { name: 'WHITE', hasFits: true, fits };
    const colorFitsSizesMap = { color };
    wrapper.setProps({ colorFitsSizesMap });
    wrapper.instance().setState({ selectedColor: color, selectedFit: fit });
    expect(wrapper.props().sizeList).toEqual(sizes);
  });

  it('should set selected color in state', () => {
    const sizes = [];
    const fit = { sizes };
    const fits = [fit];
    const color = { name: 'WHITE', hasFits: true, fits };
    const colorFitsSizesMap = { color };
    wrapper.setProps({ colorFitsSizesMap });
    wrapper.props().selectColor(color);
    expect(wrapper.instance().state.selectedColor).toEqual(color);
    expect(wrapper.instance().state.selectedFit).toEqual(fit);
    expect(wrapper.instance().state.selectedSize).toBeNull();
  });

  it('should set selected fit in state', () => {
    const sizes = [];
    const fit = { sizes };
    const fits = [fit];
    const color = { name: 'WHITE', hasFits: true, fits };
    const colorFitsSizesMap = { color };
    wrapper.setProps({ colorFitsSizesMap });
    wrapper.props().selectFit(fit);
    expect(wrapper.instance().state.selectedFit).toEqual(fit);
    expect(wrapper.instance().state.selectedSize).toBeNull();
  });

  it('should set selected size in state', () => {
    const size = {};
    const sizes = [size];
    const fit = { sizes };
    const fits = [fit];
    const color = { name: 'WHITE', hasFits: true, fits };
    const colorFitsSizesMap = { color };
    wrapper.setProps({ colorFitsSizesMap });
    wrapper.props().selectSize(size);
    expect(wrapper.instance().state.selectedSize).toEqual(size);
  });
});
