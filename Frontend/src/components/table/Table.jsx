import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import { useEffect, useState } from "react";

const List = () => {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [selectedData, setSelectedData] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const handleView = async (row) => {
    try {
      setLoading(true); // Set loading state to true before making the request

      const response = await axios.get(
        `https://catium.azurewebsites.net/api/v1/Article/${row}`
      );
      setSelectedData(response.data.data);
      const createdBy = response.data.data.createdBy;

      const userResponse = await axios.get(
        `https://catium.azurewebsites.net/api/v1/User/${createdBy}`
      );
      setUsername(userResponse.data.data.userName);
    } catch (error) {
      console.error("Error fetching article data:", error);
    } finally {
      setLoading(false); // Set loading state to false after the requests are complete
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://catium.azurewebsites.net/api/v1/Article?PageSize=15');
        if (response.data.succeeded && Array.isArray(response.data.data)) {
          const sortedRows = response.data.data.sort((a, b) => b.id - a.id); // Sort the rows by ID in descending order
          setRows(sortedRows);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://catium.azurewebsites.net/api/v1/User');
        if (response.data.succeeded && Array.isArray(response.data.data)) {
          const userMap = response.data.data.reduce((map, user) => {
            map[user.userId] = user.userName;
            return map;
          }, {});
          setUsers(userMap);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://catium.azurewebsites.net/api/v1/Category');
        if (response.data.succeeded && Array.isArray(response.data.data)) {
          const catMap = response.data.data.reduce((map, category) => {
            map[category.id] = category.name;
            return map;
          }, {});
          setCategories(catMap);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  
  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Article</TableCell>
              <TableCell className="tableCell">User</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Category</TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row.title}</div>
                </TableCell>
                <TableCell className="tableCell">{users[row.createdBy]}</TableCell>
                <TableCell className="tableCell">{row.createdDate}</TableCell>
                <TableCell className="tableCell">{categories[row.category]}</TableCell>
                <TableCell className="tableCell">
                  <button className="viewButton" onClick={() => handleView(row.id)}>View</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
      {selectedData && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <h2>Article Details</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <p>
                  <strong>Cover Picture: </strong>{' '} <br />
                    <div>
                      {/* Empty line */}
                    </div>
                    <div className="imageContainer">
                    <img
                      src={selectedData.coverPicture}
                      alt=""
                      className="itemImg"
                      onError={(e) => {
                        e.target.style.display = 'none'; // Hide the image if it fails to load
                      }}
                    />
                    </div>
                  </p>
                  <p><strong>Title: </strong>{selectedData.title}</p>
                  <p><strong>Created By:</strong> {users[selectedData.createdBy]}</p>
                  <p><strong>Content: </strong> {selectedData.content}</p>
                  {/* Add more fields as needed */}
                </>
              )}
              <button className="closeButton" onClick={() => setSelectedData(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;