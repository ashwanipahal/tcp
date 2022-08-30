import React from 'react';
import { shallow } from 'enzyme';
import BossBannerView from '../BossBanner.views';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'className',
      labels: {
        pickUpText: 'PICK UP IN STORE AND SAVE AN EXTRA 5%',
        simplyChooseText: 'Simply choose #type in your bag before checking out.',
        noRushText: 'NO RUSH Pick Up',
      },
    };
    const component = shallow(<BossBannerView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
