import React from 'react';
import { shallow } from 'enzyme';
import { RelatedOutfitsVanilla } from '../views/RelatedOutfits.view.native';

describe('RelatedOutfitsVanilla component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      pdpLabels: {},
    };
    wrapper = shallow(<RelatedOutfitsVanilla {...props} />);
  });

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
