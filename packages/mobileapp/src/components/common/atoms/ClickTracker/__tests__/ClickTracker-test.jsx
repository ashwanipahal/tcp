import React from 'react';
import { shallow } from 'enzyme';
import { ClickTracker, mapDispatchToProps } from '../ClickTracker';

describe('ClickTracker', () => {
  let component;
  let onPressSpy;
  let trackClickActionSpy;
  let setClickAnalyticsDataActionSpy;
  beforeEach(() => {
    onPressSpy = jest.fn();
    trackClickActionSpy = jest.fn();
    setClickAnalyticsDataActionSpy = jest.fn();
    const params = {
      onPress: onPressSpy,
      trackClickAction: trackClickActionSpy,
      setClickAnalyticsDataAction: setClickAnalyticsDataActionSpy,
      name: 'test',
      module: 'test',
      clickData: {},
    };
    component = shallow(<ClickTracker {...params} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('calling onPress should call onPress prop passed', () => {
    component.prop('onPress')();
    expect(onPressSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    it('should return trackClickAction', () => {
      const props = mapDispatchToProps(dispatch);
      props.trackClickAction();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should return setClickAnalyticsDataAction', () => {
      const props = mapDispatchToProps(dispatch);
      props.setClickAnalyticsDataAction();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
