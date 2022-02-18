import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider, HStack, Stack } from "@chakra-ui/react";
import { theme } from "../theme";
import ReactDOM from "react-dom";

import { Link, navigate } from "gatsby";

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
  RedditIcon,
} from "react-share";

import { motion } from "framer-motion";

const DARKDARKBLUE = "#060922";
export {DARKDARKBLUE};

const variants = {
  open: { opacity: 1, y: 0, zIndex: 100 },
  closed: { opacity: 0, y: "100vh", zIndex: 100 },
};

const NotebookTemplate = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { path, htmlArgs, htmlContent, tocList } = pageContext;
  const color = useColorModeValue("black", "darkblue.800");

  //console.log(tocList)
  // window
  // here url

  const { author, tag, title, abstract } = htmlArgs;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      console.log()
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log(pageContext);
  return (
    <div>
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        zIndex={100}
        transition={{ duration: 1.0 }}
      >
        {/* blue background */}
        <div
          style={{
            backgroundColor: DARKDARKBLUE,
            height: "100vh",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            opacity: 1.0,
          }}
        />
      </motion.nav>
      <SimpleSidebar tocList={tocList}>
        <Header />

        <Button
          //marginRight = "1rem"
          //left="1rem"
          position="absolute"
          right="1rem"
          top="1rem"
          zIndex={1}
          onClick={() => {
            toggleColorMode();
          }}
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
          <Text fontSize="md" color="gray.500" marginTop={"30px"}>
            Did you love this post? Share it with your friends!
          </Text>
          <HStack p="15px">
            <FacebookShareButton url={path}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            {/* <LinkedinShareButton url={path}>
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton> */}

            <RedditShareButton url={path} title={title}>
              <RedditIcon size={40} round={true} />
            </RedditShareButton>

            <WhatsappShareButton url={path} title={title}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          </HStack>
        </Container>

        <Footer />
      </SimpleSidebar>
    </div>
  );
};

export default NotebookTemplate;
