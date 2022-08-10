import PageHeader from "./common/pageHeader";
import withRouter from "./common/withRouter";
import Joi from "joi";
import { toast } from "react-toastify";
import cardsService from "../services/cardsService";
import Form from "./common/form";

class EditCard extends Form {
  state = {
    form: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
  };

  async componentDidMount() {
    const card = await cardsService.getCard(this.props.params.id);
    this.setState({ form: this.rearrangeCardData(card.data) });
  }

  rearrangeCardData({
    _id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImage,
  }) {
    return {
      _id,
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImage,
    };
  }

  schema = {
    _id: Joi.string().required(),
    bizName: Joi.string().min(2).max(255).required().label("Name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Description"),
    bizAddress: Joi.string().min(2).max(400).required().label("Address"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
  };

  async doSubmit() {
    const {
      form: { bizImage, ...body },
    } = this.state;

    if (bizImage) {
      body.bizImage = bizImage;
    }

    try {
      await cardsService.editCard(body);
      toast.success("Congratulations! You have edited the card", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.navigate("/my-cards");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({ errors: { bizImage: response.data } });
      }
    }
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.navigate("/my-cards");
  };

  render() {
    return (
      <>
        <PageHeader title="Edit card" />
        <div className="row">
          <div className="col-12">
            <p>Edit the Business Card</p>
          </div>
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "bizName", label: "Business Name" })}
          {this.renderInput({
            name: "bizDescription",
            label: "Business Description",
          })}
          {this.renderInput({ name: "bizAddress", label: "Business Address" })}
          {this.renderInput({ name: "bizPhone", label: "Business Phone" })}
          {this.renderInput({
            name: "bizImage",
            label: "Business Image (leave empty for defaul image)",
          })}

          <div className="my-2">{this.renderButton("Save Changes")}</div>
          <button
            onClick={this.handleCancel}
            className="btn btn-secondary ml-2"
          >
            Cancel
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(EditCard);
