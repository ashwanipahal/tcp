import React from 'react';
import { shallow } from 'enzyme';
import { getModuleXContent } from '../StoresInternational.actions';
import { getContent, getModuleXContentId } from '../StoresInternational.selectors';
import {
  StoresInternationalContainer,
  mapDispatchToProps,
  mapStateToProps,
} from '../StoresInternational.container';

const dispatch = jest.fn();

jest.mock('../StoresInternational.selectors', () => ({
  getModuleXContentId: jest.fn(),
  getContent: jest.fn(),
}));

jest.mock('../StoresInternational.actions', () => ({
  getModuleXContent: jest.fn(),
}));

describe('StoresInternational Container', () => {
  describe('mapDispatchToProps', () => {
    it('should dispatch getModuleXContent', () => {
      const props = mapDispatchToProps(dispatch);
      props.getModuleX('data');
      expect(dispatch).toHaveBeenCalled();
      expect(getModuleXContent).toHaveBeenCalledWith('data');
    });
  });
  describe('mapStateToProps', () => {
    it('should set props from state', () => {
      mapStateToProps();
      expect(getModuleXContentId).toHaveBeenCalled();
      expect(getContent).toHaveBeenCalled();
    });
  });
  describe('Container', () => {
    let container;
    const testId = 'test';
    beforeAll(() => {
      container = shallow(<StoresInternationalContainer contentId="test" getModuleX={jest.fn()} />);
    });
    it('should render correctly', () => {
      container.setProps({});
      expect(container).toMatchSnapshot();
    });
    it('should not bind change event handler if select does not exists', () => {
      container.setProps({ content: 'no-select' });
      expect(container).toMatchSnapshot();
    });
    it('should bind change event handler if select exists', () => {
      const selectInput = document.createElement('select');
      selectInput.id = 'country-selector';
      document.body.appendChild(selectInput);
      container.setProps({ content: 'with-select' });
      expect(container).toMatchSnapshot();
    });
    it('should not scroll if country tile does not exist', () => {
      const event = {
        target: {
          value: `#${testId}`,
        },
      };
      container.instance().selectCallback(event);
    });
    it('should scroll to country tile if it exists', () => {
      const countryTile = document.createElement('div');
      countryTile.id = testId;
      document.body.appendChild(countryTile);
      window.HTMLElement.prototype.scrollIntoView = jest.fn();
      const event = {
        target: {
          value: `#${testId}`,
        },
      };
      container.instance().selectCallback(event);
    });
  });
});
