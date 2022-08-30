import React from 'react';
import { shallow } from 'enzyme';

import OutfitListing from '../views/OutfitListing.view.native';

describe('SearchProduct should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OutfitListing outfitDetails={[{ largeImageUrl: '//' }]} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Styled(FlatList)').length).toBe(1);
  });
});
