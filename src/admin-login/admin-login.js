import React from "react";
import { getFromDatabase, databasePost } from "../api/api";
import { Form, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }
    onSubmit = e => {
        e.preventDefault();
        databasePost("admin/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                if (typeof res === "undefined") {
                } else {
                    this.props.history.push("/admin-screen");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        const { errors } = this.state;
        return (
            <Container>
                <Form>
                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            onChange={e => {
                                this.setState({ username: e.target.value });
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.onSubmit}
                    >
                        Log in
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default AdminLogin;
