import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { lightBlue900 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const socketUrl = "https://young-citadel-86275.herokuapp.com"

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {text: [], socket: null, message: [], open: true, textFieldValue: ''};
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
	}

	componentWillMount() {
		let socket = io(socketUrl);
		socket.on('connect', () => {
			console.log("Connected..............................");
		});
		socket.on('connect_failed', () => { console.log('Connection Failed'); });
		this.setState({ socket })
	}

	componentDidMount() {
		let _this = this;
		console.log('component did mount')

		_this.state.socket.on('acknowledgement', function (output) {
			console.log(output);
			let message = _this.state.message;
			message.push(output);
			_this.setState({ message })
		})

		_this.state.socket.on('username', function (newuser) {
			console.log(newuser + "from front")
			// _this.setState({text:newuser})
			let messagenew = _this.state.text;
			_this.setState({ messagenew })

		})
	}

	handleTextFieldChange(event) {
		this.setState({textFieldValue: event.target.value});
	};

	onChange() {
		let newuser = this.refs.datatext.value;
		// let newuser = e.target.value;  
		console.log(newuser)
		this.setState({ text: newuser });
		if (!newuser) {
			alert('Write Nickname');
		}
		else {
			this.setState({ open: false })
			this.state.socket.emit('username', newuser)
		}
		// this.setState({text : newuser});  
	}


	handleClick() {
		let reg = /^\s*[a-zA-Z0-9][a-zA-Z0-9._\s]*$/;
		let input = this.state.textFieldValue;
		console.log('values', input, reg.test(input))
		if (!!input && reg.test(input)) {
			this.setState({textFieldValue: ''});
			let message = {text: input, name: this.state.text};
			this.state.socket.emit('chat', message);
		} else if (!!input) {
			alert('please enter valid message')
		} else {
			alert('Write something')
		}
	}

	render() {
		var cardStyle = {
			textAlign: 'Center',
			width: '70vw',
			height: 'auto',
			marginLeft: '10vw',
			backgroundColor: 'lightcyan',
			transitionDuration: '0.3s',
			padding: 0
		}
		const style = { margin: 12 };
		return (
			<MuiThemeProvider>
				<Dialog
					
					style={{ maxHeight: '300px', 'paddingLeft': '0px' }}
					modal={true}
					open={this.state.open}>
					<input ref="datatext" type="text" />
					<RaisedButton label="NickName" onClick={this.onChange} style={style} />
				</Dialog>
				<Card style={cardStyle}>
					<CardHeader
						title=" Chat Application"
						titleColor={lightBlue900}
						titleStyle={{ 'fontSize': '20px', 'fontWeight': 'bold', 'paddingLeft': '84px' }}
						actAsExpander={true}
					/>
					<CardText>
						<div className="main">
							<div className='Box'>
								<ul>
									{
										this.state.message.map(
											(main, i) =>
												<li key={i} style={{ padding: '1px' }}>
													<div style={{ display: 'inline', paddingTop: '1px' }}  >
														<div className='container1'>
															
															<p>{main.text}</p>
															<span className='user'>{main.name} </span>
													
														</div>
													</div>
												</li>
										)
									}
								</ul>
							</div>
							<TextField
								hintText=" Type Message  Here"
								floatingLabelText=" Click Here For Message"
								multiLine={true}
								onChange={this.handleTextFieldChange}
								value={this.state.textFieldValue}
								rows={2}
							/>
							<RaisedButton label="SEND" onClick={this.handleClick} style={style} />

						</div>
					</CardText>
				</Card>
			</MuiThemeProvider>
		);
	}
}

export default Layout;