import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { CardList } from '../CardList.view';

describe('CardView component', () => {
  it('should renders correctly when Card are not present', () => {
    const props = {
      cardList: new List(),
      labels: {},
    };
    const component = shallow(<CardList {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const props = {
      labels: {
        cardHeading: 'heading',
      },
      className: 'abc',
      cardList: List(),
    };
    const tree = shallow(<CardList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
