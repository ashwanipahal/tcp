import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderBottomSectionVanilla } from '../views/TrackOrderBottomSection.view';

describe('TrackOrderBottomSection component', () => {
  const props = {
    labels: {
      trackOrder: {},
    },
    className: '',
    setModalMountState: jest.fn(),
    openLoginOverlay: jest.fn(),
  };
  const event = {
    preventDefault: jest.fn(),
  };
  it('should renders correctly', () => {
    const component = shallow(<TrackOrderBottomSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('calling handleDefaultLinkClick method', () => {
    const tree = shallow(<TrackOrderBottomSectionVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.handleDefaultLinkClick(event);
    expect(props.setModalMountState).toBeCalled();
  });
});
