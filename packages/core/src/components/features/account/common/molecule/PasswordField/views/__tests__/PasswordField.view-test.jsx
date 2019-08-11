import React from 'react';
import { shallow } from 'enzyme';
import { PasswordField } from '../PasswordField.view';

describe('PasswordField component', () => {
  it('should renders correctly', () => {
    const props = {
      showText: 'show',
      hideText: 'hide',
    };
    const component = shallow(<PasswordField {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('changeType should change type to text', () => {
    const props = {
      showText: 'show',
      hideText: 'hide',
    };
    const component = shallow(<PasswordField {...props} />);
    component.instance().changeType({ preventDefault: () => {} });
    expect(component.state('type')).toEqual('text');
  });
});
