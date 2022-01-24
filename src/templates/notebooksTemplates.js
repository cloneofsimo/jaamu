import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { theme } from "../theme";
import ReactDOM from "react-dom";

import { Link } from "gatsby";


import {
  useColorModeValue,
  Container,
  useColorMode,
  Button,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import SimpleSidebar from "./navbar";










const NotebookTemplate = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { htmlArgs, htmlContent, tocList } = pageContext;
  const color = useColorModeValue("black", "darkblue.800");

  //console.log(tocList)

  const { author, tag, title, abstract } = htmlArgs;

  console.log(pageContext);
  return (
    <SimpleSidebar tocList = {tocList}>
      <Header />
      
      <Button
        position="fixed"
        right="1rem"
        top="1rem"
        zIndex={100}
        onClick={toggleColorMode}
      >
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>

      <Stack
        align="center"
        spacing="5"
        py="10"
        marginTop="3em"
        marginLeft="0.5em"
      >
        <Heading as="h1">{title}</Heading>
        <Text maxWidth="45ch" textAlign="left">
          Written by <strong>{author} </strong>
        </Text>
        <Text maxWidth="45ch" textAlign="left">
          <strong>Topic</strong> {tag}
        </Text>
        <Text maxWidth="45ch" textAlign="left">
          <div dangerouslySetInnerHTML={{ __html: abstract }} />
        </Text>
      </Stack>

      <Container maxW="container.xl">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Container>

      <Footer />
      </SimpleSidebar>
  );
};

export default NotebookTemplate;
