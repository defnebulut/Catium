
import { useEffect, useState } from "react";
import "./datatablecategory.scss";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CellAction from "./Cellaction";

const Datatablecategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://catium.azurewebsites.net/api/v1/Category");
        if (Array.isArray(response.data.data)) {
          const modifiedData = response.data.data.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setData(modifiedData);
        } else {
          console.error("Invalid category data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    // Handle delete logic here
  };

  const handleNameChange = (updatedRow) => {
    const updatedData = data.map((item) => {
      if (item.id === updatedRow.id) {
        return {
          ...item,
          name: updatedRow.name,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 800,
      renderCell: (params) => (
        <CellAction row={params.row} handleDelete={handleDelete} handleNameChange={handleNameChange} />
      ),
    },
  ];

  const userColumns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "name", headerName: "Category Name", width: 330 },
  ];

  return (
    <div className="datatable-container">
      <div className="datatableTitle">
        Add New Category
        <Link to="/category/newcat" className="link">
          Add New
        </Link>
      </div>
      {data.length > 0 ? (
        <DataGrid
          style={{ height: '700px' }}
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

export default Datatablecategory;