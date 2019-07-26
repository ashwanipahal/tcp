// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Heading, BodyCopy, Anchor } from '../../atoms';

type Props = {
  type: string,
};

/**
 * This component creates a link with styled text
 * Text can be configured to be inside a heading tag to some other element.
 * This component uses BodyCopy atom and Heading atom and Anchor atom and differentiates based on type="heading"
 * @param {*} props
 * type="heading" if Heading is required
 * type="bodycopy" if BodyCopy is required
 * type="anchor" if Anchor is required
 * accepts all parameters for BodyCopy, Anchor and Heading atom
 */

const LinkText = (props: Props) => {
  const { type, ...otherProps } = props;

  let Component;
  let compProps = {};

  if (type === 'heading') {
    Component = Heading;
    compProps = {
      Component,
      ...otherProps,
    };
  }
  if (type === 'anchor') {
    Component = Anchor;
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
      <Component {...compProps} />
    </TouchableOpacity>
  );
};

export default LinkText;
