import React from 'react';
import { shallow } from 'enzyme';
import { FooterTopCandidateBVanilla } from '../views/FooterTopCandidateB.view';

describe('FooterTopCandidateBVanilla component', () => {
  it('renders correctly', () => {
    const component = shallow(<FooterTopCandidateBVanilla />);
    expect(component).toMatchSnapshot();
  });
});
