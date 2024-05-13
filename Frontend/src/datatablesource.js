export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone Number",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Defne",
    status: "active",
    email: "defdef@gmail.com",
    phone: 35432143214231,
  },
  {
    id: 3,
    username: "kewan",
    email: "kean@gmail.com",
    status: "pending",
    phone: 4432143215,
  },
  {
    id: 4,
    username: "kaanyastık",
    email: "yastık@gmail.com",
    status: "active",
    phone: 4321432116,
  },
  {
    id: 5,
    username: "Targaryen",
    email: "5snow@gmail.com",
    status: "passive",
    phone: 2243214321,
  },
  {
    id: 6,
    username: "Melisandre",
    email: "6snow@gmail.com",
    status: "active",
    phone: 4321415,
  },
  {
    id: 7,
    username: "Clifford",
    email: "7snow@gmail.com",
    status: "passive",
    phone: 4432143214,
  },
  {
    id: 8,
    username: "Frances",
    email: "8snow@gmail.com",
    status: "active",
    phone: 3432143216,
  },
  {
    id: 9,
    username: "Roxie",
    email: "snow@gmail.com",
    status: "pending",
    phone: 4321432165,
  },
];
