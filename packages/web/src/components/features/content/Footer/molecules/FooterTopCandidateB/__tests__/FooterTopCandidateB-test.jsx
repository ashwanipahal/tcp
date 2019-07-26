import React from 'react';
import { shallow } from 'enzyme';
import { FooterTopCandidateBVanilla } from '../FooterTopCandidateB';

describe('FooterTopCandidateBVanilla component', () => {
  it('renders correctly', () => {
    const component = shallow(<FooterTopCandidateBVanilla />);
    expect(component).toMatchSnapshot();
  });
});
