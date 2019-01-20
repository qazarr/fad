import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class AccountTransaction extends Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      selectedAccountId: this.props.account.id
    }
  }
  
  inputMap = new Map();
  
  render(){
    const {createTransaction, cancelTransaction} = this.props;
    return (
        <form className="AccountTransaction">
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
            <GridItem xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="account">Select accont for transaction</InputLabel>
                <Select
                    value={this.state.selectedAccountId}
                    onChange={this.selectionChange}
                    inputProps={{
                      name: 'account',
                      id: 'account'
                    }}
                >
                  {this.renderMenuItems()}
                </Select>
              </FormControl>
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
  
  renderMenuItems() {
    return (this.props.accounts.map((account) => {
       return <MenuItem value={account.id} key={account.id}>{account.name}</MenuItem>
    }));
  }
  
  setControl = (el) => {
    if (el && el.id) {
      this.inputMap.set(el.id, el);
    }
  };
  
  selectionChange = el => {
    console.log(el.target.value);
    this.setState({selectedAccountId: el.target.value});
  };
  
  handleApply = () => {
    const newTransaction = {};
    this.inputMap.forEach((element, name) => {
      newTransaction[name] = element.type === 'number' ? parseFloat(element.value) : element.value;
    });
    this.props.createTransaction(newTransaction, this.props.account.id, this.state.selectedAccountId);
  }
}
AccountTransaction.propTypes = {
  createTransaction: PropTypes.func,
  cancelTransaction: PropTypes.func,
  accounts: PropTypes.arrayOf(PropTypes.object),
  account: PropTypes.object
}

export default AccountTransaction;
