import React from 'react';
import { shallow } from 'enzyme';
import { FooterTopCandidateAVanilla } from '../views/FooterTopCandidateA.view';

describe('FooterTopCandidateAVanilla component', () => {
  it('renders correctly', () => {
    const component = shallow(<FooterTopCandidateAVanilla />);
    expect(component).toMatchSnapshot();
  });
});
