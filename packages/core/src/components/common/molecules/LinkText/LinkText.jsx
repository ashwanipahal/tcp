// @flow
import React from 'react';
import { Anchor, Heading, BodyCopy } from '../../atoms';

type Props = {
  type: String,
  component: String,
  textLines: Object[],
  link: Object,
  icon?: Object,
  className: String,
};

/**
 * This component creates a link with styled text
 * Text can be configured to be inside a heading tag to some other element.
 * This component uses BodyCopy atom and Heading atom and differentiates based on type="heading"
 * @param {*} props
 * type="heading" if heading is required
 * component="div|any" if type is heading then component should be "h1|h2|h3|h4|h5|h6"
 * accepts all parameters for BodyCopy and Heading atom
 *
 * [TODO] Can configure icon in heading at start|middle|last
 */
const LinkText = (props: Props) => {
  const { type, component, textLines, link, className, ...otherProps } = props;

  let Component;
  let compProps = {};

  if (type === 'heading') {
    Component = Heading;
    compProps.variant = component;
  } else {
    Component = BodyCopy;
    compProps = {
      component,
      ...otherProps,
    };
  }

  return (
    <Anchor className={className} {...link}>
      <Component {...compProps} className="link-text">
        {textLines &&
          textLines.map(({ style, text }, index) => (
            <span className={style}>{index ? ` ${text}` : text}</span>
          ))}
      </Component>
    </Anchor>
  );
};

LinkText.defaultProps = {
  icon: {},
};

export default LinkText;
