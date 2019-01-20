import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import {bugs, website, server} from "variables/general.jsx";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Account from "../../components/Account/Account.jsx";
import Button from "../../components/CustomButtons/Button";

import Add from "@material-ui/icons/Add";

let idIterator = 2;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      accounts: props.accounts
    };
  }
  handleChange = (event, value) => {
    this.setState({value});
  };
  handleChangeIndex = index => {
    this.setState({value: index});
  };
  
  render() {
    const {classes} = this.props;
    const {accounts} = this.state;
    return (
        <div>
          <GridContainer>
            {this.renderAccounts(accounts)}
            <GridItem xs={6}>
              <Button justIcon round color="primary" onClick={() => this.addAccount()}><Add/></Button>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
  
  renderAccounts(accounts) {
    console.log(accounts);
    return accounts.map((account) => (
      <GridItem xs={12} sm={12} md={6} key={account.id}>
        <Account accountData={account} accounts={accounts} createTransaction={this.createTransaction}/>
      </GridItem>
    ));
  }
  createTransaction = (transaction, idFrom, idTo) => {
    console.log('new transaction', transaction);
    const date = new Date().toISOString();
    const aFrom = this.state.accounts.find((account) => account.id === idFrom);
    transaction.date = date;
    transaction.id = aFrom.transactions.length > 0 ? aFrom.transactions[aFrom.transactions.length - 1].id + 1 : 1;
    if (idFrom === idTo) {
      const updatetedTransactions = aFrom.transactions;
      updatetedTransactions.push(transaction);
    } else {
      const aTo = this.state.accounts.find((account) => account.id === idTo);
      const transactionTo = {};
      Object.assign(transactionTo, transaction);
      transactionTo.id = aTo.transactions.length > 0 ? aTo.transactions[aTo.transactions.length - 1].id + 1 : 1;
      transaction.amount = -transaction.amount;
      aFrom.transactions.push(transaction);
      aTo.transactions.push(transactionTo);
    }
    this.setState({
      accounts: this.state.accounts
    });
  };
  
  addAccount() {
    const accounts = this.state.accounts;
    accounts.push({id: ++idIterator, name: 'Account ' + idIterator, transactions: []});
    this.setState({accounts});
  }
}

Dashboard.defaultProps = {
  accounts: [
    {
      id: 1, name: 'Account 1', transactions: [
        {id: 1, name: 'transaction 1', date: new Date().toISOString(), amount: 1100},
        {id: 2, name: 'transaction 2', date: new Date().toISOString(), amount: 123.50},
        {id: 3, name: 'transaction 3', date: new Date().toISOString(), amount: 2000}
      ]
    },
    {
      id: 2, name: 'Account 2', transactions: [
        {id: 1, name: 'transaction 1', date: new Date().toISOString(), amount: 500},
        {id: 2, name: 'transaction 2', date: new Date().toISOString(), amount: 123.50},
        {id: 3, name: 'transaction 3', date: new Date().toISOString(), amount: 2000},
        {id: 4, name: 'transaction 4', date: new Date().toISOString(), amount: -360}
      ]
    },
  ]
};
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object)
};
export default withStyles(dashboardStyle)(Dashboard);
