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
      transactions: props.accountData.transactions,
      order: props.order,
      orderBy: props.orderBy
    }
  }
  
  render() {
    return (
        <CustomTabs
            title={this.props.accountData.name}
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
                           tableData={this.getAccountData(this.state.transactions)}
                           changeSorting={this.sortHistory}
                           order={this.state.order}
                           orderBy={this.state.orderBy}
                    ></Table>
                )
              },
              {
                tabName: "Transaction",
                tabIcon: SwapHoriz,
                tabContent: (
                    <AccountTransaction
                        accounts={this.props.accounts}
                        account={this.props.accountData}
                        cancelTransaction={this.cancelTransaction}
                        createTransaction={this.createTransaction}
                    />
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
  
  createTransaction = (transaction, idFrom, idTo) => {
    this.handleChangeTab(1);
    this.props.createTransaction(transaction, idFrom, idTo);
  };
  
  handleChangeTab = (tabNo) => {
    this.setState({selectedTab: tabNo});
  }
  
  sortHistory = (key) => {
    let order = this.state.order;
    if (key === this.state.orderBy) {
      order = order === 'asc' ? 'desc' : 'asc';
    }
    this.state.transactions.sort((a, b) => {
      switch (typeof a[key]) {
        case 'string':
          return a[key].localeCompare(b[key]) * (order === "asc" ? 1 : -1);
        default:
          return (a[key] - b[key]) * (order === "asc" ? 1 : -1);
      }
      
    });
    this.setState({transactions: this.state.transactions, order, orderBy: key});
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
  accountData: PropTypes.object,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  accounts: PropTypes.arrayOf(PropTypes.object),
  createTransaction: PropTypes.func
};
export default Account;
