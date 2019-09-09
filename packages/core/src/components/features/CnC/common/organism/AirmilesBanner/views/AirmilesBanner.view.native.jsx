import React from 'react';

import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextBox from '../../../../../../common/atoms/TextBox';
import { Image, BodyCopy } from '../../../../../../common/atoms';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';

import {
  AirmilesBannerFormContainer,
  Header,
  FlexRow,
  InputField,
  IconContainer,
  InputContainer,
} from '../styles/AirmilesBanner.style.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';

// @flow

const infoIcon = require('../../../../../../../assets/info-icon.png');

class AirmilesBanner extends React.PureComponent<Props> {
  state = { touched: false };

  renderTextBox = ({ input, ...otherParams }) => {
    // eslint-disable-next-line
    input = { ...input, value: input.value.toUpperCase() };
    return <TextBox input={input} {...otherParams} />;
  };

  toggleTouched = () => {
    const { touched } = this.state;
    this.setState({ touched: !touched });
  };

  handleSubmit = (data: { promoId: string, orderId: string }) => {
    const { onAddAirmilesBanner } = this.props;
    const { touched } = this.state;
    if (touched) {
      this.toggleTouched();
    }
    onAddAirmilesBanner(data);
  };

  popover = message => {
    return (
      <BodyCopy
        fontSize="fs12"
        fontFamily="secondary"
        fontWeight="regular"
        color="gray.900"
        text={message}
      />
    );
  };

  render() {
    const { airmilesBannerData, labels, handleSubmit } = this.props;

    return (
      <AirmilesBannerFormContainer>
        <Header>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontSize="fs10"
            textAlign="left"
            color="gray.800"
            text={labels.headerText}
          />
        </Header>
        <FlexRow>
          <InputField>
            <InputContainer>
              <Field
                label={labels.collectorNumber}
                name="promoId"
                id="promoId"
                type="text"
                autoCapitalize="none"
                maxLength={11}
                component={TextBox}
                dataLocator="collectorNumber"
                value={airmilesBannerData.collectorNumber}
                onBlur={handleSubmit}
              />
            </InputContainer>
            <IconContainer>
              <ReactTooltip withOverlay={false} popover={this.popover(labels.collectorFlyout)}>
                <Image source={infoIcon} height={15} width={15} />
              </ReactTooltip>
            </IconContainer>
          </InputField>

          <InputField>
            <InputContainer>
              <Field
                label={labels.offerCode}
                name="offerCode"
                id="offerCode"
                type="text"
                autoCapitalize="none"
                maxLength={55}
                component={TextBox}
                dataLocator="collectorNumber"
                value={airmilesBannerData.offerCode}
                onBlur={handleSubmit}
              />
            </InputContainer>
            <IconContainer>
              <ReactTooltip withOverlay={false} popover={this.popover(labels.offerFlyout)}>
                <Image source={infoIcon} height={15} width={15} />
              </ReactTooltip>
            </IconContainer>
          </InputField>
        </FlexRow>
        <Header>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontSize="fs10"
            textAlign="center"
            color="gray.800"
            text={labels.footerText}
          />
        </Header>
      </AirmilesBannerFormContainer>
    );
  }
}

AirmilesBanner.propTypes = {
  labels: PropTypes.shape({}),
  airmilesBannerData: PropTypes.shape({}),
  onAddAirmilesBanner: PropTypes.func,
  orderId: PropTypes.string,
};
AirmilesBanner.defaultProps = {
  airmilesBannerData: {},
  labels: {},
  onAddAirmilesBanner: () => {},
  orderId: ' ',
};

const validateMethod = createValidateMethod({
  rules: {
    promoId: {
      number: true,
      exactLength: 11,
    },
  },
  messages: ({ labels }) => ({
    promoId: {
      exactLength: labels.exactLength,
      number: labels.collectorOnlyNumber,
    },
  }),
});

export default reduxForm({
  form: 'AirmilesBanner',
  ...validateMethod,
  enableReinitialize: true,
})(AirmilesBanner);

export { AirmilesBanner };
