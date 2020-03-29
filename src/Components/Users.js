import React, { Component } from 'react';
import UserConsumer from '../context';
import User from './User';

import { Card, CardHeader, CardBody } from 'reactstrap';

export default class Users extends Component {
	render() {
		return (
			<UserConsumer>
				{(value) => {
					const { users } = value;
					return (
						<Card>
							<CardHeader className="text-center">
								<h4 className="text-bold">User List</h4>
							</CardHeader>
							<CardBody>
								{users.map((user) => {
									return (
										<User
											key={user.id}
											id={user.id}
											name={user.name}
											title={user.title}
											birthDay={user.birthDay}
										/>
									);
								})}
							</CardBody>
						</Card>
					);
				}}
			</UserConsumer>
		);
	}
}
