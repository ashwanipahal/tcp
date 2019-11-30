import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const Container = styled.View`
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM} ${getAdditionalStyle};
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  ${getAdditionalStyle};
`;

export { Container, RowContainer };
