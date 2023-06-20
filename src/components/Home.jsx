import { React } from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { navigate } from "@reach/router";
import ArticleTable from "../components/ArticleTable";

const Home = () => {
  const handleClick = () => {
    navigate("/new");
    window.location.reload();
  };
  return (
    <div>
      <VStack>
        <Heading size="3xl">Blog Articles</Heading>
        <ArticleTable />
        <Button
          value={"New Article"}
          width={"100px"}
          colorScheme="green"
          marginTop={"15px"}
          onClick={handleClick}
        >
          New Article
        </Button>
      </VStack>
    </div>
  );
};

export default Home;
