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
  customSelectOnChangeHandler: Function,
  addClickhandler: Function,
  options: Object,
};

class CustomSelect extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      selectedDefault: 'Please Select',
      ValueForActiveClass: null,
    };
  }

  toggleHandler = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  clickHandler = (e, value, title) => {
    const { customSelectOnChangeHandler } = this.props;
    this.setState({
      selectedDefault: title,
      ValueForActiveClass: value,
    });
    this.toggleHandler();
    customSelectOnChangeHandler(e, value, title);
  };

  render() {
    const { toggle, selectedDefault, ValueForActiveClass } = this.state;
    const { className, selectListTitle, addClickhandler, options } = this.props;
    return (
      <div className={className}>
        <span>{selectListTitle}</span>

        <BodyCopy onClick={this.toggleHandler} className="customSelectTitle">
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
            addClickhandler={addClickhandler}
            clickHandler={this.clickHandler}
            ValueForActiveClass={ValueForActiveClass}
          />
        )}
      </div>
    );
  }
}

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
