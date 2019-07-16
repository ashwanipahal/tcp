import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { CardList } from '../CardList.view';

describe('CardView component', () => {
  it('should renders correctly when Card are not present', () => {
    const props = {
      giftCardList: new List(),
      labels: {},
    };
    const component = shallow(<CardList {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const props = {
      labels: {
        CardHeading: 'heading',
      },
      className: 'abc',
      giftCardList: List(),
    };
    const tree = shallow(<CardList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
