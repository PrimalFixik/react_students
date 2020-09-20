import React, {Component} from 'react';
import {Dialog} from "@material-ui/core";
import {Col, ControlLabel, FormControl, Row} from "react-bootstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Group from './Group'
import {getGroups, addGroup, updateGroup, deleteGroup} from "../actions/groups";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class Groups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            openAdd: false,
            validateMessage: undefined
        };

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getGroups();
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.groups !== this.props.groups) {
            this.setState({groups: this.props.groups})
        }
    }
     static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.groups !== prevState.groups){
            return { groups: nextProps.groups};
        }
        else return null;
    }

    handleIdChange(e) {
        this.setState({ id: String(e.target.value) });
    }
    handleOpenAdd = () => {
        this.setState({openAdd: true});
    };
    handleCloseAdd = () => {
        this.setState({openAdd: false});
    };

    render() {
        const items = this.state.groups.map(
            (item) => {
                return (<Group key={item._id}
                                id={item.id}
                                amountRating={item.amountRating}
                                countDebtors={item.countDebtors}
                                count={item.count}
                                removeClickHandler={this.removeClickHandler}
                                saveClickHandler={this.saveClickHandler}
                                refreshHandler={this.refreshHandler}
                                groups={this.state.groups}
                />);
            });
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount of Rating</th>
                        <th>Number of students</th>
                        <th>Count Debtors</th>
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
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col xs={5}><ControlLabel>Name</ControlLabel></Col>
                                <Col xs={7}>
                                    <FormControl
                                        type="text"
                                        name="ID"
                                        value={this.props.id}
                                        onChange={this.handleIdChange}
                                        placeholder="Enter Name"/>
                                </Col>
                            </Row>
                            <button type="submit" className="btn-primary group-save">Save</button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={this.handleCloseAdd} className="btn-primary group-cancel">Cancel</button>
                    </DialogActions>
                </Dialog>

                <button className="btn add-group" onClick={this.handleOpenAdd}>
                    +
                </button>
            </div>
        );
    }

    removeClickHandler = (id) => {
        this.props.deleteGroup({ id });
    };
    saveClickHandler = (id, oldID) => {
        this.props.updateGroup({id, oldID});
    };
    handleSubmit(e) {
        e.preventDefault();
        if(this.props.groups.filter((item) => item.id === this.state.id).length === 0){
            const { id } = this.state;
            if(id !== undefined){
                this.props.addGroup({ id });
                this.setState({openAdd: false});
            }
            else{
                this.setState({validateMessage: "You must text all fields"});
            }
        }
        else{
            this.setState({validateMessage: "Group must be unique"});
        }
    }
    refreshHandler = () => {
        this.props.getGroups();
    }

}
Groups.propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return {
        groups: state.groups
    };
}
export default connect(mapStateToProps, { getGroups, addGroup, updateGroup, deleteGroup })(Groups);