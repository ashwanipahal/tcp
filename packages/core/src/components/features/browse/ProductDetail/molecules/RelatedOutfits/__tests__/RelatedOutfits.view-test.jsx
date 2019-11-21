import React from 'react';
import { shallow } from 'enzyme';
import { RelatedOutfitsVanilla } from '../views/RelatedOutfits.view';

describe('Added to Bag View', () => {
  const props = {
    className: '',
    pdpLabels: {},
  };
  it('should render Added to Bag view ', () => {
    const component = shallow(<RelatedOutfitsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
