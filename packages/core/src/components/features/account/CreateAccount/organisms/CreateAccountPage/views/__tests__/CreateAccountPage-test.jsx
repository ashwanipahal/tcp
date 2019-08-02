import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccounPageVanilla } from '../CreateAccounPage';

describe('Create Account Page', () => {
  it('should render correctly', () => {
    const mockedcreateAccountAction = jest.fn();
    const tree = shallow(
      <CreateAccounPageVanilla
        createAccountAction={mockedcreateAccountAction}
        labels={{ lbl_createAccount_hide: 'hide', registration: {} }}
        className=""
      />
    );
    tree.instance().handleSubmitForm();
    expect(mockedcreateAccountAction).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
});
