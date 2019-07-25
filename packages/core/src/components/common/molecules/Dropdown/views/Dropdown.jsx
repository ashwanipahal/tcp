import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/Dropdown.style';
import withStyles from '../../../hoc/withStyles';

class Dropdown extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dropDownExpend: false,
      activeTitle: props.activeTitle || 'Please Select',
      activeValue: props.activeValue || null,
    };
  }

  toggleHandler = () => {
    console.log("furki");
    const { dropDownExpend } = this.state;
    console.log(dropDownExpend);
    console.log("furkan");
    this.setState({
      dropDownExpend: !dropDownExpend,
    });
  };

  onClickHandler = (e, value, title) => {
    const { clickHandler } = this.props;
    this.setState({
      activeTitle: title,
      activeValue: value,
    });
    this.toggleHandler();
    clickHandler(e, value, title);
  };




  itemLists = (item, options, activeValue) => {
    return (
      <li
        key={item.value}
        tabIndex={-1}
        className={`${ activeValue === item.value ? 'dropdownActiveClass text-align-center' : 'text-align-center'
        }`}
      >
        <BodyCopy
          component="div"
          role="button"
          textAlign="center"
          tabIndex={-1}
          key={item.value}
          onClick={e => this.onClickHandler(e, item.value, item.title)}
          onKeyPress={e => this.onClickHandler(e, item.value, item.title)}
          onKeyDown={e => this.onClickHandler(e, item.value, item.title)}
        >
          {item.title}
        </BodyCopy>
      </li>
    );
  };


  render() {
    const { dropDownExpend, activeTitle, activeValue } = this.state;
    const { className, options } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <BodyCopy
          component="div"
          onClick={this.toggleHandler}
          className="customSelectTitle"
          fontFamily="secondary"
          fontSize="fs13"
          textAlign="center"
          fontWeight="extrabold"
        >
          <BodyCopy component="div" className={`${dropDownExpend ? 'customSelectTitleUpImg' : 'customSelectTitleImg'}`} />
          {activeTitle}
        </BodyCopy>
        {dropDownExpend && (
          <BodyCopy component="div" className="dropdownUpperDiv">
            <ul className="dropdownUlBorder dropDownSelect">
              {options.map(item => this.itemLists(item, options, activeValue))}
            </ul>
          </BodyCopy>
        )}
      </BodyCopy>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired,
  activeTitle: PropTypes.string,
  activeValue: PropTypes.string,
};

Dropdown.defaultProps = {
  className: 'className',
  activeTitle: '',
  activeValue: '',
};

export default withStyles(Dropdown, styles);
export { Dropdown as DropdownVanilla };
