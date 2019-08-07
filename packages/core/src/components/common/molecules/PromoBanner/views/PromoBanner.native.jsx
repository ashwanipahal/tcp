// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { UrlHandler } from '../../../../../utils/index.native';

import { BodyCopy } from '../PromoBanner.style.native';

type Props = {
  promoBanner: Array<Object>,
  bodyCopyStyles: Array<Object>,
};

/* bodyCopyStyles is a array of BodyCopy component with key of style1,style2,style3 etc.
    The keys are coming from CMS */
export const bodyCopyStyles = {
  style1: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs36"
      fontWeight="black"
      {...props}
    />
  ),
  style2: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs42"
      textAlign="center"
      lineHeight="42px"
      {...props}
    />
  ),
  style3: props => (
    <BodyCopy
      fontSize="fs64"
      fontWeight="black"
      color="black"
      fontFamily="primary"
      lineHeight="64px"
      textAlign="center"
      {...props}
    />
  ),
};

/**
 * This component produces a Promo Text banner
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component accepts BodyCopy styles in array return matching BodyCopy style with
 * the key provided by CMS
 * @param {*} props
 */
const PromoBanner = (props: Props) => {
  const {
    promoBanner: [{ textItems, link }],
    ...otherProps
  } = props;
  return [
    <TouchableOpacity
      accessibilityRole="link"
      onPress={() => {
        UrlHandler(link.url);
      }}
    >
      {textItems.map(({ text, style }, index) => {
        const StyleBodyCopy = bodyCopyStyles[style];
        return <StyleBodyCopy text={index ? ` ${text}` : text} {...otherProps} />;
      })}
    </TouchableOpacity>,
  ];
};

export default PromoBanner;
