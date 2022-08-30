import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from 'react-datepicker';
import { DateInput } from '../DateInput.view';

describe('DateInput component', () => {
  it('should render DatePicker component', () => {
    const props = {};
    const component = shallow(<DateInput {...props} />);
    expect(component.is(DatePicker)).toBeTruthy();
  });

  it('should render DatePicker component with correct selected prop', () => {
    const props = {
      input: {
        value: '01/01/1970',
      },
    };
    const component = shallow(<DateInput {...props} />);

    expect(component.prop('selected')).toEqual(new Date(props.input.value));
  });

  it('onChangeHandler should call input.onChange prop passed', () => {
    const onChangeSpy = jest.fn();
    const props = {
      input: {
        onChange: onChangeSpy,
      },
    };
    const component = shallow(<DateInput {...props} />);
    const formattedDate = '01/01/2019';
    component.instance().onChangeHandler(new Date(formattedDate));
    expect(onChangeSpy).toBeCalled();
  });
});
