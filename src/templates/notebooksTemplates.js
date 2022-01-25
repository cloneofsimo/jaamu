import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider, HStack, Stack } from "@chakra-ui/react";
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
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share'
const NotebookTemplate = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { htmlArgs, htmlContent, tocList } = pageContext;
  const color = useColorModeValue("black", "darkblue.800");

  //console.log(tocList)
  // window
  // here url


  const { author, tag, title, abstract } = htmlArgs;

  console.log(pageContext);
  return (
    <SimpleSidebar tocList={tocList}>
      <Header />

      <Button
        //marginRight = "1rem"
        //left="1rem"
        position="absolute"
        right="1rem"
        top="1rem"
        zIndex={1}
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

      <Container maxW="container.md">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <HStack p = '15px'>
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <LinkedinShareButton url={window.location.href} >
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>

        <RedditShareButton url={window.location.href} title={title} >
          <RedditIcon size={40} round={true} />
        </RedditShareButton>

        <WhatsappShareButton url={window.location.href} title={title}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        </HStack>
      </Container>


      <Footer />
    </SimpleSidebar>
  );
};

export default NotebookTemplate;
