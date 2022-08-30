import React from 'react';
import { shallow } from 'enzyme';
import PrescreenCode from '../PreScreenCode';

describe('PreScreenCode component', () => {
  const props = {
    labels: {
      lbl_PLCCForm_preScreenCodeOpt: 'Enter a Pre screen code (optional)',
      lbl_PLCCForm_preScreenCodeText: 'Click here to unbox the link',
      lbl_PLCCForm_clickHere: 'click here',
      lbl_PLCCForm_enterHere: 'Enter the link here',
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
