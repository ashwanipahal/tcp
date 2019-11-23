import React from 'react';
import { shallow } from 'enzyme';
import { StepIndicatorVanilla } from '../StepIndicator.view';

describe('StepIndicatorVanilla', () => {
  const props = {
    className: '',
    key: 0,
    name: 'shipping',
    isActive: true,
    isComplete: false,
    onClick: jest.fn(),
  };
  it('should render correctly', () => {
    const tree = shallow(<StepIndicatorVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if props isComplete', () => {
    props.isComplete = true;
    props.isActive = false;
    const tree = shallow(<StepIndicatorVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if isPending', () => {
    props.isComplete = false;
    props.isActive = false;
    const tree = shallow(<StepIndicatorVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
