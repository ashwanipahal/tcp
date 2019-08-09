// @flow
import React from 'react';
import { Anchor, Heading, BodyCopy } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import LinkTextStyle from '../LinkText.style';

type Props = {
  type: String,
  component: String,
  headerText: Object[],
  link: Object,
  icon?: Object,
  className: string,
  dataLocator: string,
  headingClass: string,
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
  const {
    className,
    type,
    component,
    headerText: [{ textItems, link }],
    headingClass,
    dataLocator,
    ...otherProps
  } = props;
  let Component;
  let compProps = {};
  const heading = headingClass || '';

  if (type === 'heading') {
    Component = Heading;
    compProps.variant = component;
    compProps.dataLocator = dataLocator;
  } else {
    Component = BodyCopy;
    compProps = {
      component,
      ...otherProps,
    };
  }

  return (
    <Anchor {...link} className={className}>
      <Component {...compProps} className={`${heading} link-text`}>
        {textItems.map(({ style, text }, index) => (
          <span className={style}>{index ? ` ${text}` : text}</span>
        ))}
      </Component>
    </Anchor>
  );
};

LinkText.defaultProps = {
  icon: {},
};

export default withStyles(LinkText, LinkTextStyle);
export { LinkText as VanillaLinkText };
