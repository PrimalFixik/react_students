import {Component} from "react";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import {Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import React from "react";
import Students from "./Students";

class Group extends Component {
    constructor(props){
        super(props);

        this.state = {
            openEdit: false,
            openInfo: false,
            openDelete: false,
            validateMessage: undefined,

            id: this.props.id,
            amountRating: this.props.amountRating,
            countDebtors: this.props.countDebtors,
            countPractice: this.props.countPractice,
            count: this.props.count,
            groups: this.props.groups
        };
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    handleIdChange(e) {
        this.setState({ id: String(e.target.value) });
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
                {this.props.amountRating}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.count}
            </td>
            <td onClick={this.handleOpenInfo}>
                {this.props.countDebtors}
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
                                <Col xs={5}><ControlLabel>Name</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        value={this.state.id}
                                        onChange={this.handleIdChange}
                                        placeholder="Enter name"/>
                                </Col>
                            </Row>

                            <Students parentID={this.props.id} />
                            <button className="btn btn-primary Button-save" onClick={this.saveClickHandler}>Save</button>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary Button-cancel" onClick={this.refreshHandler}>Cancel</button>
                    </DialogActions>
                </Dialog>

                <Dialog modal={undefined} open={this.state.openInfo}>
                    <DialogTitle className="Title"><ControlLabel>Details</ControlLabel></DialogTitle>
                    <DialogContent className="Padding-Form">
                        <FormGroup>
                            <Row>
                                <Col xs={6}><ControlLabel>Name:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.id}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Amount of Rating:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.amountRating}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Number of students:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.count}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}><ControlLabel>Count Debtors:</ControlLabel></Col>
                                <Col xs={6}>
                                    {this.state.countDebtors}
                                </Col>
                            </Row>
                            <Students parentID={this.props.id}/>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={this.refreshHandler}>Back</button>
                    </DialogActions>
                </Dialog>

                <Dialog modal={undefined} open={this.state.openDelete}>
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
            this.props.removeClickHandler(this.props.id);
        }
        this.setState({openDelete: false});
    };
    saveClickHandler = () => {
        if(this.state.id === this.props.id){
            if(this.props.saveClickHandler){
                this.props.saveClickHandler(this.props.id, this.props.id);
            }
            this.setState({openEdit: false});
        }
        else{
            if(this.props.groups.filter((item) => item.id === this.state.id).length === 0){
                if(this.props.saveClickHandler){
                    this.props.saveClickHandler(this.state.id, this.props.id);
                }
                this.setState({openEdit: false});
            }
            else{
                this.setState({validateMessage: "Groups must be unique"});
            }
        }
    };
    refreshHandler = () => {
        if(this.props.refreshHandler){
            this.props.refreshHandler();
        }
        this.setState({openEdit: false});
        this.setState({openInfo: false});
    }
}

export default Group;