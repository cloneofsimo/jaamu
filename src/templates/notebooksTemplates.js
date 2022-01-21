import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import ReactDOM from "react-dom";

import {
  useColorModeValue,
  Container,
  useColorMode,
  Button,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";

const NotebookTemplate = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { htmlArgs, htmlContent } = pageContext;
  const color = useColorModeValue("black", "gray.800");

  const {author, tag, title, abstract} = htmlArgs;

  console.log(pageContext);
  return (
    
      <div>
        <h1>Hi!</h1>
        <Button
          position="fixed"
          right="1rem"
          top="1rem"
          onClick={toggleColorMode}
        >
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        <Header />
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>{tag}</h3>
        <p>{abstract}</p>
        
        <Container>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Container>

        <Footer />
      </div>
    
  );
};

export default NotebookTemplate;
