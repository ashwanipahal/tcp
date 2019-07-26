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
      activeId: props.activeId || null,
    };
  }

  toggleHandler = () => {
    const { dropDownExpend } = this.state;
    this.setState({
      dropDownExpend: !dropDownExpend,
    });
  };

  onClickHandler = (e, value, displayName) => {
    this.setState({
      active: displayName,
      activeId: value,
    });
    this.toggleHandler();
  };

  itemLists = (nav, options, activeId) => {
    return (
      <>
        <li
          key={nav.id}
          tabIndex={-1}
          className={`${ activeId === nav.id ? 'dropdownActiveClass text-align-center' : 'text-align-center'
          }`}
        >
          <BodyCopy
            component="div"
            role="button"
            textAlign="center"
            tabIndex={-1}
            key={nav.id}
            onClick={e => this.onClickHandler(e, nav.id, nav.displayName)}
          >
            <Anchor
              asPath={nav.url}
              to={nav.href}
            >
              {nav.displayName}
            </Anchor>
          </BodyCopy>
        </li>
        {nav.subSections &&  nav.subSections.map(subSection => {
          return (
            <li
              key={subSection.id}
              tabIndex={-1}
              className={`${ activeId === subSection.id ? 'dropdownActiveClass text-align-center' : 'text-align-center'
              }`}
            >
              <BodyCopy
                component="div"
                role="button"
                textAlign="center"
                tabIndex={-1}
                key={subSection.id}
                onClick={e => this.onClickHandler(e, subSection.id, subSection.displayName)}
              >
                <Anchor
                  asPath={subSection.url}
                  to={subSection.href}
                >
                  {subSection.displayName}
                </Anchor>
              </BodyCopy>
            </li>
          )})
          }
      </>

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
              {options.map(nav => this.itemLists(nav, options, activeId))}
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
  activeId: PropTypes.string,
};

Dropdown.defaultProps = {
  className: 'className',
  active: '',
  activeId: '',
};

export default withStyles(Dropdown, styles);
export { Dropdown as DropdownVanilla };
