import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
// import DeleteCardModal from '../DeleteCardModal';

// import { CardList } from '../CardList.view';
import { CardView } from '../Card.view';

describe('CardView component', () => {
  it('should renders correctly when Card are not present', () => {
    const props = {
      giftCardList: new List(),
      labels: {},
    };
    const component = shallow(<CardView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
