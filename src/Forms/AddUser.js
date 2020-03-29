import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';
import Axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

// const uniqid = require('uniqid');
const Animate = posed.div({
	visible: {
		opacity: 1,
		applyAtStart: {
			display: 'block'
		}
	},
	hidden: {
		opacity: 0,
		applyAtStart: {
			display: 'none'
		}
	}
});

export default class AddUser extends Component {
	state = {
		isVisible: true,
		name: '',
		title: '',
		birthDay: '',
		error: false
	};
	formVisibilty = (e) => {
		this.setState({ isVisible: !this.state.isVisible });
	};
	chanceValue = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	validateForm = (e) => {
		const { name, title, birthDay } = this.state
		if (name === "" || title === "" || birthDay === "") {
			return true;
		}
		return false
	}
	natification = (e) => {
		this.setState({ error: !this.state.error });
	}
	addUser = async (dispatch, e) => {
		e.preventDefault();
		const { name, title, birthDay } = this.state,
			newUser = {
				name,
				title,
				birthDay: parseInt(birthDay)
			};
		if (this.validateForm()) {
			this.setState({
				error: true
			})
			return;
		}
		const response = await Axios.post("http://localhost:3004/users", newUser)
		dispatch({ type: 'ADD_USER', payload: response.data });
		this.props.history.push("/")
	};

	render() {
		const { isVisible, name, title, birthDay, error } = this.state;

		return (
			<UserConsumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<Card>
							<CardHeader className="text-center d-flex justify-content-between align-items-center">
								<h4 className="text-bold">Add User Form</h4>
								<Button outline onClick={this.formVisibilty}>
									{isVisible ? (
										<FontAwesomeIcon icon={faEyeSlash} />
									) : (
											<FontAwesomeIcon icon={faEye} />
										)}
								</Button>
							</CardHeader>
							<Animate pose={isVisible ? 'visible' : 'hidden'}>
								<CardBody>
									{error ?
										<Alert color="danger" className="d-flex justify-content-between align-items-center">
											Giriş bilgilerini kontrol ediniz!
										<FontAwesomeIcon icon={faTimesCircle} onClick={this.natification} style={{ "cursor": "pointer" }} />
										</Alert> : null}
									<Form onSubmit={this.addUser.bind(this, dispatch)}>
										<FormGroup>
											<Label for="userName">Adınız</Label>
											<Input
												type="text"
												name="name"
												id="userName"
												placeholder="Adınız"
												value={name}
												onChange={this.chanceValue}
											/>
										</FormGroup>
										<FormGroup>
											<Label for="title">title</Label>
											<Input
												type="text"
												name="title"
												id="title"
												placeholder="Title"
												value={title}
												onChange={this.chanceValue}
											/>
										</FormGroup>
										<FormGroup>
											<Label for="birthDay">Doğum Tarihi</Label>
											<Input
												type="number"
												name="birthDay"
												id="birthDay"
												placeholder="Doğum Tarihiniz"
												value={birthDay}
												onChange={this.chanceValue}
											/>
										</FormGroup>
										<Button color="success" className="w-100">
											Create User
										</Button>
									</Form>
								</CardBody>
							</Animate>
						</Card>
					);
				}}
			</UserConsumer>
		);
	}
}
