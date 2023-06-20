import React, { useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import axios from "axios";
import { navigate } from "@reach/router";

const ArticleTable = () => {
  const [array, setArr] = useState([]);
  const handleEditButtonClick = (id) => {
    navigate(`/articles/${id}/edit`);
    window.location.reload();
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/articles/${id}`);
      setArr((prevData) => prevData.filter((formData) => formData.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting form data:", error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/articles/")
      .then((res) => setArr(res.data))
      .catch((err) => console.log("Could not get"));
  }, []);

  if (array.length === 0) return null;
  return (
    <div key={2077} className="mb-3">
      {array.map((arr) => (
        <Box
          key={arr._id}
          width="300px"
          height={"200px"}
          borderRadius={10}
          justifyContent="center"
          backgroundColor="RGBA(0, 0, 0, 0.08)"
          margin={"10px"}
        >
          <h1 class="mb-1" key={arr._id}>
            {arr.title}
          </h1>
          <p key={arr._id}>{arr.description}</p>
          <div key={arr._id} class="text-muted mb-2">
            {arr.year + ""}
          </div>
          <HStack margin={"5px"}>
            <button
              className="btn btn-primary "
              key={arr._id}
              onClick={() => handleEditButtonClick(arr._id)}
            >
              Edit
            </button>
            <button
              key={arr._id}
              className="btn btn-outline-danger"
              onClick={() => handleDelete(arr._id)}
            >
              Delete
            </button>
          </HStack>
        </Box>
      ))}
    </div>
  );
};

export default ArticleTable;
