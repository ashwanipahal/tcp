import React from 'react';
import { shallow } from 'enzyme';
import ModuleX from '../ModuleX';

const props = {
  className: 'test-class',
  richTextList: [
    {
      text: "<div class='test-class'>I am test </div>",
    },
  ],
  dataLocator: 'data-locator',
};

describe('Module X component', () => {
  let ModuleXComp;

  beforeEach(() => {
    ModuleXComp = shallow(<ModuleX {...props} />);
  });
  it('renders correctly', () => {
    expect(ModuleXComp).toMatchSnapshot();
  });
});
