import React from 'react';
import { shallow } from 'enzyme';
import GetCandidGallery from '../views/GetCandidGallery';

describe('GetCandidGallery component', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
  };

  it('renders correctly', () => {
    const component = shallow(<GetCandidGallery {...props} />);
    expect(component).toMatchSnapshot();
  });
});
