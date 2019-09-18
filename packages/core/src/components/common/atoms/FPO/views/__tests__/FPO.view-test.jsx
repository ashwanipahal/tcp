import React from 'react';
import { shallow } from 'enzyme';
import FPO from '../FPO.view';

describe('FPO Component', () => {
  const props = {
    text: 'FPO Text',
  };

  it('should render correctly', () => {
    const tree = shallow(<FPO {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
