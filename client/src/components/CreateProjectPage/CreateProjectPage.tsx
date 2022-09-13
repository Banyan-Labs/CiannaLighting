import { FC, FormEvent, useState } from "react";
import axios from "../../api/axios";

// import "./style/projectForm.css";

type ProjectType = {
  name: string;
  description: string;
  clientId: string;
};

type CreateProjectPageType = {
  user: any;
};

const CreateProjectPage: FC<CreateProjectPageType> = ({ user }) => {
  const [projectDetails, setProjectDetails] = useState<ProjectType>({
    name: "",
    description: "",
    clientId: user.id,
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
        clientId: user.id,
      });
      console.log(response.data, "response");
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  console.log(projectDetails, user, "user & project");
  return (
    <div
      className="project-create-form-wrapper"
      style={{ paddingTop: "100px" }}
    >
      <form onSubmit={onSubmit} className="create-project-form">
        <label htmlFor="name">Name</label>
        <input
          className="project-name-input"
          id="name"
          type="text"
          name="name"
          value={projectDetails.name}
          onChange={(e) => handleFormInput(e)}
          placeholder="John Doe"
          required
        />
        <label htmlFor="description">Description</label>
        <input
          className="project-description-input"
          id="description"
          placeholder="Description"
          name="description"
          value={projectDetails.description}
          onChange={(e) => handleFormInput(e)}
          required
        />
        <button onClick={(e) => onSubmit(e)}>submit</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
