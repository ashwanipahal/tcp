import React from 'react';
import { shallow } from 'enzyme';
import { CnCTemplateVanilla } from '../views/CnCTemplate.view';

describe('CnC template', () => {
  it('should render correctly', () => {
    const props = {
      leftSection: {},
      bagActions: {},
      showLeftSection: true,
      className: 'Cnc',
      header: {},
      isCheckoutView: true,
      isGuest: true,
    };
    const tree = shallow(<CnCTemplateVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
