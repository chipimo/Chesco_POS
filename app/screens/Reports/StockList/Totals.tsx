import React = require("react");
import { connect } from "react-redux";
import { Header, Image, Table } from "semantic-ui-react";

const Currency = require("react-currency-formatter");

const Totals = (props) => {
  return (
    <div style={{ color: "#fff", marginRight: 12 }}>
      <Table
        basic="very"
        inverted={props.Theme.theme === "light" ? false : true}
        celled
        collapsing
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header.Content>Total Buying Prices</Header.Content>
            </Table.Cell>
            <Table.Cell>
              <Currency
                locale="en"
                quantity={props.TotalBuyingPrices}
                symbol="K"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header.Content>Expected Profit</Header.Content>
            </Table.Cell>
            <Table.Cell>
              <Currency
                locale="en"
                quantity={props.ExpectedProfit}
                symbol="K"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header.Content>Total Stock Value</Header.Content>
            </Table.Cell>
            <Table.Cell>
              <Currency
                locale="en"
                quantity={props.TotalStockValue}
                symbol="K"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Totals);
