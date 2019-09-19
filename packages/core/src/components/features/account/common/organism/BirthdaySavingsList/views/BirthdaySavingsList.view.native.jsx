import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { View } from 'react-native';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';
import constants from '../BirthdaySavingsList.constants';
import WrapLayout from '../styles/BirthdaySavingsList.styles.native';

/**
 * @function BirthdaySavingsList
 * @description This component will render the BirthdaySavings Card list based on the view provided.
 * In case of view="edit", Add new Birthday Card will be rendered otherwise Empty space will be present.
 */
class BirthdaySavingsList extends PureComponent {
  render() {
    const { labels, childrenBirthdays, view } = this.props;
    const isEditMode = view === 'edit';
    if (isEditMode || (childrenBirthdays && childrenBirthdays.size > 0)) {
      const birthdays = childrenBirthdays
        ? childrenBirthdays.setSize(constants.MAX_BIRTHDAY_CARDS)
        : List().setSize(constants.MAX_BIRTHDAY_CARDS);

      return (
        <View>
          {isEditMode && (
            <BodyCopyWithSpacing
              fontSize="fs14"
              mobileFontFamily="secondary"
              spacingStyles="margin-bottom-XXL margin-top-XXL"
              text={labels.lbl_profile_birthday_saving_info}
            />
          )}
          <WrapLayout>
            {birthdays.map(birthday => {
              return (
                <View>
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
                    <EmptyBirthdayCard labels={labels} view={view} />
                  )}
                </View>
              );
            })}
          </WrapLayout>
        </View>
      );
    }
    return null;
  }
}

BirthdaySavingsList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  childrenBirthdays: PropTypes.shape([]).isRequired,
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
};

BirthdaySavingsList.defaultProps = {
  view: constants.VIEW.EDIT,
};

export default BirthdaySavingsList;
