import React from 'react';
import { shallow } from 'enzyme';
import { SMSFormFieldsVanilla } from '../SMSFormFields.view';

describe('SMSFormFields', () => {
  const labels = {};
  it('should render correctly with isOrderUpdateChecked as false', () => {
    const tree = shallow(<SMSFormFieldsVanilla isOrderUpdateChecked={false} labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isOrderUpdateChecked as true', () => {
    const tree = shallow(<SMSFormFieldsVanilla isOrderUpdateChecked labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
