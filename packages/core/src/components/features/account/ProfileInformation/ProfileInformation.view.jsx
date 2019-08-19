import React from 'react';

export const ProfileInformation = props => {
  return (
    <ProfileInfoActions
      isMobile={isMobile}
      isCanada={isCanada}
      onEditPersonalInfo={this.handleEditPersonalInfo}
      toggleModalState={this.toggleModalState}
      onEditMailingAddress={this.handleEditMailingAddress}
      profileCompletion={profileCompletion}
      defaultStore={defaultStore}
      mailingAddress={mailingAddress}
      userBirthday={userBirthday}
      userSurvey={userSurvey}
      percentageIncrement={percentageIncrement}
    />
  );
};

export default ProfileInformation;
