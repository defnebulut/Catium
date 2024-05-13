import { useEffect, useState } from "react";
import "./datatable.scss";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://catium.azurewebsites.net/api/v1/User");
        const modifiedData = response.data.data.map((row, index) => ({
          id: index + 1,
          userId: row.userId,
          userName: row.userName,
          firstName: row.firstName,
          lastName: row.lastName,
        }));
        setData(modifiedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.userId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            
          </div>
        );
      },
    },
  ];

  const userColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "userId", headerName: "User ID", width: 350 }, // Added User ID column
    {
      field: "userName",
      headerName: "User",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.userName}
          </div>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 130,
    },
  ];

  return (
    <div className="datatable-container">
      
      {data.length > 0 ? (
        <DataGrid  style={{ height: '700px' }}
          className="dataGrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default Datatable;