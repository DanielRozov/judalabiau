import React, { Component, Fragment } from "react";
import axios from "axios/index";
import { inject, observer } from "mobx-react";
import { USERS } from "../../../../server_links/ServerLinks";
import { Button } from "primereact/components/button/Button";
import Subheader from "../../../layout/sub_header/SubHeader";

@inject("userStore")
@observer
class UserEditForm1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyUser: {
                id: "",
                fName: "",
                lName: "",
                email: "",
                phone: "",
                role: 1
            },
            id: this.props.userStore.userToEdit.id,
            fName: this.props.userStore.userToEdit.fName,
            lName: this.props.userStore.userToEdit.lName,
            email: this.props.userStore.userToEdit.email,
            phone: this.props.userStore.userToEdit.phone
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            id: this.props.userStore.userToEdit.id,
            fName: this.props.userStore.userToEdit.fName,
            lName: this.props.userStore.userToEdit.lName,
            email: this.props.userStore.userToEdit.email,
            phone: this.props.userStore.userToEdit.phone
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('"' + this.state.fName + '" pakeista informacija.');
        event.preventDefault();
    }

    updateUser() {
        axios
            .put(USERS + this.state.id, {
                id: this.state.id,
                fName: this.state.fName,
                lName: this.state.lName,
                email: this.state.email,
                phone: this.state.phone,
                role: 1
            })
            .then(() => {
                this.props.userStore.changeState();
                this.props.userStore.editUser(this.state.emptyUser);
            })
            .catch(function(error) {
                console.log("Klaida redaguojant vartotoją" + error);
            });
    }
    render() {
        return (
            <Fragment>
                <Subheader
                    label={
                        "Administratoriaus, kurio id " +
                        this.state.id +
                        " redagavimas"
                    }
                />
                <div className="reg_form">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Vardas:
                            <input
                                name="fName"
                                placeholder="Vardas"
                                className="placeholder"
                                required
                                type="text"
                                value={this.state.fName}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            Pavardė:
                            <input
                                name="lName"
                                placeholder="Pavardė"
                                className="placeholder"
                                required
                                type="text"
                                value={this.state.lName}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            El.paštas:
                            <input
                                name="email"
                                placeholder="elektronionis@paštas"
                                className="placeholder"
                                required
                                type="text"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            Telefono numeris:
                            <input
                                name="phone"
                                placeholder="Įveskite telefono numerį"
                                className="placeholder"
                                required
                                type="text"
                                value={this.state.phone}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <Button label="Pakeisti" onClick={this.updateUser} />
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default UserEditForm1;
