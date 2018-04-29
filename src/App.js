import React, {Component} from 'react';
import Layout from './components/Layout';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
      <Layout  title="Chat Application"/>
      
      </MuiThemeProvider>
     
    );
  }
}
export default App;
