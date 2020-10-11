import React, {Component} from 'react';
import "./App.css";
import {Provider} from 'react-redux';
import {
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import store from './Store';
import Layout from './Components/Layout';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: red,
    background: {
      paper: '#282C34',
      // paper: '#1B2430',
      default: '#1c2025'
    }
  }
});

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Layout />
            {/* <SiteBar />
            <Nav />
            <Main>
              <CategoryForm />
            </Main> */}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
