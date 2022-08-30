import React from 'react';
import { shallow } from 'enzyme';
import FavoriteSkeleton from '../views/FavoriteSkeleton.native';

describe('FavoriteSkeleton Native Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FavoriteSkeleton col={8} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
