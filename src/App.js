import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './App.css';

class App extends Component {
  state = {
    mockDb: {},
    currentUrl: '',
    uniqueId: 10000,
    shortUrls: []
  }
  alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  base = this.alphabet.length; // base is the length of the alphabet (58 in this case)

  encode(num) {

    let encoded = '';
    while (num) {
      let remainder = num % this.base;
      num = Math.floor(num / this.base);
      encoded = this.alphabet[remainder].toString() + encoded;
    }
    return encoded;
  }

  decode(str) {
    let decoded = 0;
    while (str) {
      const index = this.alphabet.indexOf(str[0]);
      const power = str.length - 1;
      decoded += index * (Math.pow(this.base, power));
      str = str.substring(1);
    }
    return decoded;
  }

  handleChange = (e) => {
    this.setState({
      currentUrl: e.target.value,
    });
  };

  handleShorten() {
    const { mockDb, currentUrl, uniqueId, shortUrls } = this.state;
    this.setState({
      mockDb: {
        ...mockDb,
        [uniqueId]: currentUrl
      },
      uniqueId: uniqueId + 1,
      shortUrls: [...shortUrls, this.encode(uniqueId)]
    });
  }

  handleRedirect(shortUrl) {
    const longUrl = this.state.mockDb[this.decode(shortUrl)];
    window.open(`http://${longUrl}`, '_blank');
  }

  render() {
    const { currentUrl, shortUrls } = this.state;

    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Saucy URl Shortner</h1>
          <TextField
            fullWidth
            hintText="Enter URL e.g. http://www.example.com"
            value={currentUrl}
            onChange={this.handleChange.bind(this)}
          />
          <FlatButton
            label="Shorten"
            primary
            onClick={this.handleShorten.bind(this)}
          />
          {
            shortUrls.map(url => (
              <p>
                {this.state.mockDb[this.decode(url)]+ ': '}
                <a className='link'
                  key={url}
                  onClick={() => this.handleRedirect.bind(this)(url)}
                >
                  {'saucy.com/' + url}
                </a>
              </p>)
            )
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
