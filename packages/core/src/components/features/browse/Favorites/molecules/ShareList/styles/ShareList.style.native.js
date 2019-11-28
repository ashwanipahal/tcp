import styled from 'styled-components/native';
import TextBox from '../../../../../../common/atoms/TextBox';

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

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  ${getAdditionalStyle};
`;

export { Container, RowContainer };
