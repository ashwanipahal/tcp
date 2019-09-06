import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccounPageVanilla } from '../CreateAccounPage.native';

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
    expect(tree).toMatchSnapshot();
  });
});
