// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Heading, BodyCopy } from '../../../atoms';
import { UrlHandler } from '../../../../../utils/index.native';

type Props = {
  type: string,
  headerText: Object[],
  link: Object,
  textItems: Object[],
};

/**
 * @function getTextItems : To get heading text lines
 * @param {*} props
 * accepts textItems as parameters to return as heading node
 */
const getTextItems = textItems => {
  return textItems.map(({ text }, index) => <Text>{index ? ` ${text}` : text}</Text>);
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
const LinkText = (props: Props) => {
  const {
    type,
    headerText: [{ textItems, link }],
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
    <TouchableOpacity accessibilityRole="button">
      <Component
        {...compProps}
        text={getTextItems(textItems)}
        onPress={() => {
          UrlHandler(link.url);
        }}
      />
    </TouchableOpacity>
  );
};

export default LinkText;
