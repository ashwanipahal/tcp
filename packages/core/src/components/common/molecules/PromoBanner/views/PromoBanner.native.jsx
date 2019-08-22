// @flow
import React from 'react';
import { Anchor } from '../../../atoms';
import {
  BodyCopy,
  Container,
  ContainerView,
  Style8ContainerView,
  PromoText,
} from '../PromoBanner.style.native';

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
  style4: props => (
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
  style6: props => <PercentageStyle {...props} />,
  style7: props => <PercentagePinkStyle {...props} />,
  style8: props => (
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
  style9: props => (
    <BodyCopy
      fontSize="fs16"
      color="gray.900"
      fontFamily="primary"
      textAlign="left"
      lineHeight="16px"
      {...props}
    />
  ),
  style10: props => (
    <BodyCopy
      fontSize="fs14"
      color="white"
      fontFamily="secondary"
      textAlign="center"
      lineHeight="14px"
      {...props}
    />
  ),
  style11: props => <AllTextInRowStyle {...props} />,
  style12: props => (
    <BodyCopy
      fontSize="fs16"
      fontWeight="regular"
      color="white"
      fontFamily="primary"
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
    locator,
    navigation,
    promoBanner: [{ textItems, link }],
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
 * Color is 'White' and Split by the '%' key .
 */
const PercentageStyle = (props: PercentageStyleProps) => {
  const { text } = props;

  const strArray = text && text.split('%');
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
          text="%"
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
          text={strArray && strArray[1]}
        />
      </ContainerView>
    </Container>
  );
};

/**
 * This function return the Promobanner Percentage Style
 * Color is 'Pink' and Split by the '%' key .
 */
const PercentagePinkStyle = (props: PercentageStyleProps) => {
  const { text } = props;

  const strArray = text && text.split('%');
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
          text="%"
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
          text={strArray && strArray[1]}
          style={bodyCopyStyle2}
        />
      </ContainerView>
    </Container>
  );
};

/**
 * This function return the Promobanner two text Style combination.
 */
const AllTextInRowStyle = (props: PercentageStyleProps) => {
  const { text } = props;
  const strArray = text && text.split('-');
  return (
    <Style8ContainerView>
      <PromoText>
        <BodyCopy
          fontWeight="black"
          color="black"
          fontFamily="primary"
          textAlign="center"
          lineHeight="16px"
          text={strArray && strArray[0]}
        />
        <BodyCopy
          fontSize="fs16"
          color="gray.900"
          fontFamily="primary"
          textAlign="left"
          lineHeight="16px"
          text={strArray && strArray[1]}
        />
      </PromoText>
    </Style8ContainerView>
  );
};

export default PromoBanner;
export { PromoBanner as PromoBannerVanilla };
