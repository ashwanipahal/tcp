// @flow
import React from 'react';
import { Text } from 'react-native';
import { Anchor, BodyCopy, Heading } from '../../../atoms';
import { StyledText } from '../../../../../../styles/globalStyles/StyledText.style';

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
      fontSize="fs20"
      fontWeight="regular"
      textAlign="center"
      letterSpacing="ls2"
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

const getTextItems = (textItems, useStyle, compProps) => {
  return (
    textItems &&
    textItems.map(({ text, style }, index) => {
      if (style && useStyle) {
        // use embedded style to render BodyCopy if useStyle is true
        const StyleBodyCopy = style ? bodyCopyStyles[style] : {};
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
          {index ? ` ${text}` : text}
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
    const { link, textItems } = item;
    const textItemsComponents = getTextItems(textItems, useStyle, compProps);
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
