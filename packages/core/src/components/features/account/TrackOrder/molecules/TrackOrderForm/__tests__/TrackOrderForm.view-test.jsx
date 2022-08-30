import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderFormVanilla } from '../views/TrackOrderForm.view';

describe('TrackOrderForm component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      errorMessage: '',
      handleSubmit: () => null,
      onChangeForm: () => null,
    };
    const component = shallow(<TrackOrderFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
