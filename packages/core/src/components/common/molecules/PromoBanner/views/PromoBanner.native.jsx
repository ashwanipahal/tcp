// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { UrlHandler } from '../../../../../utils/utils.native';
import { StyledText } from '../PromoBanner.style.native';

type Props = {
  promoBanner: Array<Object>,
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
const PromoTextBanner = (props: Props) => {
  const {
    promoBanner: [{ textItems, link }],
    ...otherProps
  } = props;
  return (
    <TouchableOpacity
      accessibilityRole="link"
      onPress={() => {
        UrlHandler(link.url);
      }}
    >
      {textItems.map(({ text, style }, index) => {
        return (
          <StyledText style={style} {...otherProps}>
            {index ? `${text} ` : text}
          </StyledText>
        );
      })}
    </TouchableOpacity>
  );
};

export default PromoTextBanner;
