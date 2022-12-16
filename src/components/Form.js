import React from "react";

const Form = ({ input, handleChange, handleSubmit }) => {
  return (
    <div>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={input.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>English</label>
        <input
          type="number"
          name="english"
          value={input.english}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Math</label>
        <input
          type="number"
          name="math"
          value={input.math}
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
};

export default Form;
