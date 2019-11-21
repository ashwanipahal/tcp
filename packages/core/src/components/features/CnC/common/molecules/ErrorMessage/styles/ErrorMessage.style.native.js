import styled from 'styled-components/native';

const errorViewPaddingTop = ({ bagPage }) => {
  return `
    ${bagPage ? '22px' : '6px'}
  `;
};

const errorViewBackgroundColor = props => {
  return `${props.showAccordian ? props.theme.colors.WHITE : props.theme.colors.PRIMARY.PALEGRAY}`;
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
  justify-content: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor(props) : errorViewBackgroundColor(props)};
`;

export const ErrorIcon = {
  height: 13,
  width: 13,
  marginTop: 3,
  marginRight: 8,
  marginBottom: 0,
  marginLeft: 0,
};

export const ErrorText = {
  flexWrap: 'wrap',
  flex: 1,
};
