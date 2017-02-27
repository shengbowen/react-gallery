import React from 'react';

class App extends React.PureComponent {

  render() {
    return (
      <div>{ this.props.children }</div>
    )
  }

}

export default App;