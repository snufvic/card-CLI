import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage },
}) => {
  return (
    <div className="col-6 col-md-3 col-lg-4 mt-3">
      <div className="card">
        <img src={bizImage} alt={bizName} />
        <div className="card-body">
          <h5 className="card-title">Business Name: {bizName}</h5>
          <p className="card-text">Description: {bizDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b> {bizPhone}
            <br />
            <b>Address: </b> {bizAddress}
          </p>
          <Link to={`/my-cards/edit/${_id}`}>
            {" "}
            <i className="bi bi-pencil"></i> Edit
          </Link>
          <Link className="text-danger ms-3" to={`/my-cards/delete/${_id}`}>
            <i className="bi bi-trash"></i> DELETE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
