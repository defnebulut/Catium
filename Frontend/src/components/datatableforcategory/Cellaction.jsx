import React, { useState } from "react";
import "./cellaction.scss";

const CellAction = ({ row, handleDelete, handleNameChange }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleViewClick = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleAddClick = async () => {
    // Prepare the data object
    const data = {
      id: row.id,
      name: textInput,
    };

    try {
      const response = await fetch(`https://catium.azurewebsites.net/api/v1/Category/${row.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Successful request, handle the response as needed
        console.log("Change successful");
        // Call the callback function to update the list
        handleNameChange({
          id: row.id,
          name: textInput,
        });
      } else {
        // Handle error response
        console.log("Change failed");
      }
    } catch (error) {
      // Handle network error
      console.log("Network error:", error);
    }

    // Close the popup
    handlePopupClose();
  };

  return (
    <div className="cellAction">
      <button className="viewButton" onClick={handleViewClick}>
        Change
      </button>
      {isPopupOpen && (
        <div className="popup">
          <label>Enter New Name:</label>
          <input type="text" value={textInput} onChange={handleInputChange} />
          <div className="buttonContainer">
            <button onClick={handleAddClick}>Change</button>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CellAction;