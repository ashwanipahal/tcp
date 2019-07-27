import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/Dropdown.style';
import withStyles from '../../../hoc/withStyles';
import Anchor from '../../../atoms/Anchor';

class Dropdown extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dropDownExpend: false,
      active: props.active,
      activeComponent: props.activeComponent || null,
    };
  }

  toggleHandler = () => {
    const { dropDownExpend } = this.state;
    this.setState({
      dropDownExpend: !dropDownExpend,
    });
  };

  onClickHandler = (e, value) => {
    this.setState({
      active: value.displayName,
      activeComponent: value.component,
    });
    this.toggleHandler();
  };

  subMenuList =(subSection, activeComponent)=>{
    return (
      <BodyCopy
        component="div"
        role="button"
        textAlign="center"
        tabIndex={-1}
        onClick={e => this.onClickHandler(e, subSection)}
      >
        <Anchor
          asPath={subSection.url}
          to={subSection.href}
        >
          <li
            key={subSection.id}
            className={`dropDownLists ${ activeComponent === subSection.component ? 'dropdownActiveClass' : ''}`}
          >
            {subSection.displayName}
          </li>
        </Anchor>
      </BodyCopy>
    )
  }

  itemLists = (nav, activeComponent) => {
    return (
      <>
        <BodyCopy
          component="div"
          role="button"
          textAlign="center"
          onClick={e => this.onClickHandler(e, nav)}
          tabIndex={-1}
        >
          <Anchor
            asPath={nav.url}
            to={nav.href}
          >
            <li
              key={nav.id}
              className={`dropDownLists ${ activeComponent === nav.component ? 'dropdownActiveClass' : ''}`}
            >
              {nav.displayName}
            </li>
          </Anchor>
        </BodyCopy>
        {nav.subSections &&  nav.subSections.map(subSection =>(
          this.subMenuList(subSection,activeComponent)
          ))
        }
      </>
    );
  };


  render() {
    const { dropDownExpend, active, activeComponent } = this.state;
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
              {options.map(nav => this.itemLists(nav, activeComponent))}
            </ul>
          </BodyCopy>
        )}
      </BodyCopy>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.shape({}).isRequired,
  active: PropTypes.string,
  activeComponent: PropTypes.string,
};

Dropdown.defaultProps = {
  className: 'className',
  active: '',
  activeComponent: '',
};

export default withStyles(Dropdown, styles);
export { Dropdown as DropdownVanilla };
