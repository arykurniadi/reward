import { connect } from "react-redux";
import classNames from "classnames";
import "./style.scss";
import { Base } from "../../components/BaseLayout";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const { loginAuth } = props;
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ email: null });  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    if(payload.email) {
      await loginAuth(payload)
        .then((response) => {
          if(response.status) {
            navigate('/home', { replace: true });
            setLoading(false);
          }
        })
        .catch((error) => {
          if(error.code === "ERR_BAD_REQUEST") {
            console.log('--> err', error.response.data.message);
            setError(error.response.data.message);
          }
          setLoading(false);
        })      
    }
    setLoading(false);
  }

  return (
    <Base>
      <div className="login">
        <div className="section">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="img" />
        </div>
        <div className="section">
            <h2>AWARD</h2>
            <span>
                Enter your email address <br />
                to sign in and continue
            </span>
        </div>
        <div className="section">
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                onChange={(e) => {
                  setPayload({ ...payload, email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid" className={classNames({'invalid-login': !!error})}>{error}</Form.Control.Feedback>
          </Form>
          
          { loading && <Button variant="secondary" className="btn-login">Loading ...</Button> }
          { !loading && <Button variant="secondary" className="btn-login" onClick={handleLogin}>Sign in</Button> }          
        </div>
      </div>
    </Base>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginAuth: dispatch.LoginStore.loginAuth,
});

export default connect(null, mapDispatchToProps)(LoginPage);
