import React from 'react';
import { shallow } from 'enzyme';
import SMSFormFields from '../SMSFormFields.view';

describe('SMSFormFields', () => {
  const labels = {};
  it('should render correctly with isOrderUpdateChecked as false', () => {
    const tree = shallow(
      <SMSFormFields isOrderUpdateChecked={false} labels={labels} formSection="checkout" />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isOrderUpdateChecked as true', () => {
    const tree = shallow(<SMSFormFields isOrderUpdateChecked labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isOrderUpdateChecked as true aand dispatch is passed', () => {
    const mockedDispatch = jest.fn();
    const tree = shallow(
      <SMSFormFields isOrderUpdateChecked labels={labels} dispatch={mockedDispatch} />
    );
    tree.instance().handleChange();
    expect(mockedDispatch).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
