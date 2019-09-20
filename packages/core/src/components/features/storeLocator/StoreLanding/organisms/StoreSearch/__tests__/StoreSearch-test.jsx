import React from 'react';
import { shallow } from 'enzyme';
import { StoreViewVanilla } from '../views/StoreSearch';

describe('StoreSearch component', () => {
  let props = {
    className: 'test-class',
    handleSubmit: jest.fn(),
  };

  it('StoreSearch component renders correctly', () => {
    const component = shallow(<StoreViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('handleLocationSelection - returns false', () => {
    props = {
      ...props,
      loadStoresByCoordinates: jest.fn(),
      submitting: true,
    };
    const component = shallow(<StoreViewVanilla {...props} />);
    const handleLocationSelectionFn = component.instance().handleLocationSelection({});
    expect(handleLocationSelectionFn).toBeFalsy();
  });

  it('handleLocationSelection - calls ', () => {
    const loadStoresByCoordinates = jest.fn();
    props = {
      ...props,
      submitting: false,
    };
    const component = shallow(
      <StoreViewVanilla {...props} loadStoresByCoordinates={loadStoresByCoordinates} />
    );
    const geometry = null;
    const location = {
      lat: () => 77,
      lng: () => 22,
    };
    component.instance().handleLocationSelection({ geometry, location });
    expect(loadStoresByCoordinates).toHaveBeenCalled();
  });

  it('handleLocationSelection - calls - with geometry ', () => {
    const loadStoresByCoordinates = jest.fn();
    props = {
      ...props,
      submitting: false,
    };
    const component = shallow(
      <StoreViewVanilla {...props} loadStoresByCoordinates={loadStoresByCoordinates} />
    );
    const geometry = {
      location: {
        lat: () => 77,
        lng: () => 22,
      },
    };
    const location = null;
    component.instance().handleLocationSelection({ geometry, location });
    expect(loadStoresByCoordinates).toHaveBeenCalled();
  });

  it('onSubmit - calls', () => {
    const loadStoresByCoordinates = jest.fn();
    props = {
      ...props,
      submitting: false,
    };
    const component = shallow(
      <StoreViewVanilla {...props} loadStoresByCoordinates={loadStoresByCoordinates} />
    );
    const formData = {
      storeAddressLocator: null,
    };
    component.instance().onSubmit(formData);
    expect(loadStoresByCoordinates).toHaveBeenCalled();
  });

  it('onSubmit - calls - with submitting', () => {
    props = {
      ...props,
      submitting: true,
    };
    const component = shallow(<StoreViewVanilla {...props} />);
    const formData = {
      storeAddressLocator: null,
    };
    const onSubmitFn = component.instance().onSubmit(formData);
    expect(onSubmitFn).toBeFalsy();
  });

  it('should return undefined when componentDidMount gets called', () => {
    props = {
      ...props,
      submitting: true,
    };
    const component = shallow(<StoreViewVanilla {...props} />);

    const returnValue = component.instance().componentDidMount();

    expect(returnValue).toBeFalsy();
  });

  it('should call loadStoresByCoordinates when componentDidMount gets called', () => {
    props = {
      ...props,
      submitting: true,
    };

    const mockGeolocation = {
      getCurrentPosition: cb => cb({ coords: {} }),
    };

    global.navigator.geolocation = mockGeolocation;
    const loadStoresByCoordinates = jest.fn();
    const component = shallow(
      <StoreViewVanilla {...props} loadStoresByCoordinates={loadStoresByCoordinates} />
    );

    component.instance().componentDidMount();

    expect(loadStoresByCoordinates).toHaveBeenCalled();
  });
});
