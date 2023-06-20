import React, { useEffect, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { HStack } from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be more than 3 letters" })
    .max(50),
  description: z
    .string()
    .min(5, { message: "Description must be more than 5 letters" })
    .max(100000),
  year: z.string().min(4, { message: "Year must be more than 4 digits" }),
});

function EditForm({ id }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/articles/${id}`)
      .then((response) => {
        setFormData(response);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, [id]);

  useEffect(() => {
    const saveFormData = async () => {
      try {
        await axios.put(`http://localhost:3000/articles/${id}`, formData);
        console.log("Form data saved successfully");
      } catch (error) {
        console.error("Error saving form data:", error);
      }
    };

    // Autosave whenever formData changes
    saveFormData();
  }, [formData, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    axios
      .put(`http://localhost:3000/articles/${id}`, formData)
      .then((response) => {
        console.log("Form data updated successfully");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating form data:", error);
      });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const handleDescriptionBlur = (value) => {
    setValue("description", value);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          {...register("title")}
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          type="text"
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <JoditEditor
          value={formData.description}
          onBlur={handleDescriptionBlur}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Created Year
        </label>
        <input
          {...register("year")}
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="form-control"
          type="text"
        />
        {errors.year && <p className="text-danger">{errors.year.message}</p>}
      </div>
      <br />
      <HStack>
        <button
          className="btn btn-outline-success btn-lg"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          All Articles
        </button>
        <button className="btn btn-primary btn-lg" type="submit">
          Submit
        </button>
      </HStack>
    </form>
  );
}

export default EditForm;
