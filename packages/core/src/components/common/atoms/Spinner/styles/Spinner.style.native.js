import styled from 'styled-components';
import { Dimensions } from 'react-native';

const winHeight = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  height: ${winHeight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SpinnerWrapper;
