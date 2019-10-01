import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getBirthDateOptionMap, childOptionsMap } from '@tcp/core/src/utils';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import styles from '../styles/BirthdaySavingsList.style';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';
import constants from '../BirthdaySavingsList.constants';
import { getLabelValue } from '../../../../../../../utils';
import AddChildBirthdayForm from '../../../molecule/AddChild';

/**
 * Functional component to render Birthday Saving Info Message
 * @param {object} props
 */
export const InfoMessage = ({ labels }) => (
  <BodyCopy fontSize="fs14" fontFamily="secondary" className="elem-mb-XXL" data-locator="instrText">
    {labels.lbl_profile_birthday_saving_info}
  </BodyCopy>
);

InfoMessage.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_saving_info: PropTypes.string,
  }),
};

InfoMessage.defaultProps = {
  labels: {
    lbl_profile_birthday_saving_info: '',
  },
};

/**
 * @function BirthdaySavingsList
 * @description This component will render the BirthdaySavings Card list based on the view provided.
 * In case of view="edit", Add new Birthday Card will be rendered otherwise Empty space will be present.
 */
export class BirthdaySavingsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      removeModal: false,
      addModal: false,
      activeChild: null,
      selectedChild: -1,
    };
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (status === 'success' && status !== prevProps.status) {
      this.closeRemoveModal();
      this.closeAddModal();
    }
  }

  /**
   * @function getColumnClasses
   * @description This function will return margin classes to be applied on the birthday columns.
   * As per the design, last row columns should have MED margin
   * @param {boolean} isEditMode If list is opened in edit view i.e. BirthdaySavings Page
   * @param {number} index index of the column
   */
  getColumnClasses = (isEditMode, index) => {
    return !isEditMode && index < 2 ? 'elem-mb-LRG' : 'elem-mb-MED';
  };

  /**
   * @function getColumnSize
   * @description This function will return colSize based on the whether list needs to be shown in page or in My profile tile.
   * @param {boolean} isEditMode If list is opened in edit view i.e. BirthdaySavings Page or in My Profile Tile
   */
  getColumnSize = isEditMode => {
    return {
      small: 3, // in small viewport, both birthday Saving page and tile will show 2 Birthday saving card
      medium: isEditMode ? 2 : 4, // in tablet, tile will show 2 Birthday saving card and page will show 4 Birthday saving card
      large: isEditMode ? 3 : 6, // in desktop, tile will show 2 Birthday saving card and page will show 4 Birthday saving card
    };
  };

  /**
   * @function getIgnoreGutter
   * @description This function will return ignoreGutter based on the whether list needs to be shown in page or in My profile tile.
   * @param {boolean} isEditMode If list is opened in edit view i.e. BirthdaySavings Page or in My Profile Tile
   * @param {number} index index of the current card
   */
  getIgnoreGutter = (isEditMode, index) => {
    const isRightCol = (index + 1) % 2 === 0;
    return {
      large: isEditMode ? (index + 1) % 4 === 0 : isRightCol,
      medium: isEditMode ? (index + 1) % 4 === 0 : isRightCol,
      small: isRightCol,
    };
  };

  /**
   * @function showRemoveModal
   * @description This function will handle showing of remove Children Birthday Confirmation Modal
   * @param {object} activeChild Current active children information to be removed
   */
  showRemoveModal = activeChild => {
    this.setState({
      removeModal: true,
      activeChild,
    });
    this.closeAddModal();
  };

  /**
   * @function closeRemoveModal
   * @description This function will handle closing of remove Children Birthday Confirmation Modal
   */
  closeRemoveModal = () => {
    this.setState({
      removeModal: false,
      activeChild: null,
    });
  };

  /**
   * @function showAddModal
   * @description This function will handle showing of add Children Birthday Confirmation Modal
   */
  showAddModal = activeChild => {
    this.setState({
      addModal: true,
      activeChild,
    });
    this.closeRemoveModal();
  };

  /**
   * @function closeAddModal
   * @description This function will handle closing of add Children Birthday Confirmation Modal
   */
  closeAddModal = () => {
    this.setState({
      addModal: false,
      selectedChild: -1,
    });
  };

  /**
   * @function removeBirthdayHandler
   * @description This function will call removeBirthday prop with required params
   * @param {object} activeChild Current active children information to be removed
   */
  removeBirthdayHandler = activeChild => {
    const { removeBirthday } = this.props;
    removeBirthday(activeChild);
  };

  toggleSelectedChild = index => {
    this.setState({
      selectedChild: index,
    });
  };

  getActiveChildOffset = selectedIndex => {
    if (document) {
      const birthdayList = document.querySelector('.birthdayList');
      if (birthdayList && birthdayList.children[selectedIndex]) {
        const t = birthdayList.children[selectedIndex];
        return {
          top: t.offsetTop + t.offsetHeight + 30,
          left: t.offsetLeft + t.offsetWidth / 2,
        };
      }
    }
    return null;
  };

  render() {
    const {
      labels,
      childrenBirthdays,
      view,
      className,
      status,
      message,
      addChildBirthday,
    } = this.props;
    const isEditMode = view === 'edit';
    const { removeModal, activeChild, addModal, selectedChild } = this.state;
    const yearOptionsMap = getBirthDateOptionMap();
    const childOptions = childOptionsMap();

    if (isEditMode || (childrenBirthdays && childrenBirthdays.size > 0)) {
      const birthdays = childrenBirthdays
        ? childrenBirthdays.setSize(constants.MAX_BIRTHDAY_CARDS)
        : List().setSize(constants.MAX_BIRTHDAY_CARDS);

      return (
        <div className={className}>
          {isEditMode && (
            <>
              {status && <Notification status={status} message={message} scrollIntoView />}
              <InfoMessage labels={labels} />
            </>
          )}
          <Row fullBleed className="elem-mb-XS birthdayList">
            {birthdays.map((birthday, index) => {
              return (
                <Col
                  key={`card_${birthday ? birthday.get('childId') : index}`}
                  colSize={this.getColumnSize(isEditMode)}
                  ignoreGutter={this.getIgnoreGutter(isEditMode, index)}
                  className={this.getColumnClasses(isEditMode, index)}
                >
                  {birthday ? (
                    <BirthdayCardComponent
                      name={birthday.get('name')}
                      birthYear={birthday.get('birthYear')}
                      birthMonth={birthday.get('birthMonth')}
                      gender={birthday.get('gender')}
                      childId={birthday.get('childId')}
                      view={view}
                      removeBirthday={this.showRemoveModal}
                    />
                  ) : (
                    <EmptyBirthdayCard
                      id={index}
                      labels={labels}
                      view={view}
                      showAddModal={this.showAddModal}
                      toggleSelectedChild={this.toggleSelectedChild}
                      active={selectedChild}
                    />
                  )}
                </Col>
              );
            })}
          </Row>
          {removeModal && (
            <div>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                className="elem-mb-XXXL"
                data-locator="warningMsgToRemove"
              >
                {getLabelValue(labels, 'lbl_profile_removeInfoText').replace(
                  /\$childName\$/,
                  activeChild.childName
                )}
              </BodyCopy>
              <Row fullBleed className="elem-mb-MED">
                <Col colSize={{ small: 6, medium: 3, large: 3 }} className="submitCta elem-mb-MED">
                  <Button
                    buttonVariation="fixed-width"
                    fill="BLUE"
                    onClick={() => this.removeBirthdayHandler(activeChild)}
                    data-locator="yesRemoveBtn"
                  >
                    {getLabelValue(labels, 'lbl_profile_removeCTA')}
                  </Button>
                </Col>
                <Col
                  className="cancelCta"
                  colSize={{ small: 6, medium: 3, large: 3 }}
                  offsetLeft={{ medium: 1, large: 3 }}
                >
                  <Button
                    buttonVariation="fixed-width"
                    fill="WHITE"
                    onClick={this.closeRemoveModal}
                    data-locator="noBtnInBirthdaySavings"
                  >
                    {getLabelValue(labels, 'lbl_profile_removeCancelCTA')}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          {addModal && (
            <AddChildBirthdayForm
              birthMonthOptionsMap={yearOptionsMap.monthsMap}
              birthYearOptionsMap={childOptions.yearsMap}
              timestamp={new Date()}
              childOptions={childOptions.genderMap}
              closeAddModal={this.closeAddModal}
              onSubmit={addChildBirthday}
              addChildBirthdayLabels={labels}
              offset={this.getActiveChildOffset(selectedChild)}
            />
          )}
        </div>
      );
    }
    return <InfoMessage labels={labels} />;
  }
}

BirthdaySavingsList.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
  childrenBirthdays: PropTypes.shape([]).isRequired,
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
  removeBirthday: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
  addChildBirthday: PropTypes.func,
};

BirthdaySavingsList.defaultProps = {
  view: constants.VIEW.EDIT,
  className: '',
  removeBirthday: () => {},
  status: '',
  message: '',
  addChildBirthday: () => {},
};

export default withStyles(BirthdaySavingsList, styles);
