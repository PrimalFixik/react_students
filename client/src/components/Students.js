import React, {Component} from 'react';
import {Dialog} from "@material-ui/core";
import {Col, ControlLabel, FormControl, Row} from "react-bootstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Student from './Student'
import {addStudent, deleteStudent, getStudents, updateStudent} from "../actions/student";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            openAdd: false,
            validateMessage: undefined,
            isDebtor: "No",
            parent: this.props.parentID
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleStudentNameChange = this.handleStudentNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const parent = this.state.parent;
        if(parent !== undefined){
            this.props.getStudents({parentID: parent});
        }
        else{
            this.props.getStudents();
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.students !== this.props.students){
            this.setState({parent: this.props.parentID});
            this.setState({students: this.props.students});
        }
    }

    //TODO THIS
    /*static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.students !== prevState.students){
            return { students: nextProps.students};
        }
        else return null;
    }*/

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
        if(this.state.parent !== undefined && this.state.parent === String(e.target.value)){
            this.setState({ group: String(e.target.value) });
        }
        else{
            this.setState({ group: String(e.target.value) });
        }

    }
    handleOpenAdd = () => {
        this.setState({openAdd: true});
    };
    handleCloseAdd = () => {
        this.setState({openAdd: false});
    };

    render() {
        const items = this.state.students.map(
            (item) => {
                return (<Student key={item._id}
                                 id={item.id}
                                 studentName={item.studentName}
                                 rating={item.rating}
                                 isDebtor={item.isDebtor}
                                 age={item.age}
                                 group={item.group}
                                 removeClickHandler={this.removeClickHandler}
                                 saveClickHandler={this.saveClickHandler}
                                 students={this.props.students}
                />);
            });
        return (<div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Surname</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Is Debtor</th>
                        <th>Age</th>
                        <th>Group</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>

                <Dialog modal={undefined} open={this.state.openAdd}>
                    <DialogTitle className="Title"><ControlLabel>Add</ControlLabel></DialogTitle>
                    {
                        this.state.validateMessage !== "undefined" &&
                        <ControlLabel className="Error">{this.state.validateMessage}</ControlLabel>
                    }
                    <DialogContent className="Padding-Form">
                        <form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col xs={3}><ControlLabel>Surname</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl
                                        type="text"
                                        name="ID"
                                        value={this.props.id}
                                        onChange={this.handleIdChange}
                                        placeholder="Enter surname"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={3}><ControlLabel>Name</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl
                                        type="text"
                                        name="studentName"
                                        value={this.props.studentName}
                                        onChange={this.handleStudentNameChange}
                                        placeholder="Enter name"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={3}><ControlLabel>Rating</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl
                                        type="text"
                                        name="rating"
                                        value={this.props.rating}
                                        onChange={this.handleRatingChange}
                                        placeholder="Enter rating"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={3}><ControlLabel>Is Debtor</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl componentClass="select" placeholder="select" onChange={this.handleTypeChange} name="type">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={3}><ControlLabel>Age</ControlLabel></Col>
                                <Col xs={9}>
                                    <FormControl
                                        type="text"
                                        name="age"
                                        value={this.props.age}
                                        onChange={this.handleAgeChange}
                                        placeholder="Enter age"/>
                                </Col>
                            </Row>
                            <Row className="Margin-Element">
                                <Col xs={3}><ControlLabel>Group</ControlLabel></Col>
                                <Col xs={9}>
                                    {
                                        this.state.parent !== "undefined"
                                            ? <FormControl
                                                type="text"
                                                name="group"
                                                defaultValue={this.state.parent}
                                                onChange={this.handleGroupChange}
                                                placeholder="Enter group"/>

                                            : <FormControl
                                                type="text"
                                                name="group"
                                                value={this.props.group}
                                                onChange={this.handleGroupChange}
                                                placeholder="Enter group"/>
                                    }
                                </Col>
                            </Row>
                            <button className="btn btn-primary Button-smb" type="submit">Save</button>
                        </form>
                        <button className="btn btn-primary Button" onClick={this.handleCloseAdd}>Cancel</button>
                    </DialogContent>
                </Dialog>

                <button className="btn add-student" onClick={this.handleOpenAdd}>
                    +
                </button>
            </div>
        );
    }

    removeClickHandler = (id) => {
        const parent = this.state.parent;
        if(parent !== undefined){
            this.props.deleteStudent({ id, parentID: parent });
        }
        else{
            this.props.deleteStudent({ id });
        }
    };
    saveClickHandler = (id, studentName, rating, isDebtor, age, group, oldID) => {
        const parent = this.state.parent;
        if(parent !== undefined){
            this.props.updateStudent({ id, studentName, rating, isDebtor, age, group, oldID, parentID: parent });
        }
        else{
            this.props.updateStudent({ id, studentName, rating, isDebtor, age, group, oldID });
        }
    };
    handleSubmit(e) {
        e.preventDefault();
        let { id, studentName, rating, isDebtor, age, group } = this.state;
        const parent = this.state.parent;
        if(parent !== undefined){
           group = parent;
        }
        if(this.props.students.filter((item) => (item.id === id && item.group === group)).length === 0){
            if(id !== undefined && rating !== undefined && age !== undefined){
                if(parent !== undefined){
                    this.props.addStudent({ id, studentName, rating, isDebtor, age, group: parent, parentID: parent });
                    this.setState({openAdd: false});
                }
                else{
                    this.props.addStudent({ id, studentName, rating, isDebtor, age, group });
                    this.setState({openAdd: false});
                }
            }
            else{
                this.setState({validateMessage: "You must text all fields"});
            }
        }
        else{
            this.setState({validateMessage: "Student must be unique"});
        }
    }

}

Students.propTypes = {
    students: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return {
       students: state.students
    };
}

export default connect(mapStateToProps, { getStudents, addStudent, updateStudent, deleteStudent })(Students);