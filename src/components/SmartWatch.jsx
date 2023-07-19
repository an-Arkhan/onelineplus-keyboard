import React, { useState, useEffect, useRef } from "react";
import App from "../components/OneLineKeyboard";
import Testletter from "../components/TestLetter/TestLetter";
import Result from "./ResultContainer/ResultContainer";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Form, Alert, InputGroup, Button, Modal } from "react-bootstrap";
import UserDataService from "../services/user-services";

function SmartWatch({
  words,
  characters,
  wpm,
  timeRemaining,
  timerStarted,
  testInfo,
  startAgain,
  onInputChange,
  incorrectCount,
}) {
  const [message, setMessage] = useState("");
  const textInput = useRef(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [alert, setAlert] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");
    if (name === "" || age === "") {
      setAlert({ error: true, msg: "Nama atau usia belum diisi!" });
      return;
    }

    const newUser = {
      name,
      age,
      wpm,
      characters,
    };
    console.log(newUser);

    try {
      await UserDataService.addUser(newUser);
      setAlert({ error: false, msg: "New user added successfully" });
    } catch (err) {
      setAlert({ error: true, msg: err.msg });
    }

    setName("");
    setAge("");
    setShow(false);
    startAgain();
    setMessage("");
  };

  useEffect(() => {
    if (message !== "") {
      setMessage(message);
      onInputChange(message);
    }
  }, [message, onInputChange]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetText = () => {
    startAgain();
    setMessage("");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            {alert?.msg && (
              <Alert
                variant={alert?.error ? "danger" : "success"}
                dismissible
                onClose={() => setAlert("")}
              >
                {alert?.msg}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              {/* input nama */}
              <Form.Group className="mb-3" controlId="formUserName">
                <InputGroup>
                  <InputGroup.Text
                    variant="info"
                    id="formUserName"
                  ></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* input usia */}
              <Form.Group className="mb-3" controlId="formUserAge">
                <InputGroup>
                  <InputGroup.Text id="formUserAge"></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* input skor wpm */}
              <Form.Group className="mb-3" controlId="formUserAge">
                <InputGroup>
                  <InputGroup.Text id="formUserAge"></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="WPM"
                    value={wpm}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>

              {/* input skor jumlah karakter */}
              <Form.Group className="mb-3" controlId="formUserAge">
                <InputGroup>
                  <InputGroup.Text id="formUserAge"></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Characters"
                    value={characters}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Container maxWidth="sm" className="mt-2">
          <Card>
            <CardContent className="grid grid-cols-3 gap-2">
              <Result cardName="Words" cardValue={words} />
              <Result cardName="Characters" cardValue={characters} />
              <Result cardName="WPM" cardValue={wpm} />
            </CardContent>
          </Card>
        </Container>
        <div className="grid grid-cols-1 text-center mt-4 px-5">
          <p className="timer">
            00:
            {timeRemaining >= 10 ? timeRemaining : `0${timeRemaining}`}
          </p>
          <p className="timer-info">
            Mohon ketik sesuai dengan kalimat yang tersedia di kotak hitam
            berikut untuk <strong>memulai dan memudahkan pengujian</strong>:
          </p>
        </div>
      </div>
      <div className="section">
        <div className="card has-background-dark">
          <div className="card-content">
            <div className="content" id="test-paragraph-div">
              {testInfo.map((individualLetterInfo, index) => {
                return (
                  <Testletter
                    key={index}
                    individualLetterInfo={individualLetterInfo}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="Smartwatch m-auto">
        {timeRemaining > 0 ? (
          <>
            <div className="text-center" id="key-input">
              <textarea
                ref={textInput}
                value={message}
                className="box-input"
                type="text"
                id="message"
                readOnly
              />
            </div>
            <App setMessage={setMessage} message={message} />
          </>
        ) : (
          <div className="text-center py-4">
            <button onClick={() => handleShow()} className="start-again-btn">
              Save Result
            </button>
            <button
              onClick={() => resetText()}
              className="start-again-btn mt-2"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SmartWatch;
