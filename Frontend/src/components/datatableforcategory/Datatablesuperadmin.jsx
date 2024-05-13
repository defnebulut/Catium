import { useEffect, useState } from "react";
import "./datatablecategory.scss";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Deleteaction from "./Deleteaction";

const Datatablesuperadmin = () => {
  const [data, setData] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://catium.azurewebsites.net/api/Account/superadmin");
        if (Array.isArray(response.data.data)) {
          const modifiedData = response.data.data.map((item) => ({
            id: item.id,
            email: item.email,
            name: item.userName,
            role: item.role,
            username: item.userName,
          }));
          setData(modifiedData);
        } else {
          console.error("Invalid superadimn data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching superadmin data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    setShowConfirmation(false);
    try {
      const response = await axios.delete(`https://catium.azurewebsites.net/api/Account/superadmin-delete?superadminId=${userId}`);
      // Remove the deleted admin from the data array
      setData((prevData) => prevData.filter((item) => item.id !== userId));
      setDeleteSuccess(true);
    } catch (error) {
      setDeleteError(true);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => <Deleteaction row={params.row} 
      setDeleteItemId={setDeleteItemId} setShowConfirmation={setShowConfirmation} />,
    },
  ];

  const userColumns = [
    { field: "id", headerName: "ID", width: 350 },
    { field: "name", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 280 },
    { field: "role", headerName: "Role", width: 100 },
  ];

  return (
    <div className="datatable-container">
      <div className="datatableTitle">
        Add New SuperAdmin
        <Link to="/superadmins/newsuperadmin" className="link">
          Add New
        </Link>
      </div>
      {data.length > 0 ? (
        <DataGrid
          style={{ height: "700px" }}
          className="dataGrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      ) : (
        <div>Loading user data...</div>
      )}
      {showConfirmation && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <p>Are you sure you want to delete this admin?</p>
              <div className="confirmationButtons">
                <button
                  className="confirmButton"
                  onClick={() => {
                    handleDelete(deleteItemId);
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
              <p>This superadmin deleted successfully!</p>
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
                An error occurred while deleting: this superadmin may already
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

export default Datatablesuperadmin;