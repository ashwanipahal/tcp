import React from 'react'
import { Field, reduxForm } from 'redux-form';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Button from '@tcp/core/src/components/common/atoms/Button';
const AddressBook = props => {
  return (
    <form>
      <Grid>
      <br/>
        <Row>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
            <Field placeholder="First Name" component={TextBox} />
          </Col>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
            <Field placeholder="Last Name" component={TextBox} />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
            <Field placeholder="Address Line 1" component={TextBox} />
          </Col>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
            <Field placeholder="Address Line 2( Optional )" component={TextBox} />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
            <Field placeholder="City" component={TextBox} />
          </Col>
          <Col colSize={{small: 1, medium: 1, large: 3}}>
            <select>
              <option value="" disabled>dfdfdf  fdfs fdsfs</option>
            </select>
          
          </Col>
          <Col colSize={{small: 1, medium: 1, large: 3}}>
            <Field placeholder="Zip" component={TextBox} />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
          <select>
              <option value="" disabled>dfdfdf  fdfs fdsfs</option>
            </select>
          </Col>
          <Col colSize={{small: 1, medium: 1, large: 6}}>
            <Field placeholder="phone number" component={TextBox} />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col colSize={{small: 1, medium: 1, large: 12}}>
            <Field name="employed"
            id="employed"
            component={TextBox}
            type="checkbox"  />  <label htmlFor="employed">Employed</label>
          </Col>
        </Row>
        <br/>
        <Row>
        <Col colSize={{small: 1, medium: 1, large: 3}}>
          <Button buttonVariation="fixed-width">Cancel</Button>
        </Col>
        <Col colSize={{small: 1, medium: 1, large: 3}}>
          <Button text="BLUE" buttonVariation="fixed-width">Add Address</Button>
        </Col>
        </Row>
      </Grid>
    </form>
  )
};


export default reduxForm({
  form: 'addressinfo' // a unique identifier for this form
})(AddressBook)