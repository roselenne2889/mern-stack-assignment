import React from "react";
import { getFromDatabase, databasePost } from "../api/api";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
class AdminScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewRows: [],
            currentViewHeaders: null,
            eventLogRows: [],
            allHistoryRows: [],
            roomRows: [],
            roomData: [],
            selectedRoom: {
                name: "",
                created_date: null,
                edit_date: null,
                status: ""
            },
            roomInput: "",
            statusInput: "active",
            showModal: false,
            isNewRoom: false
        };

        //
        this.getEventLog = this.getEventLog.bind(this);
        this.getAllHistory = this.getAllHistory.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
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
    getRooms() {
        getFromDatabase("room").then(res => {
            const rows = res.map((row, index) => {
                return (
                    <tr key={row._id}>
                        <td>{row.name}</td>
                        <td>{new Date(row.created_date).toDateString()}</td>
                        <td>{new Date(row.edit_date).toDateString()}</td>
                        <td>{row.status}</td>
                        <td>
                            <Button
                                onClick={() => {
                                    this.toggleModal(false, index);
                                }}
                            >
                                Edit
                            </Button>
                        </td>
                    </tr>
                );
            });
            const headers = (
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Created date</th>
                    <th scope="col">Edit date</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
            );
            this.setState({
                roomRows: rows,
                currentViewRows: rows,
                currentViewHeaders: headers,
                roomData: res
            });
        });
    }
    toggleModal(isNewRoom, roomIndex) {
        if (typeof roomIndex !== "undefined") {
            this.setState(
                {
                    selectedRoom: this.state.roomData[roomIndex],
                    roomInput: this.state.roomData[roomIndex].name,
                    statusInput: this.state.roomData[roomIndex].status,
                    isNewRoom: isNewRoom
                },
                () => {
                    this.setState({
                        showModal: !this.state.showModal
                    });
                }
            );
        } else {
            this.setState({
                showModal: !this.state.showModal,
                isNewRoom: isNewRoom
            });
        }
    }
    updateRoom() {
        const body = {
            status: this.state.statusInput,
            edit_date: new Date(),
            name: this.state.roomInput
        };
        if (this.state.isNewRoom) {
            body.created_date = new Date();
            databasePost("room/create-room", body).then(res => {
                this.setState({
                    showModal: false
                });
                this.getRooms();
            });
        } else {
            body.old_name = this.state.selectedRoom.name;
            databasePost("room/update-room", body).then(res => {
                this.setState({
                    showModal: false
                });
                this.getRooms();
            });
        }
    }
    render() {
        return (
            <Container>
                <Button variant="success" onClick={this.getEventLog}>
                    Event Log
                </Button>
                <Button variant="success" onClick={this.getAllHistory}>
                    Chat History
                </Button>
                <Button variant="success" onClick={this.getRooms}>
                    Rooms
                </Button>
                <Button
                    variant="success"
                    onClick={() => {
                        this.toggleModal(true);
                    }}
                >
                    Add New Room
                </Button>
                <Table>
                    <caption></caption>
                    <thead>{this.state.currentViewHeaders}</thead>
                    <tbody>{this.state.currentViewRows}</tbody>
                </Table>
                <Modal show={this.state.showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add/Edit Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formRoomName">
                                <Form.Label>Room name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.roomInput}
                                    onChange={e => {
                                        this.setState({
                                            roomInput: e.target.value
                                        });
                                    }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formRoomStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.statusInput}
                                    onChange={e => {
                                        this.setState({
                                            statusInput: e.target.value
                                        });
                                    }}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" onClick={this.updateRoom}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
}
export default AdminScreen;
