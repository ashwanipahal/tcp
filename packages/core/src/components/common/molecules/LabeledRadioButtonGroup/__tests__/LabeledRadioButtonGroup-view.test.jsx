import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import LabeledRadioButtonGroup from '../views/LabeledRadioButtonGroup.view';

describe('LabeledRadioButtonGroup should render correctly', () => {
  let wrapper;

  const props = {
    optionsMap: fromJS([
      { value: '12-18 M', title: '12-18 M', disabled: true },
      { value: '2T', title: '2T', disabled: false },
      { value: '3T', title: '3T', disabled: false },
      { value: '4T', title: '4T', disabled: false },
      { value: '5T', title: '5T', disabled: false },
    ]),
    className: '',
    title: '5T',
    input: {
      value: {
        name: '2T',
      },
      onChange: jest.fn(),
    },
  };

  const newProps = {
    ...props,
    optionsMap: fromJS([]),
    isHideIfEmptyOptionsMap: true,
  };

  const otherProps = {
    ...props,
    isShowSelectedValueInLabel: false,
  };

  beforeEach(() => {
    wrapper = shallow(<LabeledRadioButtonGroup {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleItemChange', () => {
    const setValue = jest.spyOn(wrapper.instance(), 'setValue');
    const event = {
      target: {
        value: '3T',
      },
    };
    wrapper.instance().handleItemChange(event);
    wrapper.instance().getIndexOfValue('2T');
    expect(setValue).toHaveBeenCalled();
  });

  it('should return null', () => {
    wrapper = shallow(<LabeledRadioButtonGroup {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return null value', () => {
    wrapper = shallow(<LabeledRadioButtonGroup {...otherProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
