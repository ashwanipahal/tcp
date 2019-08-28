import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextBox from '../../../../../../common/atoms/TextBox';
import { BodyCopy } from '../../../../../../common/atoms';
import {
  AirmilesBannerFormContainer,
  Header,
  FlexRow,
  InputField,
} from '../styles/AirmilesBanner.style.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';

// @flow

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
          </InputField>

          <InputField>
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
