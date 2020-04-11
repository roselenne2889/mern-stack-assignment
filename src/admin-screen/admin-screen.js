import React from "react";
import { getFromDatabase } from "../api/api";
import { Container, Table, Button } from "react-bootstrap";
class AdminScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewRows: [],
            currentViewHeaders: null,
            eventLogRows: [],
            allHistoryRows: []
        };
        //
        this.getEventLog = this.getEventLog.bind(this);
        this.getAllHistory = this.getAllHistory.bind(this);
    }

    getAllHistory() {
        getFromDatabase("history").then(res => {
            console.log(res);
            const rows = res.map(row => {
                return (
                    <tr key={row._id}>
                        <td>{new Date(row.date).toDateString()}</td>
                        <td>{`${new Date(row.date).getHours()}:${new Date(
                            row.date
                        ).getMinutes()}`}</td>
                        <td>{row.sender}</td>
                        <td>{row.message}</td>
                        <td>{row.chat_room}</td>
                    </tr>
                );
            });
            const headers = (
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Sender</th>
                    <th scope="col">Message</th>
                    <th scope="col">Room</th>
                </tr>
            );
            this.setState({
                allHistoryRows: rows,
                currentViewRows: rows,
                currentViewHeaders: headers
            });
        });
    }
    getEventLog() {
        getFromDatabase("eventlog").then(res => {
            const rows = res.map(row => {
                return (
                    <tr key={row._id}>
                        <td>{row.type}</td>
                        <td>{row.user}</td>
                        <td>{row.date}</td>
                    </tr>
                );
            });
            const headers = (
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">User</th>
                    <th scope="col">Date</th>
                </tr>
            );
            this.setState({
                eventLogRows: rows,
                currentViewRows: rows,
                currentViewHeaders: headers
            });
        });
    }
    render() {
        return (
            <Container>
                <Button variant="primary" onClick={this.getEventLog}>
                    Event Log
                </Button>
                <Button variant="primary" onClick={this.getAllHistory}>
                    Chat History
                </Button>
                <Table>
                    <caption></caption>
                    <thead>{this.state.currentViewHeaders}</thead>
                    <tbody>{this.state.currentViewRows}</tbody>
                </Table>
            </Container>
        );
    }
}
export default AdminScreen;
