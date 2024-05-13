import { useEffect, useState } from "react";
import "./datatable.scss";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Reportuserdatatable = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemText, setDeleteItemText] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://catium.azurewebsites.net/api/v1/ReportUser?id=1&PageSize=10"
        );
        const modifiedData = response.data.data.map((row) => ({
          id: row.id,
          reportReason: row.report_Reason,
          reportType: row.report_Type,
          reportedIntId: row.reportedIntId,
          reportedStringId: row.reportedStringId || "",
        }));
        setData(modifiedData);
        setFilteredData(modifiedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.reportedStringId.includes(searchValue)
    );
    setFilteredData(filteredData);
  }, [searchValue, data]);

  const handleDelete = async (id) => {
    setShowConfirmation(false);
    try {
      const token = localStorage.getItem("jwToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `https://catium.azurewebsites.net/api/v1/Report/${id}`,
        config
      );
      setData(data.filter((item) => item.id !== id));
      setFilteredData(filteredData.filter((item) => item.id !== id));
      setDeleteSuccess(true);
    } catch (error) {
      setDeleteError(true);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.reportedStringId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                setDeleteItemId(params.row.id);
                setDeleteItemText("this report");
                setShowConfirmation(true);
              }}
            >
              Delete Report
            </div>
            <div
              className="deleteButton"
              onClick={() =>{
                setDeleteItemId(params.row.reportedStringId);
                setDeleteItemText("this user");
                setShowConfirmation(true);
              }}
            >
              Delete User
            </div>
          </div>
        );
      },
    },
  ];

  const handleDeleteUser = async (userId) => {
    setShowConfirmation(false);
    try {
      const token = localStorage.getItem("jwToken"); // Retrieve the JWT token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
      };
  
      await axios.delete(`https://catium.azurewebsites.net/api/v1/User/${userId}`, config);
      setData(data.filter((item) => item.userId !== userId));
      setDeleteSuccess(true);
    } catch (error) {
      setDeleteError(true);
    }
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "reportReason",
      headerName: "Report Reason",
      width: 300,
    },
    {
      field: "reportedStringId",
      headerName: "Reported User ID",
      width: 450,
    },
  ];

  return (
    <div className="datatable-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search User ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="clearButton" onClick={() => setSearchValue("")}>
          Clear
        </button>
      </div>
      {filteredData.length > 0 ? (
        <DataGrid
          style={{ height: "700px" }}
          className="dataGrid"
          rows={filteredData}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      ) : (
        <div></div>
      )}
      {showConfirmation && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Are you sure you want to delete {deleteItemText}?</p>
              <div className="confirmationButtons">
                <button
                  className="confirmButton"
                  onClick={() => {
                    if (deleteItemText === "this report") {
                      handleDelete(deleteItemId);
                    } else if (deleteItemText === "this user") {
                      handleDeleteUser(deleteItemId);
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  className="cancelButton"
                  onClick={() => setShowConfirmation(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteSuccess && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>{deleteItemText} deleted successfully!</p>
              <button
                className="closeButton"
                onClick={() => setDeleteSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>
                An error occurred while deleting: {deleteItemText} may already
                be deleted by another admin.
              </p>
              <button
                className="closeButton"
                onClick={() => setDeleteError(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportuserdatatable;