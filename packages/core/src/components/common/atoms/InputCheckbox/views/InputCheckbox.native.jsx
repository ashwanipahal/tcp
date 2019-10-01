import React, { Fragment } from 'React';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { RenderTree, ComponentMap } from '@fabulas/astly';
import BodyCopy from '../../BodyCopy';
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
    inputVariation: PropTypes.string,
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
    inputVariation: 'inputVariation',
  };

  constructor(props) {
    super(props);
    const { isChecked, input } = props;
    input.onChange(isChecked);
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
        <Image source={source} height="25px" width="25px" />
      </StyledImage>
    );
  }

  renderRight() {
    const { rightText, fontSize } = this.props;
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
        tree={`<div><p>${rightText}</p></div>`}
        tools={astlyBag}
        componentMap={{
          ...ComponentMap,
          span: props => (
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize={fontSize || 'fs12'}
              text={props.children}
              {...props}
            />
          ),
          a: props => {
            return (
              <BodyCopy
                mobileFontFamily="secondary"
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
      ...otherProps
    } = this.props;
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
          {rightText && this.renderRight()}
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
