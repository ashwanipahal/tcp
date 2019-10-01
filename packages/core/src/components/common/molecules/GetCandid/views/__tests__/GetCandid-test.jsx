import React from 'react';
import { shallow } from 'enzyme';
import { GetCandidVanilla, mapStateToProps } from '../GetCandid';
import { getAPIConfig } from '../../../../../../utils';

jest.mock('../../../../../../utils', () => ({
  getAPIConfig: jest.fn(),
  isClient: jest.fn(),
  getIconPath: jest.fn(),
  routerPush: jest.fn(),
}));

window.candid = {};
window.candid.upload = jest.fn();

describe('GetCandidVanilla component', () => {
  const props = {
    applicationStatus: 'PENDING',
    disclaimersData: {},
    labels: {
      global: {
        getCandid: {},
      },
    },
  };

  it('should invoke the constructor', () => {
    const instance = new GetCandidVanilla();
    expect(instance).toBeDefined();
  });

  it('should renders correctly', () => {
    getAPIConfig.mockImplementation(() => ({
      CANDID_API_KEY: 'abf',
    }));
    const component = shallow(<GetCandidVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly considering selective arguments are passed', () => {
    props.applicationStatus = '';
    const component = shallow(<GetCandidVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call getAPIConfig', () => {
    getAPIConfig();
    const instance = new GetCandidVanilla(props);
    instance.candidConfig = {
      CANDID_API_KEY: 'abc',
    };
    instance.componentDidMount();
  });

  it('should call handleUpload', () => {
    window.candid.upload = jest.fn();
    const component = shallow(<GetCandidVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'handleUpload');
    component.instance().handleUpload();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call handleUpload when no candid is associated to windows', () => {
    window.candid = null;
    const component = shallow(<GetCandidVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'handleUpload');
    component.instance().handleUpload();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call handleViewGalleryClick', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'handleViewGalleryClick');
    component.instance().handleViewGalleryClick();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should set the state true for getCandidDataLoaded', () => {
    const component = shallow(<GetCandidVanilla {...props} />);
    component.instance().setState({ getCandidDataLoaded: true });
    expect(component).toBeDefined();
  });

  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        global: {
          getCandid: {
            lbl_profile_name: 'test',
          },
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });
});
