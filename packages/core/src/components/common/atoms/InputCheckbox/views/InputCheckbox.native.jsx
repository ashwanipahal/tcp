import React, { Fragment } from 'React';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';
import {
  StyledCheckBox,
  StyledImage,
  StyledText,
  StyledErrorIcon,
} from '../InputCheckbox.style.native';

import { StyledErrorWrapper } from '../../TextBox/TextBox.style.native';

import Image from '../../Image';

const uncheckedIcon = require('../../../../../assets/store-locator-check.png');
const checkedIcon = require('../../../../../assets/store-locator-checked.png');
const errorIcon = require('../../../../../assets/alert-triangle.png');

class InputCheckBox extends React.Component {
  static propTypes = {
    rightText: PropTypes.string,
    isChecked: PropTypes.bool,
    onClick: PropTypes.func,
    id: PropTypes.string,
    input: PropTypes.shape({}),
    hideCheckboxIcon: PropTypes.bool,
    meta: PropTypes.func,
    fontSize: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    rightText: null,
    isChecked: false,
    onClick: () => {},
    id: 'checkbox',
    input: { val: '' },
    hideCheckboxIcon: false,
    meta: {},
    fontSize: 'fs12',
    disabled: false,
  };

  constructor(props) {
    super(props);
    const { isChecked, input } = props;
    input.onChange(isChecked);
    this.state = {
      isChecked,
    };
  }

  onClick = () => {
    const { isChecked } = this.state;
    const { onClick, id, input } = this.props;
    const checkboxState = !isChecked;
    input.onChange(checkboxState);
    this.setState({
      isChecked: checkboxState,
    });
    onClick(checkboxState, id);
  };

  genCheckedIcon() {
    const { isChecked } = this.state;
    const source = isChecked ? checkedIcon : uncheckedIcon;
    return (
      <StyledImage>
        <Image source={source} height="25px" width="25px" />
      </StyledImage>
    );
  }

  renderRight() {
    const { rightText, fontSize } = this.props;
    return <BodyCopy mobileFontFamily="secondary" fontSize={fontSize || 'fs12'} text={rightText} />;
  }

  render() {
    const { input, hideCheckboxIcon, meta, disabled, rightText, ...otherProps } = this.props;
    const { value } = input;
    const { touched, error } = meta;
    const isError = touched && error;
    return (
      <>
        <StyledCheckBox
          onStartShouldSetResponder={this.onClick}
          {...input}
          {...otherProps}
          value={value}
          pointerEvents={disabled ? 'none' : 'auto'}
        >
          {!hideCheckboxIcon && this.genCheckedIcon()}
          {rightText && <StyledText>{this.renderRight()}</StyledText>}
        </StyledCheckBox>
        <Fragment>
          {isError ? (
            <StyledErrorWrapper>
              <StyledErrorIcon>
                <Image source={errorIcon} width="15px" height="15px" />
              </StyledErrorIcon>

              <BodyCopy
                className="Checkbox__error"
                fontWeight="semibold"
                color="error"
                fontSize="fs12"
                mobilefontFamily={['secondary']}
                text={isError ? error : null}
              />
            </StyledErrorWrapper>
          ) : null}
        </Fragment>
      </>
    );
  }
}

export default InputCheckBox;
