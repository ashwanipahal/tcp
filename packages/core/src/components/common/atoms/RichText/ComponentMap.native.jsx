import React from 'react';
import { Text, Image, View } from 'react-native';
import {
  getStyledViewComponent,
  getStyledTextComponent,
  getStyledImageComponent,
} from './StyleGenerator.native';

const StyledComponents = {};

const parseStyle = styleString => {
  const vacuumString = styleString.join(',').replace(/\s/g, '');
  const transformedString = vacuumString.slice(0, vacuumString.indexOf('@')).replace(/[.]/g, '');
  const splitStyleStrings = transformedString.split('}');
  splitStyleStrings.forEach(str => {
    const styleConfig = str.split('{').filter(val => val);
    // eslint-disable-next-line prefer-destructuring
    if (styleConfig.length) StyledComponents[styleConfig[0]] = styleConfig[1];
  });
  return StyledComponents;
};

export const RenderText = (props, className) => {
  const { children } = props;
  if (!children) {
    return null;
  }
  const StyledText = className ? getStyledTextComponent(StyledComponents, className) : Text;
  return <StyledText>{children}</StyledText>;
};

export const RenderAnchor = ({ style, children, actionHandler }) => {
  const actionProps = children[0].props;
  return (
    <Text
      style={{ ...style }}
      onPress={() =>
        actionHandler(actionProps.href, actionProps.target, actionProps['data-target'])
      }
    >
      {children}
    </Text>
  );
};

export const RenderImage = (props, className) => {
  const { alt, source } = props;
  const StyledImage = className ? getStyledImageComponent(StyledComponents, className) : Image;
  return <StyledImage resizeMode="contain" alt={alt} source={{ uri: source }} />;
};

export const RenderView = ({ children, className }) => {
  const StyledView = className ? getStyledViewComponent(StyledComponents, className) : View;

  return children ? (
    <StyledView>
      {children.map(child => {
        switch (child.type.name) {
          case 'Text':
            return RenderText(child.props, className);
          case 'div':
            return RenderView(child.props);
          case 'img':
            return RenderImage(child.props, className);
          case 'a':
            return RenderAnchor(child.props);
          default: {
            if (child.type === 'style') {
              parseStyle(child.props.children);
              return null;
            }
            return RenderText(child.props, className);
          }
        }
      })}
    </StyledView>
  ) : null;
};

export default {
  br: () => <Text> </Text>,
  p: props => RenderText(props),
  b: props => RenderText(props),
  img: props => RenderImage(props),
  h3: props => RenderText(props),
  ul: props => RenderText(props),
  a: props => RenderAnchor(props),
  li: props => RenderText(props),
  div: props => RenderView(props),
};
