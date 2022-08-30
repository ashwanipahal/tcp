import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const Container = styled.View`
  justify-content: center;
  ${getAdditionalStyle};
`;

export default Container;
