import React, {Component} from 'react';
import StockRow from './StockRow';
import MarketTrendArrow from './MarketTrendArrow';
export default class StockList extends Component {  

  render() {
    return (
      <>
        <div className="highlighter">
          <button className="button button1"><div className="dot"></div><span className="live-text">Live Stocks</span></button>
          <button className="button button2" onClick={this.props.resetData}>Clear history</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="value">Value <MarketTrendArrow current_trend={this.props.market_trend} /></th>              
              <th>History</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.stocks).map((stock_name, index) =>
            {
              let current_stock = this.props.stocks[stock_name];
              return (
                <StockRow
                  key={index} stock_name={stock_name}
                  stock_data={current_stock}
                  toggleStockSelection={this.props.toggleStockSelection}
                />);
            }
            )}
            { this.props.areStocksLoaded() ? null : <tr><td colSpan="4">No stocks loaded yet!</td></tr> }
          </tbody>                   
        </table>
      </>    
    );
  }
}
