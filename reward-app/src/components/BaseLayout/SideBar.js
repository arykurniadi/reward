import { Offcanvas } from "react-bootstrap";

export const SideBar = ({ show, onHide }) => {
    const menuItems = [
        {
            name: "Home",
            href: "#",
        },
        {
            name: "Cards",
            href: "#",
        },
        {
            name: "Profile",
            href: "#",
        },
        {
            name: "Logout",
            href: "/",
        },
    ];

    return (
        <Offcanvas show={show} onHide={onHide} className="nav-menu">
            <Offcanvas.Body className="nav-body">
            <div className="text-center">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="img" />
                <h5>AWARDS</h5>
            </div>
            <ul className="nav-list">
                {menuItems && menuItems.map((item, index) => {
                    return(
                        <li key={index}><a href={item.href}>{item.name}</a></li>
                    );
                })}
            </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
}