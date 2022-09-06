import { FC, FormEvent, useState } from "react";

// import "./style/projectForm.css";

type ProjectType = {
  name: string;
  description: string;
};

type CreateProjectPageType = {
  user: any;
};

const CreateProjectPage: FC<CreateProjectPageType> = ({ user }) => {
  const [projectDetails, setProjectDetails] = useState<ProjectType>({
    name: "",
    description: "",
  });

  const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
    setProjectDetails({
      ...projectDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitted");
  };

  console.log(projectDetails);
  return (
    <div className="project-create-form-wrapper">
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
      </form>
    </div>
  );
};

export default CreateProjectPage;
