import React from 'react';
import { shallow } from 'enzyme';
import { PLCCFormVanilla } from '../PLCCForm.native';

describe('PLCCFormVanilla', () => {
  const mockedDispatch = jest.fn();
  const props = {
    toggleModal: jest.fn(),
    plccData: {},
    labels: {},
    handleSubmit: jest.fn(),
    initialValues: {},
    isRtpsFlow: false,
    dispatch: mockedDispatch,
  };
  it('it should render correctly', () => {
    const component = shallow(<PLCCFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('it should render correctly with rtpsFalse', () => {
    const component = shallow(<PLCCFormVanilla {...props} />);
    component.setState({ isPreScreen: true });
    expect(component).toMatchSnapshot();
  });
  it('it should render correctly if rtps flow', () => {
    props.isRtpsFlow = true;
    const component = shallow(<PLCCFormVanilla {...props} />);
    component.setState({ isPreScreen: true });
    expect(component).toMatchSnapshot();
  });
  it('it should call togglePreScreen', () => {
    props.isRtpsFlow = true;
    const component = shallow(<PLCCFormVanilla {...props} />);
    component.setState({ isPreScreen: true });
    component.instance().togglePreScreen();
    expect(component).toMatchSnapshot();
  });
  it('should call handlePlaceSelected', () => {
    const component = shallow(<PLCCFormVanilla {...props} />);
    component.instance().locationRef = {
      setAddressText: jest.fn(),
    };
    component.instance().handlePlaceSelected(
      {
        streetNumber: '',
        streetName: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      },
      null
    );
    expect(mockedDispatch).toBeCalled();
  });
});
