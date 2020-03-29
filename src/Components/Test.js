import React, { Component } from 'react';

export default class Test extends Component {

	componentDidMount() {
		console.log('componentDidMount');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
    }
    shouldComponentUpdate(){
        console.log('shoul component update')
    }
	render() {
		return <div>{console.log('render')}</div>;
	}
}
