import React from 'react';
import { shallow } from 'enzyme';
import { FooterTopCandidateAVanilla } from '../FooterTopCandidateA';

describe('FooterTopCandidateAVanilla component', () => {
  it('renders correctly', () => {
    const component = shallow(<FooterTopCandidateAVanilla />);
    expect(component).toMatchSnapshot();
  });
});
