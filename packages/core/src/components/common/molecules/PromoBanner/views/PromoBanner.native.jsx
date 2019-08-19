// @flow
import React from 'react';
import { Anchor } from '../../../atoms';
import { BodyCopy, Container, ContainerView } from '../PromoBanner.style.native';

type Props = {
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
        <Anchor url={link.url} navigation={navigation}>
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

export default PromoBanner;
export { PromoBanner as PromoBannerVanilla };
