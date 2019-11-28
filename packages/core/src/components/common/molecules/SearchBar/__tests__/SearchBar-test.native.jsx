import React from 'react';
import { shallow } from 'enzyme';

import { SearchBarVanilla } from '../views/SearchBar.view.native';

describe('SearchBar native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBarVanilla />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('SearchBar native should render correctly with showCustomizedSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBarVanilla showCustomizedSearch />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('SearchBar native should render correctly with passed props', () => {
  const props = {
    showCustomizedSearch: true,
    labels: {
      lbl_looking_for: 'I am Looking For',
    },
  };

  let component;

  beforeEach(() => {
    component = shallow(<SearchBarVanilla {...props} />);
  });

  it('render showCustomizedSearch on validation true', () => {
    expect(component).toMatchSnapshot();
  });

  it('render showCustomizedSearch on validation false', () => {
    component.setProps({ showCustomizedSearch: false });
    expect(component).toMatchSnapshot();
  });
});

describe('SearchBar native should render correctly onclick function', () => {
  let component;

  const props = {
    openSearchProductPage: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<SearchBarVanilla {...props} />);
  });

  it('check onSearchFocus', () => {
    component.instance().onSearchFocus();
    expect(component).toMatchSnapshot();
  });
});
