import React, { Component } from "react";
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from "moment";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        console.log(this.state.dueDate);
        const { text, dueDate } = this.state;
        this.props.addReminder(text, dueDate);
    }

    deleteReminder(id) {
        console.log('deleting in application', id);
        this.props.deleteReminder(id);
    }

    clearReminders() {
        console.log('deleting all application reminders');
        this.props.clearReminders();
    }
    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item mx-2">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div>
                                        <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => this.deleteReminder(reminder.id)}
                                    className="list-item delete-button btn btn-danger">
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        console.log('this.props',this.props);
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro App
                </div>
                <div className="form reminder-form">
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="I have to..."
                            onChange={event => this.setState({text:event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input 
                            type="datetime-local" 
                            className="form-control" 
                            placeholder="I have to..."
                            onChange={event => this.setState({dueDate:event.target.value})}/>
                    </div>
                    <button 
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addReminder()}>Add Reminder</button>
                </div>
                { this.renderReminders() }
                <div 
                    className="btn btn-danger"
                    onClick={() => this.props.clearReminders()}
                    >
                    Clear Reminders
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    };
}

export default connect(mapStateToProps,{ addReminder, deleteReminder, clearReminders} )(App);