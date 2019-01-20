import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";
import TextField from '@material-ui/core/TextField';

class AccountTransaction extends Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }
  
  formRef = null;
  titleInput;
  inputMap = new Map();
  
  setFormRef = (element, test) => {
    this.formRef = element;
    console.log();
  };
  
  render(){
    const {createTransaction, cancelTransaction} = this.props;
    return (
        <form ref={this.myRef} className="AccountTransaction">
          <GridContainer>
            <GridItem xs={12}>
              <CustomInput
                  labelText="Title"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    inputRef: this.setControl
                  }}
              />
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                  labelText="Amount"
                  id="amount"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'number',
                    inputRef: this.setControl
                  }}
              />
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                  labelText="Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    inputRef: this.setControl
                  }}
              />
            </GridItem>
            <GridItem xs={6}>
              <Button variant="contained" fullWidth onClick={() => cancelTransaction()}>
                Cancel
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button variant="contained" color="primary" fullWidth onClick={this.handleApply}>
                Apply
              </Button>
            </GridItem>
          </GridContainer>
        </form>
    )
  }
  
  setControl = (el) => {
    if (el && el.id) {
      this.inputMap.set(el.id, el);
    }
  };
  
  handleApply = () => {
    const formCollection = this.myRef.current.elements;
    console.log(this.myRef);
    const newTransaction = {};
    console.log(this.inputMap.forEach((element, name) => {
      console.log();
      newTransaction[name] = element.type === 'number' ? parseFloat(element.value) : element.value;
    }));
    console.log(newTransaction);
    this.props.createTransaction(newTransaction);
  }
}
AccountTransaction.propTypes = {
  createTransaction: PropTypes.func,
  cancelTransaction: PropTypes.func,
}

export default AccountTransaction;
