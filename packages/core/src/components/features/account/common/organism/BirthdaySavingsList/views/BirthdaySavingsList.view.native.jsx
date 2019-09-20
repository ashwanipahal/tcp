import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { View } from 'react-native';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getBirthDateOptionMap, childOptionsMap } from '@tcp/core/src/utils';
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
    };
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (status === 'success' && status !== prevProps.status) {
      this.closeAddModal();
    }
  }

  /**
   * @function showAddModal
   * @description This function will handle showing of add Children Birthday Confirmation Modal
   */
  showAddModal = () => {
    this.setState({
      addModal: true,
    });
  };

  /**
   * @function closeAddModal
   * @description This function will handle closing of add Children Birthday Confirmation Modal
   */
  closeAddModal = () => {
    this.setState({
      addModal: false,
    });
  };

  render() {
    const { labels, childrenBirthdays, view, addChildBirthday } = this.props;
    const { addModal } = this.state;
    const yearOptionsMap = getBirthDateOptionMap();
    const childOptions = childOptionsMap();
    const isEditMode = view === 'edit';
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
                    />
                  ) : (
                    <EmptyBirthdayCard
                      labels={labels}
                      view={view}
                      showAddModal={this.showAddModal}
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
              closeAddModal={this.closeAddModal}
              onSubmit={addChildBirthday}
              addChildBirthdayLabels={labels}
            />
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
  status: PropTypes.string,
};

BirthdaySavingsList.defaultProps = {
  view: constants.VIEW.EDIT,
  addChildBirthday: () => {},
  status: '',
};

export default BirthdaySavingsList;
