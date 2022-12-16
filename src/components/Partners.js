import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import axios from "axios";

const Partners = () => {
  const [modelData, setModelData] = useState("");
  const [state, setState] = useState([]);
  console.log(state, "state");
  console.log(modelData, "modeldata");
  const [show, setShow] = useState(false);
  const [submissionDateModel, setSubmissionDateModal] = useState({
    show: false,
    key: null,
    formIndex: null,
    date: null,
  });
  //console.log(submissionDateModel, "submissionDateModal")

  useEffect(() => {
    getContractInfo();
  }, []);

  const getContractInfo = async () => {
    const data = await axios.get("http://localhost:5000/contractInfo");
    //console.log(data, "datatatatat");
    setState(data.data.response);
  };

  const onSubmit = (close) => {
    if (close === true) {
      setModelData({ ...modelData, show: false });
      return;
    }
  };

  const dateToday = new Date();
  const dateTodayFormatted = `${dateToday.getFullYear()}-${
    dateToday.getMonth() + 1 < 10 ? 0 : ""
  }${dateToday.getMonth() + 1}-${
    dateToday.getDate() < 10 ? 0 : ""
  }${dateToday.getDate()}`;

  const monthlyAction = {
    value: "",
    submissionDate: dateTodayFormatted,
    currentSubmissionDate: "",
    status: null,
    submitted: false,
  };

  const months = {
    january: { ...monthlyAction },
    february: { ...monthlyAction },
    march: { ...monthlyAction },
    april: { ...monthlyAction },
    may: { ...monthlyAction },
    june: { ...monthlyAction },
    july: { ...monthlyAction },
    august: { ...monthlyAction },
    september: { ...monthlyAction },
    october: { ...monthlyAction },
    november: { ...monthlyAction },
    december: { ...monthlyAction },
  };

  const companyDataInitialState = [
    {
      title: "Document received",
      ...months,
    },
    {
      title: "Document processed",
      ...months,
    },
    {
      title: "Document submitted",
      ...months,
    },
  ];

  const [companyData, setCompanyData] = useState(companyDataInitialState);
  console.log(companyData, "companydata");

  const [companyTableHeaders] = useState([
    "Title",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  // console.log(companyData, "companydata");

  const addAndUpdateModel = (key, formIndex) => {
    console.log(key, formIndex, "key");
    setModelData({
      show: true,
      key,
      formIndex,
      date: dateTodayFormatted,
    });
  };

  const submissionHandler = (e) => {
    const { formIndex, key } = submissionDateModel;
    const temp = [...companyData];
    const currentForm = temp[formIndex][key];

    currentForm.submissionDate = e.target.value;
    currentForm.submitted = true;
    temp[formIndex][key] = { ...currentForm };

    setCompanyData([...temp]);
    setSubmissionDateModal({
      ...submissionDateModel,
      date: e.target.value,
    });
  };

  // UPDATING VALUE

  const docReceivedTitle = "Document received";
  const temp = [...companyData];
  let docRecIndex = temp.findIndex((x) => x.title == docReceivedTitle);
  // console.log(temp[docRecIndex]["april"].value, "give me index");

  // for(let i = 0; i < temp.length-1; i++) {
  //   if (temp[docRecIndex].title === docReceivedTitle) {
  //     temp[i]["april"].value = "12"
  //   }
  // }

  companyData.forEach((item) => {
    if (item.title === "Document received") {
      console.log("===========", item);
      // console.log("if item", item);
      item.april.value = "12";
    } 
  });

  console.log("companyData", companyData)

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {companyTableHeaders.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {companyData.map((value, index) => (
            <tr key={index}>
              {Object.keys(value).map((item, keyIndex) => (
                <td key={keyIndex} className={value[item]}>
                  {item == "title" ? (
                    value[item]
                  ) : (
                    <div onClick={() => addAndUpdateModel(item, index)}>
                      {value[item].value}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {modelData.show && (
        <Modal show={modelData.show}>
          <Modal.Header closeButton onClick={() => onSubmit(true)}>
            <Modal.Title>{`Submission Date: ${modelData.key}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="date"
              value={modelData.date}
              onChange={submissionHandler}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => onSubmit(true)}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Partners;
