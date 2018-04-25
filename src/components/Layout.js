import React, {Component } from 'react';
import io from 'socket.io-client/dist/socket.io';

import '../App.css';

const socketUrl = "https://192.168.4.115:3231"
class Layout extends Component {
constructor(props){
	super(props);
	this.state={
		socket:null,
		message:[]
	};
	this.handleClick= this.handleClick.bind(this);
}

componentWillMount(){
	this.initSocket();
}
initSocket = () =>{
	let socket = io(socketUrl);
	socket.on('connect',() =>{
		console.log("Connected..............................");
	});
	socket.on('connect_failed', ()=> {console.log('Connection Failed');});
	this.setState({socket})
}

componentDidMount(){
	let _this = this;
	console.log('component did mount')
	// let socket = io(socketUrl);
	// socket.on(('chat', msg =>{cons0ole.log(msg)});
	_this.state.socket.on('acknowledgement', function(output){
		console.log(output);
		let message = _this.state.message;
		message.push(output);
		_this.setState({message})
	})
}

// sendMessage(e){
// 	let socket = io(socketUrl)

// 	let msg = e.target.value;
// 	socket.emit('chat',msg);
// // this.setState({message:e.target.value})
// }
handleClick(){
	if(this.refs.myInput !== null){
		var input = this.refs.myInput.value;
		// let socket = io(socketUrl)
		// this.state.message.push(input)
		// this.setState({message:this.state.message});
		this.state.socket.emit('chat',input);
		// console.log(input);
	                               }
	}
	render() {

  		const {title} = this.props
    	return (
      	<div className="main">
        <h1>{title}</h1>
       	<div className='Box'>
		<ul>{
		     this.state.message.map((main, i)=><p key={i}>{main}</p>)
			}
		</ul>
		</div>     

		<input  className='Input_text' type="text"  ref='myInput' />

		<input type="button" className='Input_button' value="SEND" onClick={this.handleClick}
        />
      </div>
     
    );
  }
}

export default Layout;