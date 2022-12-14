import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { RenderTree, ComponentMap } from '@fabulas/astly';
import BodyCopy from '../../BodyCopy';
import { BodyCopyWithSpacing } from '../../styledWrapper';
import { StyledCheckBox, StyledImage, StyledErrorIcon } from '../InputCheckbox.style.native';

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
    checkBoxLabel: PropTypes.bool,
    execOnChangeByDefault: PropTypes.bool,
    children: PropTypes.string,
    inputVariation: PropTypes.string,
    textMargin: PropTypes.string,
  };

  static defaultProps = {
    rightText: null,
    isChecked: false,
    execOnChangeByDefault: true,
    onClick: () => {},
    id: 'checkbox',
    input: { val: '' },
    hideCheckboxIcon: false,
    meta: {},
    fontSize: 'fs12',
    disabled: false,
    inputVariation: 'inputVariation',
    checkBoxLabel: false,
    children: null,
    textMargin: null,
  };

  constructor(props) {
    super(props);
    const { isChecked, input, execOnChangeByDefault } = props;
    if (execOnChangeByDefault) input.onChange(isChecked);
    this.state = {
      isChecked,
    };
  }

  componentDidUpdate(prevProps) {
    const { isChecked: isCheckedProp } = this.props;
    const { isChecked: isCheckedState } = this.state;
    if (prevProps.isChecked !== isCheckedProp && isCheckedProp !== isCheckedState) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        isChecked: isCheckedProp,
      });
    }
  }

  onClick = () => {
    const { isChecked } = this.state;
    const { onClick, id, input } = this.props;
    const checkboxState = !isChecked;
    this.setState(
      {
        isChecked: checkboxState,
      },
      () => {
        input.onChange(checkboxState);
        onClick(checkboxState, id);
      }
    );
  };

  genCheckedIcon() {
    const { isChecked } = this.state;
    const source = isChecked ? checkedIcon : uncheckedIcon;
    return (
      <StyledImage>
        <Image source={source} alt="" height="25px" width="25px" />
      </StyledImage>
    );
  }

  renderRight() {
    const { rightText, fontSize, textMargin } = this.props;
    const astlyBag = {
      navigate(node) {
        const { tagName, properties } = node;
        const { href } = properties;

        Alert.alert(
          `You just clicked on an ${tagName} tag for ${href}`,
          JSON.stringify(node, null, 2)
        );
      },
    };

    return (
      <RenderTree
        tree={`<span>${rightText}</span>`}
        tools={astlyBag}
        componentMap={{
          ...ComponentMap,
          span: props => (
            <BodyCopy
              margin={textMargin}
              fontFamily="secondary"
              fontSize={fontSize || 'fs12'}
              text={props.children}
              {...props}
            />
          ),
          a: props => {
            return (
              <BodyCopy
                margin={textMargin}
                fontFamily="secondary"
                fontSize={fontSize || 'fs12'}
                text={props.children}
                {...props}
              />
            );
          },
        }}
      />
    );
  }

  render() {
    const {
      input,
      hideCheckboxIcon,
      meta,
      disabled,
      rightText,
      inputVariation,
      checkBoxLabel,
      children,
      fontSize,
      ...otherProps
    } = this.props;
    const { isChecked } = this.state;
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
          accessible
          // eslint-disable-next-line react-native-a11y/has-valid-accessibility-role
          accessibilityRole="checkbox"
          accessibilityLabel={children}
          pointerEvents={disabled ? 'none' : 'auto'}
          accessibilityState={{
            disabled,
            checked: isChecked,
          }}
        >
          {!hideCheckboxIcon && this.genCheckedIcon()}
          {rightText && this.renderRight()}
          {checkBoxLabel && (
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize={fontSize}
              text={children}
              {...otherProps}
              spacingStyles="margin-top-XXS"
            />
          )}
        </StyledCheckBox>
        <Fragment>
          {isError ? (
            <StyledErrorWrapper>
              <StyledErrorIcon>
                <Image source={errorIcon} alt="" width="16px" height="14px" />
              </StyledErrorIcon>

              <BodyCopy
                className="Checkbox__error"
                fontWeight="extrabold"
                color="error"
                fontSize="fs12"
                fontFamily="secondary"
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
