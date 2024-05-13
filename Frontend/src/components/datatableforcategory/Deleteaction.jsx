
import "./cellaction.scss"


const Deleteaction = ({ row, setDeleteItemId, setShowConfirmation }) => {

  return (
    <div className="cellAction">
      <div className="deleteButton" onClick={() => {
                setDeleteItemId(row.id);
                setShowConfirmation(true);
              }}>
        Delete
      </div>
    </div>
  );
};

export default Deleteaction;