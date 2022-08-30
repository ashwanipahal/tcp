import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader.view.native';

describe('Loader Component', () => {
  const props = {
    loaderState: true,
  };

  it('should render correctly', () => {
    const tree = shallow(<Loader {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Loader Component', () => {
  const props = {
    loaderState: false,
  };

  it('should render correctly', () => {
    const tree = shallow(<Loader {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
