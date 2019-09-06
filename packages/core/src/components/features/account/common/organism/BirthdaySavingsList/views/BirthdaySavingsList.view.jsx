import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { List } from 'immutable';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';
import constants from '../BirthdaySavingsList.constants';
import { getLabelValue } from '../../../../../../../utils';

/**
 * @function getColumnClasses
 * @description This function will return margin classes to be applied on the birthday columns.
 * As per the design, last row columns should have MED margin
 * @param {boolean} isEditMode If list is opened in edit view i.e. BirthdaySavings Page
 * @param {number} index index of the column
 */
export const getColumnClasses = (isEditMode, index) => {
  return !isEditMode && index < 2 ? 'elem-mb-LRG' : 'elem-mb-MED';
};

/**
 * @function getColumnSize
 * @description This function will return colSize based on the whether list needs to be shown in page or in My profile tile.
 * @param {boolean} isEditMode If list is opened in edit view i.e. BirthdaySavings Page or in My Profile Tile
 */
export const getColumnSize = isEditMode => {
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
export const getIgnoreGutter = (isEditMode, index) => {
  const isRightCol = (index + 1) % 2 === 0;
  return {
    large: isEditMode ? (index + 1) % 4 === 0 : isRightCol,
    medium: isEditMode ? (index + 1) % 4 === 0 : isRightCol,
    small: isRightCol,
  };
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
      activeChild: null,
    };
  }

  showRemoveModal = activeChild => {
    this.setState({
      removeModal: true,
      activeChild,
    });
  };

  closeRemoveModal = () => {
    this.setState({
      removeModal: false,
      activeChild: null,
    });
  };

  removeBirthdayHandler = activeChild => {
    const { removeBirthday } = this.props;
    removeBirthday(activeChild);
    this.closeRemoveModal();
  };

  render() {
    const { labels, childrenBirthdays, view } = this.props;
    const isEditMode = view === 'edit';
    const { removeModal, activeChild } = this.state;
    if (isEditMode || (childrenBirthdays && childrenBirthdays.size > 0)) {
      const birthdays = childrenBirthdays
        ? childrenBirthdays.setSize(constants.MAX_BIRTHDAY_CARDS)
        : List().setSize(constants.MAX_BIRTHDAY_CARDS);

      return (
        <>
          <Row fullBleed>
            {birthdays.map((birthday, index) => {
              return (
                <Col
                  key={`card_${birthday ? birthday.childId : index}`}
                  colSize={getColumnSize(isEditMode)}
                  ignoreGutter={getIgnoreGutter(isEditMode, index)}
                  className={getColumnClasses(isEditMode, index)}
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
                    <EmptyBirthdayCard labels={labels} view={view} />
                  )}
                </Col>
              );
            })}
          </Row>
          {removeModal && (
            <div>
              <BodyCopy fontSize="fs14" fontFamily="secondary">
                {getLabelValue(labels, 'lbl_profile_removeInfoText').replace(
                  /$childName$/,
                  activeChild.childName
                )}
              </BodyCopy>
              <div>
                <Button onClick={() => this.removeBirthdayHandler(activeChild)}>
                  {getLabelValue(labels, 'lbl_profile_removeCTA')}
                </Button>
                <Button onClick={this.closeRemoveModal}>
                  {getLabelValue(labels, 'lbl_profile_removeCancelCTA')}
                </Button>
              </div>
            </div>
          )}
        </>
      );
    }
    return (
      <BodyCopy fontSize="fs14" fontFamily="secondary" data-locator="pi-addbirthdayinfo">
        {labels.lbl_profile_birthday_saving_info}
      </BodyCopy>
    );
  }
}

BirthdaySavingsList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  childrenBirthdays: PropTypes.shape([]).isRequired,
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
  removeBirthday: PropTypes.func.isRequired,
};

BirthdaySavingsList.defaultProps = {
  view: constants.VIEW.EDIT,
};

export default BirthdaySavingsList;
