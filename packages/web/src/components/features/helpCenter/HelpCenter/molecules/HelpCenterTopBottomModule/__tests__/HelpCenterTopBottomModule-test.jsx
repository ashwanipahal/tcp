import React from 'react';
import { shallow } from 'enzyme';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { HelpCenterTopBottomModuleVanilla } from '../views/HelpCenterTopBottomModule';

describe('HelpCenterTopBottomModule component', () => {
  it('HelpCenterTopBottomModule component renders correctly without props', () => {
    const component = shallow(<HelpCenterTopBottomModuleVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('HelpCenterTopBottomModule component renders correctly with props', () => {
    const props = {
      className: 'test-class',
      richTextList: [
        {
          text: '<h4>MOCK BOTTOM</h4>',
          __typename: 'Text',
        },
      ],
      __typename: 'Composite',
      moduleName: 'moduleX',
      set: [],
    };
    const component = shallow(<HelpCenterTopBottomModuleVanilla {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
    expect(component.find(RichText)).toHaveLength(1);
  });
});
