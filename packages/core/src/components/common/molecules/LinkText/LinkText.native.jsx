// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Heading, BodyCopy } from '../../atoms';

type Props = {
  type: string,
  headerText: Object[],
  link: Object,
  textItems: Object[],
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

type getTextItemsProps = {
  textItems: Object[],
};

const getTextItems = ({ textItems }: getTextItemsProps) => {
  return textItems && textItems.map(({ text }, index) => <Text>{index ? ` ${text}` : text}</Text>);
};

const LinkText = (props: Props) => {
  const { type, textItems, link, ...otherProps } = props;

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
    <TouchableOpacity accessibilityRole="button">
      <Component {...compProps} text={getTextItems({ textItems })} />
    </TouchableOpacity>
  );
};

export default LinkText;
