import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/EmptyBirthdayCard.style';

/**
 * This component will render Empty Birthday Card
 * @param {object} props for EmptyBirthdayCard component
 * @param { string } props.className
 * @param { string } props.view
 * @param { object } props.labels
 */
class EmptyBirthdayCard extends React.PureComponent {
  toggleClass = event => {
    event.preventDefault();
    const { showAddModal, toggleSelectedChild, id } = this.props;
    toggleSelectedChild(id);
    showAddModal();
  };

  render() {
    const { className, view, labels, active, id } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          component="div"
          className={
            active === id ? 'emptyBirthdayCard emptyBirthdayCard__active' : 'emptyBirthdayCard'
          }
          textAlign="center"
        >
          {view === 'edit' && (
            <div>
              <BodyCopy component="span" fontSize="fs14" className="elem-mr-XXS">
                +
              </BodyCopy>
              <Anchor
                underline
                fontSizeVariation="large"
                anchorVariation="primary"
                data-locator="addAChildLnk"
                onClick={this.toggleClass}
                noLink
              >
                {labels.lbl_profile_addChildBirthdayCta}
              </Anchor>
            </div>
          )}
        </BodyCopy>
      </div>
    );
  }
}

EmptyBirthdayCard.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  view: PropTypes.oneOf(['read', 'edit']),
  showAddModal: PropTypes.func,
  toggleSelectedChild: PropTypes.func,
  active: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

EmptyBirthdayCard.defaultProps = {
  view: 'edit',
  showAddModal: () => {},
  toggleSelectedChild: () => {},
};

export default withStyles(EmptyBirthdayCard, styles);
