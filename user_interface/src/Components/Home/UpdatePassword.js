import React, { useState } from 'react';
import axios from 'axios';
import { Row, Form, Button } from 'react-bootstrap';


const  UpdatePassword = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [new2Password, setNew2Password] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const attemptPasswordUpdate = async () => {

    try {

      setPasswordChanged(false);
      setLoading(true);
  
      const { status } = await axios.put(`/update_password`, {
        oldPassword,
        newPassword
      });
  
      if (status === 400) {
        setPasswordIncorrect(true);
        return;
      }
      setPasswordIncorrect(false);

      document.getElementById("old password").reset();
      document.getElementById("new password").reset();
      document.getElementById("new2 password").reset();

      setOldPassword("");
      setNewPassword("");
      setNew2Password("");
  
      setLoading(false);
      setPasswordChanged(true);

    } catch(err) {

      setLoading(false);
      console.error(err);

    }

  }

  return (

    <div>
      {
        passwordChanged ?
        <h6 style={{ color: '#28a745' }}>Password updated successfully!</h6> :
        null
      }
      {
        passwordIncorrect ?
        <h6 style={{ color: 'red' }}>Old password is incorrect, failed to update</h6> :
        null
      }
      <br/>
      <br/>
      <Row>
        <Form 
          id="old password" 
          style={{ margin: 'auto' }}
          onChange={(e) => setOldPassword(e.target.value)}
          onSubmit={(event) => event.preventDefault()}
          onKeyPress={(target) => (target.charCode === 13 && oldPassword.length > 0 && newPassword.length > 0 && new2Password.length > 0 && newPassword === new2Password) ? attemptPasswordUpdate() : null}
          >
          <Form.Group controlId="formOldPassword">
            <Form.Control placeholder="Old password" disabled={loading}/>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form 
          id="new password" 
          style={{ margin: 'auto' }}
          onChange={(e) => setNewPassword(e.target.value)}
          onSubmit={(event) => event.preventDefault()}
          onKeyPress={(target) => (target.charCode === 13 && oldPassword.length > 0 && newPassword.length > 0 && new2Password.length > 0 && newPassword === new2Password) ? attemptPasswordUpdate() : null}
          >
          <Form.Group controlId="formNewPassword">
            <Form.Control placeholder="New password" disabled={loading}/>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form 
          id="new2 password" 
          style={{ margin: 'auto' }}
          onChange={(e) => setNew2Password(e.target.value)}
          onSubmit={(event) => event.preventDefault()}
          onKeyPress={(target) => (target.charCode === 13 && oldPassword.length > 0 && newPassword.length > 0 && new2Password.length > 0 && newPassword === new2Password) ? attemptPasswordUpdate() : null}
        >
          <Form.Group controlId="formNew2Password">
            <Form.Control placeholder="Retype new password" disabled={loading}/>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Button 
          disabled={oldPassword.length < 1 || newPassword.length < 1 || new2Password.length < 1 || newPassword !== new2Password}
          variant="outline-success" 
          size="lg" 
          block 
          style={{ width: "50%", margin: 'auto' }}
          onClick={() => attemptPasswordUpdate()}
        >
          Update Password
        </Button>
      </Row>
    </div>

  )

}

export default UpdatePassword;