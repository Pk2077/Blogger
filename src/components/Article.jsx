import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JoditEditor from "jodit-react";
import { HStack } from "@chakra-ui/react";
import { navigate } from "@reach/router";
import axios from "axios";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "description must be more than 3 letters" })
    .max(50),
  description: z
    .string()
    .min(5, { message: "description must be more than 5 letters" })
    .max(100_000),
  year: z
    .number({ invalid_type_error: "year is required" })
    .min(4, { message: "year must be more than 4 letters" }),
});

const Article = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    value,
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        axios.post("http://localhost:3000/articles/", data).then((res) => {
          console.log("saved", data);
          navigate("/");
          window.location.reload();
        });
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          {...register("title")}
          id="title"
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
          value={value || ""}
          onBlur={(value) => setValue("description", value)}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Created Year
        </label>
        <input
          {...register("year", { valueAsNumber: true })}
          id="year"
          className="form-control"
          type="number"
        />
        {errors.year && <p className="text-danger">{errors.year.message}</p>}
      </div>
      <br></br>
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
};

export default Article;
