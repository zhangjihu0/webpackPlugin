import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './index.less';
import img from '../img/app.png';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    retrun (
      <div>
        <img src={img} />
      </div>
    )
  }
}
const appRoot = document.getElementById('app');
ReactDOM.render(<App/>,appRoot);

