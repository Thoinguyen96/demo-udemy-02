import NavDropdown from "react-bootstrap/NavDropdown";

function Language() {
    return (
        <>
            <NavDropdown className="language" title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item>Vi</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>English</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Language;
