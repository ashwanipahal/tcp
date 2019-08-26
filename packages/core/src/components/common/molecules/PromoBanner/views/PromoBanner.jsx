// @flow
import React from 'react';
import { Anchor, BodyCopy } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import PromoBannerStyle from '../PromoBanner.style';

type Props = {
  promoBanner: Array<Object>,
  className: String,
};

/**
 * This component produces a Promo Text banner
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
const PromoBanner = (props: Props) => {
  const {
    promoBanner: [{ textItems, link }],
    className,
    ...otherProps
  } = props;

  return (
    <BodyCopy component="div" className={className} {...otherProps}>
      <React.Fragment>
        <Anchor {...link}>
          {textItems.map(({ text, style }, index) => {
            let promoText;

            /* this need to be fixed once we have 5 items for module A or unlimited textItems creation in CMS */
            if (style === 'style7' || style === 'percentage_wrapped_large') {
              const style7Texts = text.split('%');
              promoText = (
                <div className={`promo-text ${style}`}>
                  <span className={`${style}-0`}>{style7Texts[0] && style7Texts[0].trim()}</span>
                  <span className={`${style}-1`}>% </span>
                  <span className={`${style}-2`}>{style7Texts[1] && style7Texts[1].trim()}</span>
                </div>
              );
            } else {
              promoText = (
                <span className={`promo-text ${style}`}>{index ? ` ${text}` : text}</span>
              );
            }

            return promoText;
          })}
        </Anchor>
      </React.Fragment>
    </BodyCopy>
  );
};

export { PromoBanner as PromoBannerVanilla };
export default withStyles(PromoBanner, PromoBannerStyle);
