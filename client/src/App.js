import React, {Component} from 'react';
import './App.css';
import Students from "./components/Students";
import Groups from "./components/Groups";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import store from "./store"
import {Provider} from "react-redux";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <div>

                        <Link to={"/students"}>
                            <button>
                                Students
                            </button>
                        </Link>
                        <Link to={"/groups"}>
                            <button>
                                Groups
                            </button>
                        </Link>
                    </div>

                    <Switch>
                        <Route component={Students} path={"/students"}/>
                        <Route component={Groups} path={"/groups"}/>
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default withRouter(App);
