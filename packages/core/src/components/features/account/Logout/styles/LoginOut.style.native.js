import styled from 'styled-components/native';

const logoutButtonStyle = props => {
  return `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: ${props.theme.typography.fontSizes.fs12};
  padding-top: ${props.theme.spacing.ELEM_SPACING.SM};
  `;
};

const LogoutWrapper = styled.View`
  ${logoutButtonStyle};
`;

const logggedInStyle = props => {
  return `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: ${props.theme.typography.fontSizes.fs12};
  width:100%;
  margin:${props.theme.spacing.ELEM_SPACING.LRG} 0 ${props.theme.spacing.ELEM_SPACING.XL} 0;
  `;
};

const logggedInText = props => {
  return `
  font-size: ${props.theme.typography.fontSizes.fs12};
  width:100%;
  `;
};

const LoggedinWrapper = styled.View`
  ${logggedInStyle}
  ${props => props.loggedInWrapperStyle || ''}
`;

const LoggedinTextWrapper = styled.View`
  ${logggedInText}
`;

export { LogoutWrapper, LoggedinWrapper, LoggedinTextWrapper };
