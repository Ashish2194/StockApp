import React, { Component } from 'react';
import {StockContainer} from './components/StockContainer';
class App extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      showSpinner: true
    };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('some error has occured');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  hideSpinner = () => {
    this.setState({showSpinner: false});
  }
  render() {
    if (this.state.hasError) {
      return <>
      You need to click on &nbsp;<code>Load Unsafe Scripts</code>&nbsp; to proceed.
        <br /> Look for the &nbsp;<code>shield icon</code>&nbsp; on your browser's addreess bar.  &#8679;      
      </>;
    }
    return (
      <>
        <StockContainer hideSpinner={this.hideSpinner} showSpinner={this.state.showSpinner}/>
      </>
    );
  }
}


export default App;
