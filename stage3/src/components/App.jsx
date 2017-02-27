import React from 'react';
import { Link, IndexLink } from 'react-router';

class App extends React.PureComponent {

  render() {
    return (
      <div>
        { this.props.children }
        <ul className='nav-link'>
          <li><IndexLink to='/'>first</IndexLink></li>
          <li><Link to='/lists'>second</Link></li>
        </ul>
      </div>
    )
  }

}

export default App;