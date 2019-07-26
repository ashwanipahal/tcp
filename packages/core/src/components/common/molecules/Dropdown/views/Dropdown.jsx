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
      active: props.active || 'Please Select',
      activeId: props.activeId || null,
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

  onClickHandler = (e, value, displayName) => {
    const { clickHandler } = this.props;
    this.setState({
      active: displayName,
      activeId: value,
    });
    this.toggleHandler();
    clickHandler(e, value, displayName);
  };




  itemLists = (item, options, activeId) => {
    return (
      <li
        key={item.id}
        tabIndex={-1}
        className={`${ activeId === item.id ? 'dropdownActiveClass text-align-center' : 'text-align-center'
        }`}
      >
        <BodyCopy
          component="div"
          role="button"
          textAlign="center"
          tabIndex={-1}
          key={item.id}
          onClick={e => this.onClickHandler(e, item.id, item.displayName)}
          onKeyPress={e => this.onClickHandler(e, item.id, item.displayName)}
          onKeyDown={e => this.onClickHandler(e, item.id, item.displayName)}
        >
          {item.displayName}
        </BodyCopy>
      </li>
    );
  };


  render() {
    const { dropDownExpend, active, activeId } = this.state;
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
          {active}
        </BodyCopy>
        {dropDownExpend && (
          <BodyCopy component="div" className="dropdownUpperDiv">
            <ul className="dropdownUlBorder dropDownSelect">
              {options.map(item => this.itemLists(item, options, activeId))}
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
  active: PropTypes.string,
  activeId: PropTypes.string,
};

Dropdown.defaultProps = {
  className: 'className',
  active: '',
  activeId: '',
};

export default withStyles(Dropdown, styles);
export { Dropdown as DropdownVanilla };
