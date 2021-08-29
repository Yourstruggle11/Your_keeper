import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Container,
    Nav,
    Button,
} from 'react-bootstrap';
import "./style.css";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";

//redux
import {userLogout} from "../redux/actions/userAction";
import {useDispatch} from "react-redux";


export default function NavigationBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const btn ={
        marginRight: "30px",
    }
    const addBtn= {
        marginRight: "30px",
    }

    const logOut = () =>{
        dispatch(userLogout());
        history.push("/login");
    }
    return (
        <>
            <Navbar style={{position: "fixed", width: "100%",zIndex: "11"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container >
                    <Navbar.Collapse id="responsive-navbar-nav" className="NavBar">
                        <Navbar.Brand href="/">Your Keeper</Navbar.Brand>
                        <Nav>
                            <Button
                             variant="secondary" style={btn}
                             onClick={logOut}
                             ><ExitToAppIcon />Logout</Button>
                            <Nav.Link eventKey={2} href="/addNote" style={addBtn}>
                                Add Note
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
