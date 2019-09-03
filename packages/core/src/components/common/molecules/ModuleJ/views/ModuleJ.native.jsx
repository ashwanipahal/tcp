import React from 'react';
import PropTypes from 'prop-types';

import { Container, ResponseContainer } from '../ModuleJ.style.native';

import ProductListTabs from '../../../organisms/ProductListTabs';
import { BodyCopy } from '../../../atoms';

const categoryListMock = [
  { text: 'GIRL', catId: '49007' },
  { text: 'TODDLER GIRL', catId: '49008' },
  { text: 'BOY', catId: '49009' },
  { text: 'TODDLER BOY', catId: '49010' },
];

class ModuleJ extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      catId: '',
    };
  }

  onProductTabChange = catId => {
    this.setState({
      catId,
    });
  };

  render() {
    const { catId } = this.state;
    const { productListTabs } = this.props;
    const productListDetailStr = JSON.stringify(productListTabs[catId]);

    return (
      <Container>
        <ProductListTabs
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
        <ResponseContainer>
          <BodyCopy text={`Module J | Tab Module | Selected Category id: ${catId}`} />
        </ResponseContainer>
        <ResponseContainer>
          <BodyCopy text={productListDetailStr} />
        </ResponseContainer>
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productListTabs: {},
};

ModuleJ.propTypes = {
  productListTabs: PropTypes.shape({}),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
