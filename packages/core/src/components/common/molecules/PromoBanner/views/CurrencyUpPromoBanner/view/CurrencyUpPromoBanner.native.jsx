import React from 'react';
import { PropTypes } from 'prop-types';
import {
  BodyCopy,
  FlexDirectionDefaultView,
  TopAlignedView,
} from '../CurrencyUpPromoBanner.style.native';

/**
 * This component produces a Currency up Promo Text banner
 * This component accepts text item from CMS
 *
 * It first splits the input text with spaces and then displays differents items in different styles
 * There are 4 items expected in the array - e.g $ 7 80 &up - All are displayed in different styles
 *
 * @param {*} props
 */
const CurrencyUpPromoBanner = props => {
  const { text } = props;

  const strArray = text && text.split(' ');
  const bodyCopyTextStyle1 = { fontSize: 28 };
  const bodyCopyTextStyle2 = { fontSize: 86 };
  const bodyCopyTextStyle3 = { fontSize: 48, height: 45 };
  const bodyCopyTextStyle4 = { fontSize: 28 };

  return (
    <TopAlignedView>
      <BodyCopy
        fontWeight="black"
        color="black"
        fontFamily="primary"
        textAlign="center"
        lineHeight="34px"
        style={bodyCopyTextStyle1}
        text={strArray && strArray[0]}
      />
      <BodyCopy
        fontWeight="black"
        color="black"
        fontFamily="primary"
        textAlign="center"
        lineHeight="86px"
        style={bodyCopyTextStyle2}
        text={strArray && strArray[1]}
      />
      <FlexDirectionDefaultView>
        <BodyCopy
          fontWeight="black"
          color="black"
          fontFamily="primary"
          lineHeight="50px"
          text={strArray && strArray[2]}
          style={bodyCopyTextStyle3}
        />
        <BodyCopy
          fontSize="fs42"
          fontWeight="black"
          color="black"
          fontFamily="primary"
          textAlign="center"
          lineHeight="28px"
          text={strArray && `${strArray[3]}${strArray[4]}`}
          style={bodyCopyTextStyle4}
        />
      </FlexDirectionDefaultView>
    </TopAlignedView>
  );
};

CurrencyUpPromoBanner.propTypes = {
  text: PropTypes.string,
};

CurrencyUpPromoBanner.defaultProps = {
  text: '',
};

export default CurrencyUpPromoBanner;
