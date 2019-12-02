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
  isAddNewCC,
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
    <Container isAddNewCC={isAddNewCC}>
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
          <ViewWithSpacing spacingStyles="margin-right-XS">
            <Image source={errorIcon} alt="" width="16px" height="14px" />
          </ViewWithSpacing>
          <BodyCopy
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs12"
            text={error}
            color="error"
          />
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
  isAddNewCC: PropTypes.bool,
};

SelectBox.defaultProps = {
  id: '',
  placeholder: '',
  onValueChange: () => {},
  heading: '',
  meta: {},
  isAddNewCC: false,
};

export default SelectBox;
