import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigate from './layout/Navigate';
import Users from './Components/Users';
import AddUser from './Forms/AddUser';
import Test from './Components/Test';
import NotFound from './pages/NotFound';

import { Container, Row, Col } from 'reactstrap';
import UpdateUser from './Forms/UpdateUser';

// function Home() {
// 	return (
// 		<div>
// 			<Users></Users>
// 		</div>
// 	)
// }
// function About() {
// 	return (
// 		<div>
// 			<AddUser></AddUser>
// 		</div>
// 	)
// }

class App extends Component {
	render() {
		return (
			<Router>
				<Container>
					<Test title="test"></Test>
					<Row xs={1}>
						<Col>
							<Navigate title="User App - React" />
							<hr />
						</Col>
						<Switch>
							<Route exact path="/" component={Users} />
							<Route exact path="/addUser" component={AddUser} />
							<Route exact path="/UpdateUser/:id" component={UpdateUser} />
							<Route component={NotFound} />
						</Switch>
					</Row>
				</Container>
			</Router>
		);
	}
}

export default App;
