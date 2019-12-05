import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, Image, View } from 'react-native';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor/views/Anchor.native';
import {
  getStyledViewComponent,
  getStyledTextComponent,
  getStyledImageComponent,
  ImageWrapperView,
} from './StyleGenerator.native';

const StyledComponents = {};
let navigationData = {};

const parseStyle = styleString => {
  const vacuumString = styleString.join(',').replace(/\s/g, '');
  const transformedString = vacuumString.slice(0, vacuumString.indexOf('@')).replace(/[.#]/g, '');
  const splitStyleStrings = transformedString.split('}');
  splitStyleStrings.forEach(str => {
    const styleConfig = str.split('{').filter(val => val);
    // eslint-disable-next-line prefer-destructuring
    if (styleConfig.length) StyledComponents[styleConfig[0]] = styleConfig[1];
  });
  return StyledComponents;
};

export const RenderText = (props, className) => {
  const { style, children } = props;
  if (!children) {
    return null;
  }
  const StyledText = className ? getStyledTextComponent(StyledComponents, className) : Text;
  return <StyledText style={{ ...style }}>{children}</StyledText>;
};

RenderText.propTypes = {
  style: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}),
};

RenderText.defaultProps = {
  children: {},
};

export const RenderAnchor = (props, className) => {
  const { children, href, className: selfClass } = props;
  const classes = className ? `${className} ${selfClass}` : selfClass;
  const StyledText = className ? getStyledTextComponent(StyledComponents, classes) : Text;

  return (
    <Anchor url={href} navigation={navigationData}>
      <StyledText>{children[0].props.children}</StyledText>
    </Anchor>
  );
};

RenderAnchor.propTypes = {
  style: PropTypes.shape({}).isRequired,
  children: PropTypes.arrayOf({}).isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

RenderAnchor.defaultProps = {
  className: '',
};

export const RenderImage = (props, className) => {
  const { alt, source, className: selfClass, style } = props;
  const classes = className ? `${className} ${selfClass}` : selfClass;
  const StyledImage = classes ? getStyledImageComponent(StyledComponents, classes) : Image;

  return (
    <ImageWrapperView>
      <StyledImage style={{ ...style }} resizeMode="stretch" alt={alt} source={{ uri: source }} />
    </ImageWrapperView>
  );
};

RenderImage.propTypes = {
  style: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  alt: PropTypes.string,
  source: PropTypes.string.isRequired,
  className: PropTypes.string,
};

RenderImage.defaultProps = {
  className: '',
  alt: '',
};

export const RenderView = props => {
  const { children, className } = props;
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
            return RenderAnchor(child.props, className);
          default: {
            if (child.type === 'script') {
              return null;
            }
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

RenderView.propTypes = {
  children: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

RenderView.defaultProps = {
  className: '',
};

const generateComponentMap = navigation => {
  navigationData = navigation;
  return {
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
};

export default generateComponentMap;
