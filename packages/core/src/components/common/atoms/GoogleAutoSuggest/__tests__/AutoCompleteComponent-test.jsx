import React from 'react';
import { shallow } from 'enzyme';
import AutoCompleteComponent from '../AutoCompleteComponent';

describe('AutoCompleteComponent', () => {
  it('should render correctly', () => {
    const tree = shallow(<AutoCompleteComponent />);
    expect(tree).toMatchSnapshot();
  });
});
