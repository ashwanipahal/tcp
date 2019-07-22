import React from 'react';
import DropdownList from '../../DropdownList';
import BodyCopy from '../../../atoms/BodyCopy';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';
import styles from '../styles/CustomSelect.style';
import withStyles from '../../../hoc/withStyles';

// @flow
type Props = {
  className: string,
  selectListTitle: string,
  clickHandler: Function,
  options: Object,
  defaultTitle: String,
  activeClassValue: String,
};

class CustomSelect extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      selectedDefault: props.defaultTitle || 'Please Select',
      activeClassValue: props.activeClassValue || null,
    };
  }

  toggleHandler = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  clickHandler = (e, value, title) => {
    const { clickHandler } = this.props;
    this.setState({
      selectedDefault: title,
      activeClassValue: value,
    });
    this.toggleHandler();
    clickHandler(e, value, title);
  };

  render() {
    const { toggle, selectedDefault, activeClassValue } = this.state;
    const { className, selectListTitle, options } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <span>{selectListTitle}</span>
        <BodyCopy component="div" onClick={this.toggleHandler} className="customSelectTitle">
          <Row>
            <Col
              colSize={{
                small: 6,
                large: 12,
                medium: 8,
              }}
            >
              {selectedDefault}
            </Col>
          </Row>
        </BodyCopy>
        {toggle && (
          <DropdownList
            optionsMap={options}
            clickHandler={this.clickHandler}
            activeClassValue={activeClassValue}
          />
        )}
      </BodyCopy>
    );
  }
}

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
