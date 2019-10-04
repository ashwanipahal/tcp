import styled from 'styled-components/native';

const errorViewPaddingTop = ({ bagPage }) => {
  return `
    ${bagPage ? '22px' : '6px'}
  `;
};
export const ErrorView = styled.View`
  display: flex;
  padding: ${props =>
      props.showAccordian
        ? '0'
        : errorViewPaddingTop({
            bagPage: props.bagPage,
          })}
    15px ${props => (props.showAccordian || props.bagPage ? '0' : '13px')} 12px;
  flex-direction: row;
  background-color: ${props =>
    props.showAccordian ? props.theme.colors.WHITE : props.theme.colors.PRIMARY.PALEGRAY};
`;

export const ErrorIcon = {
  height: 13,
  width: 13,
  marginTop: 3,
  marginRight: 13,
  marginBottom: 0,
  marginLeft: 0,
};

export const ErrorText = {
  flexWrap: 'wrap',
  flex: 1,
};
