// @flow
import React from 'react';
import { Text } from 'react-native';
import { Anchor, BodyCopy, Heading } from '../../../atoms';

type Props = {
  type: string,
  headerText: Object[],
  link: Object,
  textItems: Object[],
  navigation: Object,
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

const getTextItems = textItems => {
  return textItems && textItems.map(({ text }, index) => <Text>{index ? ` ${text}` : text}</Text>);
};

const LinkText = (props: Props) => {
  const {
    type,
    headerText: [{ textItems, link }],
    navigation,
    ...otherProps
  } = props;

  let Component;
  let compProps = {};

  if (type === 'heading') {
    Component = Heading;
    compProps = {
      Component,
      ...otherProps,
    };
  } else {
    Component = BodyCopy;
    compProps = {
      Component,
      ...otherProps,
    };
  }

  return (
    <Anchor url={link.url} navigation={navigation} external={link.external}>
      <Component {...compProps} text={getTextItems(textItems)} />
    </Anchor>
  );
};

export default LinkText;
