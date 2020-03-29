import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserConsumer from '../context';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default class User extends Component {
	state = {
		isVisible: false
	};
	showDetail = (string, e) => {
		this.setState({ isVisible: !this.state.isVisible });
	};
	onDeleteUser = async (dispatch, e) => {
		const { id } = this.props;
		await Axios.delete(`http://localhost:3004/users/${id}`)
		dispatch({ type: 'DELETE_USER', payload: id });
	};

	render() {
		const { id, name, title, birthDay } = this.props;
		const { isVisible } = this.state;

		return (
			<UserConsumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<Card className="w-100 mb-3" style={isVisible ? { background: '#333', color: '#fff' } : null}>
							<CardHeader className="d-flex justify-content-between align-items-center">
								<CardTitle className="flex-grow-1">{name}</CardTitle>
								<ButtonGroup>
									<Button outline onClick={this.showDetail.bind(this, name)}>
										{isVisible ? (
											<FontAwesomeIcon icon={faChevronUp} />
										) : (
												<FontAwesomeIcon icon={faChevronDown} />
											)}
									</Button>
									<Link to={`UpdateUser/${id}`} className="btn btn-outline-warning">
										<FontAwesomeIcon icon={faEdit} />
									</Link>
									<Button outline color="danger" onClick={this.onDeleteUser.bind(this, dispatch)}>
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								</ButtonGroup>
							</CardHeader>
							{isVisible ? (
								<CardBody className="d-flex justify-content-between align-items-center">
									<span>{title}</span>
									<span>{birthDay !== undefined ? 2020 - birthDay : 'Boş'}</span>
								</CardBody>
							) : null}
						</Card>
					);
				}}
			</UserConsumer>
		);
	}
}
User.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	birthDay: PropTypes.number,
	id: PropTypes.string.isRequired
};
