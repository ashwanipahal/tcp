// @flow
import React from 'react';
import { Text } from 'react-native';
import { Anchor, BodyCopy, Heading } from '../../../atoms';
import { StyledText } from '../../../../../../styles/globalStyles/StyledText.style';
import { StyledImage } from '../LinkText.style.native';

type Props = {
  type: string,
  headerText: Object[],
  link: Object,
  textItems: Object[],
  navigation: Object,
  locator: string,
  renderComponentInNewLine: boolean,
  useStyle: boolean,
};

const LARGE_TEXT_BLACK_STYLE = { lineHeight: 47 };
const heartIcon = require('../../../../../assets/heart-icon.png');

export const icons = {
  'header-icon__heart': heartIcon,
};

export const bodyCopyStyles = {
  // small text with regular font
  style1: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs12"
      fontWeight="regular"
      textAlign="center"
      {...props}
    />
  ),
  // small text with extrabold font
  style2: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs12"
      fontWeight="extrabold"
      textAlign="center"
      {...props}
    />
  ),
  // small text with normal font
  small_text_normal: props => (
    <BodyCopy color="gray.900" fontFamily="primary" fontSize="fs14" textAlign="center" {...props} />
  ),
  // large text with bold font
  large_text_black: props => (
    <BodyCopy
      color="gray.900"
      fontFamily="primary"
      fontSize="fs48"
      fontWeight="regular"
      textAlign="center"
      letterSpacing="ls2"
      style={LARGE_TEXT_BLACK_STYLE}
      {...props}
    />
  ),
  // large text with bold font
  medium_text_black: props => (
    <BodyCopy
      color="gray.900"
      fontFamily="primary"
      fontSize="fs32"
      fontWeight="black"
      textAlign="center"
      {...props}
    />
  ),
  // large text with bold
  medium_text_regular: props => {
    return (
      <BodyCopy
        color="gray.900"
        fontFamily="primary"
        fontSize="fs32"
        fontWeight="black"
        textAlign="center"
        {...props}
      />
    );
  },
  medium_text_subpromo: props => {
    return (
      <BodyCopy
        color="gray.900"
        fontFamily="primary"
        fontSize="fs14"
        fontWeight="regular"
        textAlign="center"
        {...props}
      />
    );
  },
  spaced_text_regular_black: props => {
    return (
      <BodyCopy
        color="gray.900"
        fontFamily="primary"
        fontSize="fs20"
        fontWeight="medium"
        textAlign="center"
        {...props}
      />
    );
  },
};

/**
 * This method is to return image icon
 */
const getIcon = icon => icon && <StyledImage source={icons[icon]} />;

/**
 * This method is to return image icon
 * in middle of text
 */
const finalText = (str, placement, icon) => {
  const text = str.split(' ');
  if (text.length > 1 && icon && placement && placement === 'middle') {
    return (
      <>
        {text[0]}
        {getIcon(icon)}
        {text.slice(1, text.length).join(' ')}
      </>
    );
  }
  return str;
};

/**
 * This component creates a link with styled text
 * Text can be configured to be inside a heading tag to some other element.
 * This component uses BodyCopy atom and Heading atom and differentiates based on type="heading"
 * @param {*} props
 * type="heading" if Heading is required
 * type="bodycopy" if BodyCopy is required
 * accepts all parameters for BodyCopy and Heading atom
 */

const getTextItems = (textItems, icon, useStyle, compProps) => {
  const { placement, icon: iconName } = icon || {};
  return (
    textItems &&
    // eslint-disable-next-line complexity
    textItems.map(({ text, style }, index) => {
      if (style && useStyle) {
        // use embedded style to render BodyCopy if useStyle is true
        const StyleBodyCopy = style ? bodyCopyStyles[style] : () => null;
        return (
          <StyleBodyCopy
            accessibilityRole="text"
            accessibilityLabel={text}
            text={text}
            key={index.toString()}
            {...compProps}
          />
        );
      }
      return (
        <StyledText accessibilityRole="text" accessibilityLabel={text} key={index.toString()}>
          {iconName && placement && placement === 'left' && getIcon(iconName)}
          {index ? ` ${text}` : finalText(text, placement, iconName)}
          {iconName && placement && placement === 'right' && getIcon(iconName)}
        </StyledText>
      );
    })
  );
};

const LinkText = (props: Props) => {
  const {
    locator,
    type,
    headerText,
    navigation,
    renderComponentInNewLine = false,
    useStyle = false,
    ...otherProps
  } = props;

  let Component;
  let compProps = {};

  if (type === 'heading') {
    Component = Heading;
    compProps = {
      navigation,
      Component,
      ...otherProps,
    };
  } else {
    Component = BodyCopy;
    compProps = {
      navigation,
      Component,
      ...otherProps,
    };
  }

  return headerText.map((item, index) => {
    const { link, icon, textItems } = item;
    const textItemsComponents = getTextItems(textItems, icon, useStyle, compProps);
    if (useStyle) {
      return (
        <Anchor url={link.url} navigation={navigation}>
          {renderComponentInNewLine ? textItemsComponents : <Text>{textItemsComponents}</Text>}
        </Anchor>
      );
    }
    return (
      <Anchor key={index.toString()} url={link.url} navigation={navigation}>
        <Component {...compProps} text={textItemsComponents} locator={locator} />
      </Anchor>
    );
  });
};

export default LinkText;
