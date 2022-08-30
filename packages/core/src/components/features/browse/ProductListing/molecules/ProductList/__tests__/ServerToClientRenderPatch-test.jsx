import React from 'react';
import { shallow } from 'enzyme';
import ServerToClientRenderPatch from '../views/ServerToClientRenderPatch';

describe('ServerToClientRenderPatch component', () => {
  it('should renders correctly', () => {
    const component = shallow(<ServerToClientRenderPatch />);
    expect(component).toMatchSnapshot();
  });
});
