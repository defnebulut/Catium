import { useEffect, useState } from "react";
import "./datatable.scss";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const Reportcommentdatatable = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemText, setDeleteItemText] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://catium.azurewebsites.net/api/v1/ReportComment?id=3&PageSize=10"
        );
        const modifiedData = response.data.data.map((row) => ({
          id: row.id,
          reportReason: row.report_Reason,
          reportType: row.report_Type,
          reportedIntId: row.reportedIntId,
          reportedStringId: row.reportedStringId || "", // Handle null values for reportedStringId
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

  const handleView = async (reportedIntId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://catium.azurewebsites.net/api/v1/Comment/${reportedIntId}`
      );
      setSelectedData(response.data.data);
      const createdBy = response.data.data.created_AuthorId;

      const userResponse = await axios.get(
        `https://catium.azurewebsites.net/api/v1/User/${createdBy}`
      );
      setUsername(userResponse.data.data.userName);
      setLoading(false);
    } catch (error) {
      setSelectedData({
        comment_err_text:
          "An error has occurred. This comment may be deleted already by another admin or its owner.",
      });
      setUsername("");
      setLoading(false);
    }
  };

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
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleView(params.row.reportedIntId)}
            >
              View
            </div>
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
              onClick={() => {
                setDeleteItemId(params.row.reportedIntId);
                setDeleteItemText("this comment");
                setShowConfirmation(true);
              }}
            >
              Delete Comment
            </div>
          </div>
        );
      },
    },
  ];

  const handleDeleteComment = async (reportedIntId) => {
    setShowConfirmation(false);
    try {
      const token = localStorage.getItem("jwToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `https://catium.azurewebsites.net/api/v1/Comment/${reportedIntId}`,
        config
      );
      setData(data.filter((item) => item.reportedIntId !== reportedIntId));
      setFilteredData(
        filteredData.filter((item) => item.reportedIntId !== reportedIntId)
      );
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
      field: "reportedIntId",
      headerName: "Reported Comment ID",
      width: 300,
    },
  ];

  return (
    <div className="datatable-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Comment ID"
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
                    } else if (deleteItemText === "this comment") {
                      handleDeleteComment(deleteItemId);
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
      {selectedData && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <h2>Comment Details</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <p>{selectedData.comment_err_text}</p>
                  <p>
                    <strong>Comment Owner:</strong> {username}
                  </p>
                  <p>
                    <strong>Content:</strong> {selectedData.comment_Text}
                  </p>
                  {/* Add more fields as needed */}
                </>
              )}
              <button
                className="closeButton"
                onClick={() => setSelectedData(null)}
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

export default Reportcommentdatatable;
