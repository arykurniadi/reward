import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SideBar } from "./SideBar";
import { Filter } from "./Filter";

export const Base = ({ children, extra }) => {
  return (
    <>
      <div className="home-page">
        <Row className="zeropm">
          <Col sm={0} md={3} />
          <Col
            sm={12}
            md={6}
            className="vh-100 main_layout zeropm"
          >
            {children}
          </Col>
          <Col sm={0} md={3} />
        </Row>
      </div>
      {extra}
    </>
  );
};

export const BaseWithNav = ({ 
  children, 
  onClickFilter  = () => {},
}) => {
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const onShowOffCanvas = () => {
    setShow(true);
  };

  const onHideOffCanvas = () => {
    setShow(false);
  };

  const onFilterShow = () => {
    setShowFilter(true);
  }

  const onFilterClose = () => {
    setShowFilter(false);
  }

  return (
    <Base>
      <div className="top-navigation col-md-6">
        <div className="left">
          <Button variant="link" className="btn-nav" onClick={onShowOffCanvas}>
            <FontAwesomeIcon
              icon={faBars}
              style={{ fontSize: "30px", color: "#1E74FD" }}
            />
          </Button>
        </div>
        <div className="center">
          <h3>Awards</h3>
        </div>
        <div className="right">
        <Button variant="link" className="btn-nav" onClick={onFilterShow}>
          <FontAwesomeIcon
            icon={faFilter}
            style={{ fontSize: "30px", color: "#1E74FD" }}
          />
          </Button>
        </div>
      </div>
      <div className="main-content">
        {children}

        <Filter show={showFilter} onHide={onFilterClose} onClickFilter={onClickFilter} />
      </div>
      <SideBar show={show} onHide={onHideOffCanvas} />
    </Base>
  );
};
