import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationViewVanilla } from '../views/Confirmation.view';
import ConfirmationAccountFormContainer from '../../common/organism/ConfirmationAccountForm';

let props = {};
describe('ConfirmationViewVanilla', () => {
  beforeEach(() => {
    props = {
      isGuest: true,
    };
  });

  it('should render correctly', () => {
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render confirmation account form', () => {
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree.find(ConfirmationAccountFormContainer).length).toBe(1);
  });

  it('should not render confirmation account form', () => {
    props.isGuest = false;
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree.find(ConfirmationAccountFormContainer).length).toBe(0);
  });
});
