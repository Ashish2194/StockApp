import React, {Component} from 'react';
import "../css/stocks.css";
import StockList from '../components/StockList';
import StockGraph from '../components/StockGraph';
const stocksUrl = 'ws://stocks.mnet.website/';
export class StockContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: {},
      market_trend: undefined, // can be either 'up' or 'down'
      connectionError: false
    };
  }
  componentDidMount() {
    this.connection = new WebSocket(stocksUrl);
    this.connection.onmessage = this.saveNewStockValues;
    this.connection.onclose = () => { this.setState({connectionError: true}); };
  }
  saveNewStockValues = event => {
    this.props.hideSpinner();
    let result = JSON.parse(event.data);
    let [up_val, down_val] = [0, 0];
    let curr_time = Date.now();
    let new_stocks = this.state.stocks;
    result.map((stockData) => {
      if (this.state.stocks[stockData[0]]) {
        new_stocks[stockData[0]].current_value > Number(stockData[1]) ? up_val++:down_val++;
        new_stocks[stockData[0]].current_value = Number(stockData[1]);
        new_stocks[stockData[0]].history.push({time: curr_time, value: Number(stockData[1])});
      } else {
        new_stocks[stockData[0]] = {current_value: Number(stockData[1]), history: [{time: Date.now(), value: Number(stockData[1])}], is_selected: false};
      }
    });
    this.setState({stocks: new_stocks, market_trend: this.newMarketTrend(up_val, down_val)});
  }

  newMarketTrend = (up_val, down_val) => {
    if (up_val === down_val) return undefined;
    return up_val > down_val ? 'up' : 'down';
  }

  toggleStockSelection = (stock_name) => {
    let new_stocks = this.state.stocks;
    new_stocks[stock_name].is_selected = !new_stocks[stock_name].is_selected;
    this.setState({ stocks: new_stocks });
  }

  resetData = () => {
    let new_stocks = this.state.stocks;
    Object.keys(this.state.stocks).map((stock_name, index) =>
    {
      new_stocks[stock_name].history = [new_stocks[stock_name].history.pop()];
    });
    this.setState({ stocks: new_stocks });
  }

  areStocksLoaded = () => {
    return Object.keys(this.state.stocks).length > 0;
  }
  render() {
    return (
      <>
        { !this.props.showSpinner ? <div className="container">
          <div className="column-30">
            <StockList
              stocks={this.state.stocks}
              toggleStockSelection={this.toggleStockSelection}
              resetData={this.resetData}
              market_trend={this.state.market_trend}
              areStocksLoaded={this.areStocksLoaded}
            />
          </div>
          <div className="column-70"><StockGraph stocks={this.state.stocks}/></div>
        </div>: <div id="loader"></div> }
      </>);
  }
}
