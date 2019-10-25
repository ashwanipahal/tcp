import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import { RenderTree } from '@fabulas/astly';
import RichText from '../views/RichText.native';

describe('RichText', () => {
  let component;
  let props;
  const helloWorldText = 'Hello World';

  beforeEach(() => {
    props = {
      isNativeView: false,
      source: '<div><p>Hello <b>World</b></p><br /></div>',
      javaScriptEnabled: false,
      domStorageEnabled: false,
      thirdPartyCookiesEnabled: false,
      isApplyDeviceHeight: false,
    };
  });

  it('should be defined', () => {
    expect(RichText).toBeDefined();
  });

  it('should render correctly', () => {
    component = shallow(<RichText {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should return Web View component with length one', () => {
    component = shallow(<RichText {...props} />);
    expect(component.find('WebView')).toHaveLength(1);
  });

  it('should render Native View Component', () => {
    props.isNativeView = true;
    component = shallow(<RichText {...props} />);
    expect(component.find(RenderTree)).toHaveLength(1);
  });

  it('should render p tag as Text Component', () => {
    props.isNativeView = true;
    const style = { fontSize: 12 };
    component = shallow(<RichText {...props} />);
    const renderedComp = component
      .find(RenderTree)
      .first()
      .props()
      .componentMap.p({ style, children: helloWorldText });
    expect(renderedComp).toEqual(<Text style={{ ...style }}>{helloWorldText}</Text>);
  });

  it('should render b tag as Text Component', () => {
    props.isNativeView = true;
    const style = { fontSize: 12 };
    component = shallow(<RichText {...props} />);
    const renderedComp = component
      .find(RenderTree)
      .first()
      .props()
      .componentMap.b({ style, children: helloWorldText });
    expect(renderedComp).toEqual(<Text style={{ ...style }}>{helloWorldText}</Text>);
  });

  it('should render br tag as Text Component', () => {
    props.isNativeView = true;
    component = shallow(<RichText {...props} />);
    const renderedComp = component
      .find(RenderTree)
      .first()
      .props()
      .componentMap.br();
    expect(renderedComp).toEqual(<Text> </Text>);
  });
});
