import React from 'react';
import { shallow } from 'enzyme';
import AddNewCCForm from '../views/AddNewCCForm.view';

describe('AddNewCCForm', () => {
  it('should render correctly', () => {
    const mockedDispatch = jest.fn();
    const props = {
      cvvError: null,
      cardType: null,
      labels: {},
      dispatch: mockedDispatch,
      formName: '',
    };
    const tree = shallow(<AddNewCCForm {...props} />);
    const e = {
      preventDefault: jest.fn(),
    };
    tree.instance().onSaveToAccountChange(e, false);
    expect(mockedDispatch).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
});
