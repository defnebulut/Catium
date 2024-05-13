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
import { useParams } from "react-router-dom";

const List = () => {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState({});
  const [categories, setCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://catium.azurewebsites.net/api/v1/UserArticle?id=${userId}&PageSize=50`);
        console.log(response);
        if (response.data.succeeded && Array.isArray(response.data.data)) {
          setRows(response.data.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://catium.azurewebsites.net/api/v1/User');
        console.log(response);
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
        console.log(response);
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
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.content.includes(searchQuery) || row.title.includes(searchQuery)
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search"
        className="searchInput"
      />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell" width={150}>Article Title</TableCell>
              <TableCell className="tableCell">Category</TableCell>
              <TableCell className="tableCell">Content</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.articleId}>
                <TableCell className="tableCell">{row.articleId}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row.title}</div>
                </TableCell>
                <TableCell className="tableCell">{categories[row.categoryId]}</TableCell>
                <TableCell className="tableCell">{row.content.slice(0, 200)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;