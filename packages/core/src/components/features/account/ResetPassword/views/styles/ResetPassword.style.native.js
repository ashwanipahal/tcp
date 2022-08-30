import styled from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
    margin: 0px ${theme.spacing.APP_LAYOUT_SPACING.XS} 0px ${theme.spacing.APP_LAYOUT_SPACING.XS};
    justify-content: center;
  `;
};

const ContainerWrapper = styled.View`
  ${getPageStyle}
`;

export default ContainerWrapper;
