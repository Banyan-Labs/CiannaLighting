import React, { FC, FormEvent, useState } from "react";
import axios from "../../api/axios";
import { FaTimes } from "react-icons/fa";
import "./style/modal.scss";

type ProjectType = {
  name: string;
  description: string;
  clientId: string;
};

// Assign prop "types" to allow react dispatch to pass values among
// parent/child components.
type Props = {
  closeModal: React.Dispatch<React.SetStateAction<any>>;
  openModal: boolean;
  user: any;
};

// Modal function for "New Project". Creates a modal window which allows
// user to input the Name, Description, Status, and Region of a "New Project".
const Modal: FC<Props> = (props, user) => {
  let closeModal = props.closeModal;
  let openModal = props.openModal;
  const [projectDetails, setProjectDetails] = useState<ProjectType>({
    name: "",
    description: "",
    clientId: props.user.id,
  });

  const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
    setProjectDetails({
      ...projectDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const response = await axios.post(
        "/projects/create-project/",
        projectDetails
      );
      setProjectDetails({
        name: "",
        description: "",
        clientId: props.user.id,
      });
      console.log(response.data, "response");
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  console.log(projectDetails, props.user, "user & project");
  return (
    <div className="new-project-modal-background">
      <div className="new-project-modal-container">
        <div className="modal-title-close-btn">
          <button
            onClick={() => {
              closeModal(!openModal);
            }}
          >
            {" "}
            <FaTimes />
          </button>
        </div>
        <div className="new-project-modal-title">
          <h3 className="modal-title">New Project</h3>
        </div>
        <div className="new-project-modal-body">
          <form onSubmit={onSubmit}>
            <label className="new-project-modal-labels" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="new-project-modal-inputs"
              placeholder="Ex. 113 Baptistry"
              value={projectDetails.name}
              onChange={(e) => handleFormInput(e)}
              required
            />
            <label className="new-project-modal-labels" htmlFor="description">
              Description
            </label>
            <input
              name="description"
              id="description"
              type="text"
              className="new-project-modal-inputs"
              placeholder="Description of the project..."
              value={projectDetails.description}
              onChange={(e) => handleFormInput(e)}
              required
            ></input>
            <span className="max-text-span">
              <small className="max-text">500 max</small>
            </span>
            <div className="new-projects-dropdowns-container">
              <div>
                <label
                  htmlFor="status-select-menu"
                  className="new-project-modal-labels"
                >
                  Status
                </label>
                <br />
                <select
                  id="status-select-menu"
                  name="status-select-menu"
                  required
                >
                  <option value="new-option" selected>
                    New (default)
                  </option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
              <br />
              <div>
                <label className="new-project-modal-labels">Region</label>
                <br />
                <select
                  id="status-select-menu"
                  name="status-select-menu"
                  required
                >
                  <option value="default-option" selected>
                    Select Region
                  </option>
                  <option value="region1">Region 1</option>
                  <option value="region2">Region 2</option>
                  <option value="region3">Region 3</option>
                </select>
              </div>
            </div>
            <div className="new-project-modal-footer">
              <button
                type="submit"
                className="new-project-modal-button"
                onClick={(e) => onSubmit(e)}
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
