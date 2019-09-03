import styled, { css } from 'styled-components';

const Container = styled.TouchableOpacity`
  align-items: center;
  background: transparent;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const brandIconStyles = css`
  border-radius: 100px;
  position: absolute;
  bottom: 0px;
  width: 90px;
  height: 90px;
  justify-content: center;
  align-items: center;
`;

const TCPIcon = styled.TouchableOpacity`
  ${props => `
    border: 2px solid ${props.theme.colorPalette.blue[700]};
    box-shadow: 2px 2px 2px ${props.theme.colorPalette.blue[700]}; 
    background: ${props.theme.colorPalette.white};
    ${brandIconStyles};
  `};
`;

const GymIcon = styled.TouchableOpacity`
  ${props => `
    border: 2px solid ${props.theme.colorPalette.orange[800]};
    box-shadow: 2px 2px 2px ${props.theme.colorPalette.orange[700]}; 
    background: ${props.theme.colorPalette.white};
    ${brandIconStyles};
  `};
`;

const styles = {
  brandContainer: {
    position: 'absolute',
    bottom: 80,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { Container, TCPIcon, GymIcon, styles };
