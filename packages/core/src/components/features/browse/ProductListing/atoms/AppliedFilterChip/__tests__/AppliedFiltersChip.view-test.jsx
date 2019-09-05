import React from 'react';
import { shallow } from 'enzyme';
import AppliedFilterChip from '../views/AppliedFilterChip.view';

describe('Custom Select is shown', () => {
  const props = {
    displayName: 'Category',
    className: '',
    onRemoveClick: jest.fn(),
    fieldName: 'categoryPath2_uFilter',
    id: 'Socks',
  };
  it('should render Applied Filter Lists ', () => {
    const component = shallow(<AppliedFilterChip {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should call handleRemoveClick', () => {
    const component = shallow(<AppliedFilterChip {...props} />);
    const searchButtonWrapper = component.find('button.applied-filter-remove-button');
    expect(searchButtonWrapper.length).toBe(1);

    searchButtonWrapper.simulate('click');
    expect(props.onRemoveClick).toHaveBeenCalled();
  });
});
