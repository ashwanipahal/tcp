import React from 'react';
import { shallow } from 'enzyme';
import AddNewCCForm from '../views/AddNewCCForm.view';

describe('AddNewCCForm', () => {
  const mockedDispatch = jest.fn();
  const props = {
    cvvError: null,
    cardType: null,
    labels: {},
    dispatch: mockedDispatch,
    formName: '',
    billingData: { billing: {} },
  };
  it('should render correctly', () => {
    const tree = shallow(<AddNewCCForm {...props} />);
    const e = {
      preventDefault: jest.fn(),
    };
    tree.instance().onSaveToAccountChange(e, false);
    expect(mockedDispatch).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with method updateExpiryDate', () => {
    const component = shallow(<AddNewCCForm {...props} />);
    component.setState({ editMode: true });
    const instance = component.instance();
    const spyUpdateExpiryDate = jest.spyOn(instance, 'updateExpiryDate');
    instance.updateExpiryDate('2019', 'Oct');
    expect(spyUpdateExpiryDate).toHaveBeenCalled();
  });
  it('renders correctly with method updateCardDetails', () => {
    const component = shallow(<AddNewCCForm {...props} />);
    component.setState({ editMode: true });
    const instance = component.instance();
    const spyUpdateCardDetails = jest.spyOn(instance, 'updateCardDetails');
    instance.updateCardDetails('123433', '2019', 'Oct', '123');
    expect(spyUpdateCardDetails).toHaveBeenCalled();
  });
});
