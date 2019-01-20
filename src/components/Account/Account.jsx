import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Home from "@material-ui/icons/Home";
import Timeline from "@material-ui/icons/Timeline";
import SwapHoriz from "@material-ui/icons/SwapHoriz";

import Table from "components/Table/Table.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Typography from '@material-ui/core/Typography';
import AccountTransaction from "./AccountTransaction";
import {currencyPipe} from "../../commons/helpers";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      transactions: props.accountData.transactions
    }
  }
  
  render() {
    const {accountData} = this.props;
    return (
        <CustomTabs
            title="Account"
            headerColor="primary"
            selectedTab={this.state.selectedTab}
            changeTab={this.handleChangeTab}
            tabs={[
              {
                tabName: "Summary",
                tabIcon: Home,
                tabContent: (
                    <Typography variant="display1" component="h3" align="center">
                      {currencyPipe(this.calculateTotalAmount(this.state.transactions))}
                    </Typography>
                )
              },
              {
                tabName: "History",
                tabIcon: Timeline,
                tabContent: (
                    <Table tableHeaderColor="primary"
                           tableHead={["ID", "Name", "Time", "Amount"]}
                           tableData={this.getAccountData(this.state.transactions)}></Table>
                )
              },
              {
                tabName: "Transaction",
                tabIcon: SwapHoriz,
                tabContent: (
                    <AccountTransaction cancelTransaction={this.cancelTransaction} createTransaction={this.createTransaction}/>
                )
              }
            ]}
        />
    )
  }
  
  getAccountData(accountData) {
    const ret = accountData.map((data) => {
      return [data.id, data.name, data.date, data.amount];
    });
    return ret;
  }
  
  calculateTotalAmount(transactions) {
    return transactions.reduce((tPrev, tCur) => (parseFloat(tPrev) + parseFloat(tCur.amount)) ,0);
  }
  
  cancelTransaction = () => {
    this.handleChangeTab(0);
  };
  
  createTransaction = (transaction) => {
    transaction.date = new Date().toISOString();
    transaction.id = this.state.transactions.length > 0 ? this.state.transactions[this.state.transactions.length - 1].id + 1 : 1;
    const updatetedTransactions = this.state.transactions;
    updatetedTransactions.push(transaction);
    this.setState({
      transactions: updatetedTransactions
    });
    this.handleChangeTab(1);
  };
  
  handleChangeTab = (tabNo) => {
    this.setState({selectedTab: tabNo});
  }
}

Account.defaultProps = {
  accountData: {
    id: 1, name: 'Account one', transactions: [
      {id: 1, name: 'transaction 1', date: new Date().toISOString(), amount: 1100},
      {id: 2, name: 'transaction 2', date: new Date().toISOString(), amount: 123.50},
      {id: 3, name: 'transaction 3', date: new Date().toISOString(), amount: 2000}
    ]
  }
};
Account.propTypes = {
  accountData: PropTypes.object
};
export default Account;
