import styled, { css } from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margin, width } = props;
  return {
    ...(margin && { margin }),
    ...(width && { width }),
  };
};

const Container = styled.View`
  justify-content: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
  ${getAdditionalStyle}
`;

const EmptyView = styled.View`
  ${getAdditionalStyle};
`;

const styles = css``;

export { styles, Container, RowContainer, EmptyView };
