import { Component } from "react";
import { toast } from "react-toastify";
import cardsService from "../services/cardsService";
import withRouter from "./common/withRouter";

class DeleteCard extends Component {
  state = {};

  async componentDidMount() {
    await cardsService.deleteCard(this.props.params.id);
    toast.success("Congratulations! You have deleted the card", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.navigate("/my-cards");
  }
  render() {
    return null;
  }
}

export default withRouter(DeleteCard);
