// @flow
import React from 'react';
import { Anchor } from '../../../atoms';
import { BodyCopy, Container, ContainerView } from '../PromoBanner.style.native';

import CurrencyUpPromoBanner from './CurrencyUpPromoBanner';

type Props = {
  ribbonBanner: Array<Object>,
  promoBanner: Array<Object>,
  bodyCopyStyles: Array<Object>,
};

type PercentageStyleProps = {
  text: string,
};

/* bodyCopyStyles is a array of BodyCopy component with key of style1,style2,style3 etc.
    The keys are coming from CMS */
export const bodyCopyStyles = {
  // large_text_normal
  style1: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs36"
      fontWeight="black"
      {...props}
    />
  ),
  // large_text_bold
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
  text_normal: props => (
    <BodyCopy fontSize="fs16" color="white" fontFamily="primary" textAlign="center" {...props} />
  ),
  style5: props => (
    <BodyCopy
      fontSize="fs64"
      fontWeight="black"
      color="white"
      fontFamily="primary"
      lineHeight="64px"
      textAlign="center"
      {...props}
    />
  ),
  percentage_wrapped_large: props => <PercentageStyle {...props} />,
  percentage_wrapped_extra_large: props => <PercentagePinkStyle {...props} />,
  currency_up_style: props => <CurrencyUpPromoBanner {...props} />,
  // TODO: Remove .style10 when currency_up_style is available in CMS
  style10: props => <CurrencyUpPromoBanner {...props} />,
  small_text_bold: props => (
    <BodyCopy
      fontSize="fs16"
      fontWeight="black"
      color="black"
      fontFamily="primary"
      textAlign="center"
      lineHeight="16px"
      {...props}
    />
  ),
  small_text_normal: props => (
    <BodyCopy
      fontSize="fs16"
      color="gray.900"
      fontFamily="primary"
      textAlign="left"
      lineHeight="16px"
      {...props}
    />
  ),
  ribbon_default_text: props => (
    <BodyCopy
      fontSize="fs14"
      color="white"
      fontFamily="secondary"
      textAlign="center"
      lineHeight="14px"
      {...props}
    />
  ),
  gymboree_description: props => (
    <BodyCopy
      fontSize="fs16"
      fontWeight="regular"
      color="white"
      fontFamily="primary"
      textAlign="center"
      {...props}
    />
  ),
  small_text_black: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs20"
      fontWeight="black"
      textAlign="center"
      lineHeight="20px"
      letterSpacing="ls1"
      {...props}
    />
  ),
  small_text_semibold: props => (
    <BodyCopy
      color="text.primary"
      fontFamily="primary"
      fontSize="fs20"
      fontWeight="semibold"
      textAlign="center"
      lineHeight="20px"
      letterSpacing="ls2"
      {...props}
    />
  ),
  medium_text_semibold: props => (
    <BodyCopy
      color="gray.900"
      mobilefontFamily="primary"
      fontSize="fs32"
      textAlign="center"
      lineHeight="47px"
      letterSpacing="ls2"
      {...props}
    />
  ),
  extra_large_text_black: props => (
    <BodyCopy
      color="gray.900"
      mobilefontFamily="primary"
      fontSize="fs48"
      textAlign="center"
      lineHeight="47px"
      fontWeight="black"
      {...props}
    />
  ),
  extra_large_text_regular: props => (
    <BodyCopy
      color="gray.900"
      mobilefontFamily="primary"
      fontSize="fs48"
      textAlign="center"
      lineHeight="47px"
      {...props}
    />
  ),
  fixed_medium_text_black: props => (
    <BodyCopy
      color="gray.900"
      mobilefontFamily="primary"
      fontSize="fs64"
      textAlign="center"
      lineHeight="64px"
      fontWeight="black"
      {...props}
    />
  ),
  medium_text_regular: props => (
    <BodyCopy
      fontSize="fs20"
      color="gray.900"
      mobilefontFamily="primary"
      fontWeight="regular"
      textAlign="center"
      letterSpacing="ls2"
      lineHeight="20px"
      {...props}
    />
  ),

  percentage_all_wrapped_normal: props => <PercentageAllWrappedNormal {...props} />,
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
    locator,
    navigation,
    promoBanner: [{ textItems, link }],
    bannerPosition,
    ...otherProps
  } = props;

  return [
    <ContainerView>
      {textItems && (
        <Anchor url={link ? link.url : ''} navigation={navigation}>
          {textItems.map(({ text, style }, index) => {
            const StyleBodyCopy = bodyCopyStyles[style];
            return (
              <StyleBodyCopy
                text={index ? `${text}` : text}
                locator={locator}
                {...otherProps}
                key={index.toString()}
              />
            );
          })}
        </Anchor>
      )}
    </ContainerView>,
  ];
};

/**
 * This function return the Promobanner Percentage Style
 * Color is 'Black' and Split by the space ' ' key. Font size is also small.
 */
const PercentageAllWrappedNormal = (props: PercentageStyleProps) => {
  const { text } = props;

  const strArray = text && text.split(' ');
  const containerStyle = { marginTop: 5 };
  const bodyCopyStyle = { height: 24, width: 28, marginTop: 0 };
  const bodyCopyStyle1 = { height: 38, marginTop: 0 };
  const bodyCopyStyle2 = { height: 20 };

  return (
    <Container style={containerStyle}>
      <BodyCopy
        fontSize="fs48"
        fontWeight="black"
        color="text.primary"
        fontFamily="primary"
        textAlign="center"
        lineHeight="48px"
        style={bodyCopyStyle1}
        text={strArray && strArray[0]}
      />
      <ContainerView>
        <BodyCopy
          fontSize="fs28"
          fontWeight="black"
          color="text.primary"
          fontFamily="primary"
          lineHeight="28px"
          text={strArray && strArray[1]}
          style={bodyCopyStyle}
        />
        <BodyCopy
          fontSize="fs18"
          fontWeight="black"
          color="text.primary"
          fontFamily="primary"
          textAlign="center"
          lineHeight="18px"
          text={strArray && strArray[2]}
          style={bodyCopyStyle2}
        />
      </ContainerView>
    </Container>
  );
};

/**
 * This function return the Promobanner Percentage Style
 * Color is 'White' and Split by the space ' ' key .
 */
const PercentageStyle = (props: PercentageStyleProps) => {
  const { text } = props;

  const strArray = text && text.split(' ');
  const bodyCopyStyle = { height: 33 };
  const bodyCopyStyle1 = { height: 58, marginTop: 8 };

  return (
    <Container>
      <BodyCopy
        fontSize="fs64"
        fontWeight="black"
        color="white"
        fontFamily="primary"
        textAlign="center"
        lineHeight="64px"
        style={bodyCopyStyle1}
        text={strArray && strArray[0]}
      />
      <ContainerView>
        <BodyCopy
          fontSize="fs42"
          fontWeight="black"
          color="white"
          fontFamily="primary"
          text={strArray && strArray[1]}
          lineHeight="42px"
          style={bodyCopyStyle}
        />
        <BodyCopy
          fontSize="fs20"
          fontWeight="black"
          color="white"
          fontFamily="primary"
          textAlign="center"
          lineHeight="20px"
          text={strArray && strArray[2]}
        />
      </ContainerView>
    </Container>
  );
};

/**
 * This function return the Promobanner Percentage Style
 * Color is 'Pink' and Split by the space ' ' key .
 */
const PercentagePinkStyle = (props: PercentageStyleProps) => {
  const { text } = props;

  const strArray = text && text.split(' ');
  const bodyCopyStyle = { height: 85, fontSize: 99 };
  const bodyCopyStyle1 = { height: 131, marginTop: 8, fontSize: 153 };
  const bodyCopyStyle2 = { height: 42 };

  return (
    <Container>
      <BodyCopy
        fontWeight="black"
        color="pink.400"
        fontFamily="primary"
        textAlign="center"
        lineHeight="155px"
        style={bodyCopyStyle1}
        text={strArray && strArray[0]}
      />
      <ContainerView>
        <BodyCopy
          fontWeight="black"
          color="pink.400"
          fontFamily="primary"
          text={strArray && strArray[1]}
          lineHeight="99px"
          style={bodyCopyStyle}
        />
        <BodyCopy
          fontSize="fs42"
          fontWeight="black"
          color="pink.400"
          fontFamily="primary"
          textAlign="center"
          lineHeight="42px"
          text={strArray && strArray[2]}
          style={bodyCopyStyle2}
        />
      </ContainerView>
    </Container>
  );
};

export default PromoBanner;
export { PromoBanner as PromoBannerVanilla };
