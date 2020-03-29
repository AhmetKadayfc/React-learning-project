import React, { Component } from 'react';
import UserConsumer from '../context';
import Axios from 'axios';

import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';



export default class UpdateUser extends Component {
	state = {
		name: '',
		title: '',
		birthDay: '',
		error: false
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
	updateUser = async (dispatch, e) => {
		e.preventDefault();
		const { name, title, birthDay } = this.state
		const { id } = this.props.match.params;
		const updatedUser = {
			name, title, birthDay: parseInt(birthDay)
		}
		if (this.validateForm()) {
			this.setState({
				error: true
			})
			return;
		}
		const response = await Axios.put(`http://localhost:3004/users/${id}`, updatedUser)
		dispatch({
			type: "UPDATE_USER",
			payload: response.data
		})
		this.props.history.push("/")
	}

	componentDidMount = async (e) => {
		const { id } = this.props.match.params;
		const response = await Axios.get(`http://localhost:3004/users/${id}`);
		const { name, title, birthDay } = response.data
		this.setState({
			name, title, birthDay: parseInt(birthDay)
		})
	}

	render() {
		const { name, title, birthDay, error } = this.state;
		return (
			<UserConsumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<Card>
							<CardHeader className="text-center d-flex justify-content-between align-items-center">
								<h4 className="text-bold">Update User Form</h4>
							</CardHeader>
							<CardBody>
								{error ?
									<Alert color="danger" className="d-flex justify-content-between align-items-center">
										Giriş bilgilerini kontrol ediniz!
										<FontAwesomeIcon icon={faTimesCircle} onClick={this.natification} style={{ "cursor": "pointer" }} />
									</Alert> : null}
								<Form onSubmit={this.updateUser.bind(this, dispatch)}>
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
									<Button color="warning" className="w-100">
										Update User
										</Button>
								</Form>
							</CardBody>
						</Card>
					);
				}}
			</UserConsumer>
		);
	}
}
