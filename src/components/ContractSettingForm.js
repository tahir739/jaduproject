import React, { useState } from "react";
import axios from "axios";

const ContractSettingForm = () => {
  const [contract, setContract] = useState({
    documentReceived: 0,
    documentProcessed: 0,
    documentSubmitted: 0,
  });
  const [array, setArray] = useState([]);
  console.log(array, "array");
  const handleFormChange = (e) => {
    setContract({
      ...contract,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const add = {
      documentReceived: contract.documentReceived,
      documentProcessed: contract.documentProcessed,
      documentSubmitted: contract.documentSubmitted,
    };
    await axios.post("http://localhost:5000/contracts/dates", add);

    setContract({
      documentReceived: 0,
      documentProcessed: 0,
      documentSubmitted: 0,
    });
  };
  return (
    <div>
      <div>
        <label htmlFor="documentReceived">Document receiving date:</label>
        <input
          type="number"
          id="documentReceived"
          name="documentReceived"
          value={contract.documentReceived}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label htmlFor="documentProcessed">Document processed date:</label>
        <input
          type="number"
          id="documentProcessed"
          name="documentProcessed"
          value={contract.documentProcessed}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label htmlFor="documentSubmitted">Document Sumit date:</label>
        <input
          type="number"
          id="documentSubmitted"
          name="documentSubmitted"
          value={contract.documentSubmitted}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

export default ContractSettingForm;
