import React from 'react';
import { Link, IndexLink } from 'react-router';

class App extends React.PureComponent {

  render() {
    return (
      <div>
        { this.props.children }
        <ul className='nav-link'>
          <li><IndexLink to='/' className="icon icon-item" activeClassName='icon__active'/></li>
          <li><Link to='/lists' className="icon icon-lists" activeClassName='icon__active' /></li>
        </ul>
      </div>
    )
  }

}

export default App;