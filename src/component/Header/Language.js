import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

function Language(props) {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    return (
        <>
            <NavDropdown className="language" title="Language" id="basic-nav-dropdown2">
                <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>Vi</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>English</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Language;
