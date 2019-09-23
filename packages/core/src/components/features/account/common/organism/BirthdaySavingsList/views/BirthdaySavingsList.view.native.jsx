import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { View } from 'react-native';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getBirthDateOptionMap, childOptionsMap } from '@tcp/core/src/utils';
import Button from '@tcp/core/src/components/common/atoms/Button';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';
import constants from '../BirthdaySavingsList.constants';
import { WrapLayout, WrapItem } from '../styles/BirthdaySavingsList.styles.native';
import { getLabelValue } from '../../../../../../../utils';
import AddChildBirthdayForm from '../../../molecule/AddChild';

/**
 * Functional component to render Birthday Saving Info Message
 * @param {object} props
 */
export const InfoMessage = ({ labels, spacingStyles }) => (
  <BodyCopyWithSpacing
    fontSize="fs14"
    mobileFontFamily="secondary"
    spacingStyles={spacingStyles}
    text={getLabelValue(labels, 'lbl_profile_birthday_saving_info')}
  />
);

InfoMessage.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_saving_info: PropTypes.string,
  }),
  spacingStyles: PropTypes.string,
};

InfoMessage.defaultProps = {
  labels: {
    lbl_profile_birthday_saving_info: '',
  },
  spacingStyles: '',
};

/**
 * @function BirthdaySavingsList
 * @description This component will render the BirthdaySavings Card list based on the view provided.
 * In case of view="edit", Add new Birthday Card will be rendered otherwise Empty space will be present.
 */
class BirthdaySavingsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      removeModal: false,
      activeChild: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { status, message, toastMessage } = this.props;
    if (status !== prevProps.status) {
      if (status === 'success') {
        this.closeRemoveModal();
        this.toggleAddModal(true);
      } else toastMessage(message);
    }
  }

  /**
   * @function toggleAddModal
   * @description This function will handle toggling of add Children Birthday Modal
   */
  toggleAddModal = isOpen => {
    this.setState({
      addModal: !isOpen,
    });
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
   * @function removeBirthdayHandler
   * @description This function will call removeBirthday prop with required params
   * @param {object} activeChild Current active children information to be removed
   */
  removeBirthdayHandler = activeChild => {
    const { removeBirthday } = this.props;
    removeBirthday(activeChild);
  };

  render() {
    const { labels, childrenBirthdays, view, addChildBirthday } = this.props;
    const { removeModal, activeChild, addModal } = this.state;
    const isEditMode = view === 'edit';
    const yearOptionsMap = getBirthDateOptionMap();
    const childOptions = childOptionsMap();

    const removeButtonStyle = {
      marginTop: 59,
    };

    const cancelButtonStyle = {
      marginTop: 20,
    };

    if (isEditMode || (childrenBirthdays && childrenBirthdays.size > 0)) {
      const birthdays = childrenBirthdays
        ? childrenBirthdays.setSize(constants.MAX_BIRTHDAY_CARDS)
        : List().setSize(constants.MAX_BIRTHDAY_CARDS);

      return (
        <View>
          {isEditMode && (
            <InfoMessage labels={labels} spacingStyles="margin-bottom-XXL margin-top-XXL" />
          )}
          <WrapLayout>
            {birthdays.map(birthday => {
              return (
                <WrapItem>
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
                      labels={labels}
                      view={view}
                      showAddModal={() => this.toggleAddModal(false)}
                    />
                  )}
                </WrapItem>
              );
            })}
          </WrapLayout>
          {addModal && (
            <AddChildBirthdayForm
              birthMonthOptionsMap={yearOptionsMap.monthsMap}
              birthYearOptionsMap={childOptions.yearsMap}
              timestamp={new Date()}
              childOptions={childOptions.genderMap}
              closeAddModal={() => this.toggleAddModal(true)}
              onSubmit={addChildBirthday}
              addChildBirthdayLabels={labels}
            />
          )}
          {removeModal && (
            <View>
              <BodyCopyWithSpacing
                mobileFontFamily="secondary"
                fontSize="fs14"
                color="gray.900"
                text={getLabelValue(labels, 'lbl_profile_removeInfoText').replace(
                  /\$childName\$/,
                  activeChild.childName
                )}
                spacingStyles="margin-top-MED"
              />
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                onPress={() => this.removeBirthdayHandler(activeChild)}
                text={getLabelValue(labels, 'lbl_profile_removeCTA')}
                style={removeButtonStyle}
              />
              <Button
                buttonVariation="fixed-width"
                fill="WHITE"
                text={getLabelValue(labels, 'lbl_profile_removeCancelCTA')}
                style={cancelButtonStyle}
                onPress={this.closeRemoveModal}
              />
            </View>
          )}
        </View>
      );
    }
    return <InfoMessage labels={labels} spacingStyles="margin-bottom-XXL" />;
  }
}

BirthdaySavingsList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  childrenBirthdays: PropTypes.shape([]).isRequired,
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
  addChildBirthday: PropTypes.func,
  removeBirthday: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
  toastMessage: PropTypes.func,
};

BirthdaySavingsList.defaultProps = {
  view: constants.VIEW.EDIT,
  addChildBirthday: () => {},
  status: '',
  removeBirthday: () => {},
  message: '',
  toastMessage: () => {},
};

export default BirthdaySavingsList;
