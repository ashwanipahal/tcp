import React from 'react';
import { shallow } from 'enzyme';
import FormPageHeadingComponent from '../FormPageHeading.view.native';

describe('FormPageHeading', () => {
  it('should render correctly', () => {
    const tree = shallow(<FormPageHeadingComponent heading="test heading" />);
    expect(tree).toMatchSnapshot();
  });
});
