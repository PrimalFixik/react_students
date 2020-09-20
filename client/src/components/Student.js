import {Component} from "react";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import {Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import React from "react";

class Student extends Component {
    constructor(props){
        super(props);

        this.state = {
            openEdit: false,
            openInfo: false,
            openDelete: false,
            validateMessage: undefined,
            id: this.props.id,
            studentName: this.props.studentName,
            rating: this.props.rating,
            isDebtor: this.props.isDebtor,
            age: this.props.age,
            group: this.props.group,
            students: this.props.students
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleStudentNameChange = this.handleStudentNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
    }

    handleIdChange(e) {
        this.setState({ id: String(e.target.value) });
    }
    handleStudentNameChange(e) {
        this.setState({ studentName: String(e.target.value)});
    }
    handleRatingChange(e) {
        this.setState({ rating: Number(e.target.value) });
    }
    handleTypeChange(e) {
        this.setState({ isDebtor: e.target.value });
    }
    handleAgeChange(e) {
        this.setState({ age: Number(e.target.value) });
    }
    handleGroupChange(e) {
        this.setState({ group: String(e.target.value) });
    }
    handleOpenEdit = () => {
        this.setState({openEdit: true});
    };
    handleCloseEdit = () => {
        this.setState({openEdit: false});
    };
    handleOpenInfo = () => {
        this.setState({openInfo: true});
    };
    handleCloseInfo = () => {
        this.setState({openInfo: false});
    };
    handleOpenDelete = () => {
        this.setState({openDelete: true});
    };
    handleCloseDelete = () => {
        this.setState({openDelete: false});
    };

    render() {
        return <tr className="text-left">
            <td onClick={this.handleOpenInfo}>
                {this.props.id}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.studentName}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.rating}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.isDebtor}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.age}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.group}
            </td>
            <td>
                <Dialog modal={undefined} open={this.state.openEdit}>
                    <DialogTitle className="Title"><ControlLabel>Edit</ControlLabel></DialogTitle>
                    {
                        this.state.validateMessage !== "undefined" &&
                        <ControlLabel className="Error">{this.state.validateMessage}</ControlLabel>
                    }
                    <DialogContent className="Padding-Form">
                        <FormGroup>
                            <Row>
                                <Col xs={5}><ControlLabel>Surname</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        value={this.state.id}
                                        onChange={this.handleIdChange}
                                        placeholder="Enter surname"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={5}><ControlLabel>Name</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        value={this.state.studentName}
                                        onChange={this.handleStudentNameChange}
                                        placeholder="Enter name"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={5}><ControlLabel>Rating</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        value={this.state.rating}
                                        onChange={this.handleRatingChange}
                                        placeholder="Enter rating"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={5}><ControlLabel>Is Debtor</ControlLabel></Col>
                                <Col xs={7}>
                                    {this.state.isDebtor === "Yes"
                                        ? <FormControl componentClass="select" placeholder="select" onChange={this.handleTypeChange}>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </FormControl>
                                        : <FormControl componentClass="select" placeholder="select" onChange={this.handleTypeChange}>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </FormControl>
                                    }
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={5}><ControlLabel>Age</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        value={this.state.age}
                                        onChange={this.handleAgeChange}
                                        placeholder="Enter age"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={5}><ControlLabel>Group</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        value={this.state.group}
                                        onChange={this.handleGroupChange}
                                        placeholder="Enter group"/>
                                </Col>
                            </Row>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={this.saveClickHandler}>Save</button>
                        <button className="btn btn-primary" onClick={this.handleCloseEdit}>Cancel</button>
                    </DialogActions>
                </Dialog>

                <Dialog modal={undefined} open={this.state.openInfo}>
                    <DialogTitle className="Title"><ControlLabel>Details</ControlLabel></DialogTitle>
                    <DialogContent className="Padding-Form Padding-Details">
                        <FormGroup>
                            <Row>
                                <Col xs={6}><ControlLabel>Surname:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.id}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Name:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.studentName}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Rating:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.rating}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Is Debtor:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.isDebtor}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Age:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.age}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Group:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.group}
                                </Col>
                            </Row>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={this.handleCloseInfo}>Back</button>
                    </DialogActions>
                </Dialog>

                <Dialog modal={undefined} className="padding-class" open={this.state.openDelete}>
                    <DialogTitle className="Title"><ControlLabel>Delete</ControlLabel></DialogTitle>
                    <DialogContent>
                        <DialogContentText className="Delete-Text">
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary del" onClick={this.removeClickHandler}>Yes</button>
                        <button className="btn btn-primary del" onClick={this.handleCloseDelete}>No</button>
                    </DialogActions>
                </Dialog>

                <span onClick={this.handleOpenEdit} className="glyphicon glyphicon-pencil"/>
                <span onClick={this.handleOpenDelete} className="glyphicon glyphicon-remove Action-space"/>
            </td>
        </tr>;
    }

    removeClickHandler = () => {
        if (this.props.removeClickHandler) {
            this.props.removeClickHandler(this.state.id);
        }
        this.setState({openDelete: false});
    };

    saveClickHandler = () => {
        if(this.state.id === this.props.id){
            if(this.props.saveClickHandler){
                this.props.saveClickHandler(this.props.id, this.state.studentName, this.state.rating, this.state.isDebtor, this.state.age, this.state.group, this.props.id);
            }
            this.setState({openEdit: false});
        }
        else{
            if(this.props.students.filter((item) => (item.id === this.state.id && item.group === this.state.group)).length === 0){
                if(this.props.saveClickHandler){
                    this.props.saveClickHandler(this.state.id, this.state.studentName, this.state.rating, this.state.isDebtor, this.state.age, this.state.group, this.props.id);
                }
                this.setState({openEdit: false});
            }
            else{
                this.setState({validateMessage: "Student must be unique"});
            }
        }
    };
}

export default Student;