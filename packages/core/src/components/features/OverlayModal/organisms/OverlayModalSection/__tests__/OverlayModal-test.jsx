import React from 'react';
import { shallow } from 'enzyme';
import { OverlayModalVanilla } from '../views/OverlayModal';

describe('OverlayModal', () => {
  let mockedRef = null;
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 102.65625,
        height: 14,
        left: 1517.171875,
        right: 1546.96875,
        top: 88.65625,
        width: 29.796875,
        x: 1517.171875,
        y: 88.65625,
      };
    });
    const comp = document.createElement('div');
    comp.setAttribute('id', 'login');
    const overlayElementWrapper = document.createElement('div');
    overlayElementWrapper.setAttribute('id', 'overlayWrapper');
    const overlayElementComponent = document.createElement('div');
    overlayElementComponent.setAttribute('id', 'overlayComponent');
    const dialog = document.createElement('div');
    dialog.setAttribute('id', 'dialogContent');
    const modalTriangle = document.createElement('div');
    modalTriangle.setAttribute('id', 'modalTriangle');
    const modalWrapper = document.createElement('div');
    modalWrapper.setAttribute('id', 'modalWrapper');
    document.body.appendChild(comp);
    document.body.appendChild(dialog);
    document.body.appendChild(modalTriangle);
    document.body.appendChild(overlayElementWrapper);
    document.body.appendChild(overlayElementComponent);
    document.body.appendChild(modalWrapper);
    mockedRef = {
      contains: jest.fn(),
    };
  });

  afterEach(() => {
    if (document.getElementById('login')) {
      document.body.removeChild(document.getElementById('login'));
    }
    if (document.getElementById('dialogContent')) {
      document.body.removeChild(document.getElementById('dialogContent'));
    }
    if (document.getElementById('modalTriangle')) {
      document.body.removeChild(document.getElementById('modalTriangle'));
    }
    if (document.getElementById('overlayWrapper')) {
      document.body.removeChild(document.getElementById('overlayWrapper'));
    }
    if (document.getElementById('overlayComponent')) {
      document.body.removeChild(document.getElementById('overlayComponent'));
    }
    if (document.getElementById('modalWrapper')) {
      document.body.removeChild(document.getElementById('modalWrapper'));
    }
  });

  it('should render correctly', () => {
    const props = {
      component: 'login',
      ModalContent: () => {},
      variation: 'primary',
      color: null,
      openState: false,
    };
    const mockedcloseOverlay = jest.fn();
    const mockedEvent = {
      target: 'hello',
    };
    const tree = shallow(<OverlayModalVanilla {...props} closeOverlay={mockedcloseOverlay} />);
    tree.instance().setModalRef();
    tree.instance().modalRef = mockedRef;
    tree.instance().handleWindowClick(mockedEvent);
    expect(mockedcloseOverlay).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
  it('should call componentWillUnmount', () => {
    const props = {
      component: 'login',
      ModalContent: () => {},
      variation: 'primary',
      color: null,
      openState: false,
    };
    const mockedcloseOverlay = jest.fn();
    const tree = shallow(<OverlayModalVanilla {...props} closeOverlay={mockedcloseOverlay} />);
    tree.instance().componentWillUnmount();
  });
});
