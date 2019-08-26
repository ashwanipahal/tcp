import React from 'react';
import { shallow } from 'enzyme';
import PrescreenCode from '../PreScreenCode';

describe('PreScreenCode component', () => {
  const props = {
    labels: {
      plcc_form_prescreen_optional: 'Enter a Pre screen code (optional)',
      plcc_form_prescreencodetext: 'Click here to unbox the link',
      plcc_form_clickHere: 'click here',
      plcc_form_enterHere: 'Enter the link here',
    },
  };
  const component = shallow(<PrescreenCode {...props} />);

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should be called with handleClick', () => {
    component.instance().handleClick();
  });
});
