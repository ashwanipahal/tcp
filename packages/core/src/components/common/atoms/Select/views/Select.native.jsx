import React from 'react';
import PropTypes from 'prop-types';
import { StyledErrorWrapper, ViewWithSpacing } from '../../styledWrapper/styledWrapper.native';
import { StyledHeading, Container } from '../Select.style.native';
import NativeDropdown from '../../NativeDropDown';
import BodyCopy from '../../BodyCopy';
import Image from '../../Image';

const errorIcon = require('../../../../../assets/alert-triangle.png');

const SelectBox = ({
  id,
  name,
  input,
  options,
  heading,
  onValueChange,
  placeholder,
  meta: { touched, error },
  ...otherProps
}) => {
  const isFocussed = !!input.value;
  if (placeholder && !input.value && options && options[0].displayName !== placeholder) {
    options.unshift({
      displayName: placeholder,
      id: '',
    });
  }
  return (
    <Container>
      <StyledHeading
        isFocussed={isFocussed}
        fontSize={isFocussed ? 'fs10' : 'fs14'}
        fontWeight={isFocussed ? 'extrabold' : 'regular'}
        text={heading}
      />
      <NativeDropdown
        onValueChange={value => {
          input.onChange(value);
          input.onBlur(value);
          onValueChange(value);
        }}
        data={options}
        selectedValue={input.value}
        id={id}
        name={name}
        buttonVariation="mobileApp-select"
        width="100%"
        {...otherProps}
      />
      {touched && error && (
        <StyledErrorWrapper>
          <ViewWithSpacing spacingStyles="margin-right-XXXS">
            <Image source={errorIcon} width="15px" height="15px" />
          </ViewWithSpacing>
          <BodyCopy fontWeight="semibold" fontSize="fs12" text={error} color="error" />
        </StyledErrorWrapper>
      )}
    </Container>
  );
};

SelectBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  options: PropTypes.shape([]).isRequired,
  onValueChange: PropTypes.func,
  heading: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.bool,
  }),
};

SelectBox.defaultProps = {
  id: '',
  placeholder: '',
  onValueChange: () => {},
  heading: '',
  meta: {},
};

export default SelectBox;
