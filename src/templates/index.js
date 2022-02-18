import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider, SimpleGrid } from "@chakra-ui/react";
import { theme } from "../theme";
import ReactDOM from "react-dom";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Link } from "gatsby";
import { navigate } from "gatsby";
import { motion } from "framer-motion";

import {
  useMultiStyleConfig,
  useColorModeValue,
  Container,
  useColorMode,
  Button,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";

import SimpleSidebar from "./navbar";
import BlogPostWithImage from "./blogcard";
import DARKDARKBLUE from "./notebooksTemplates";

const variants = {
  open: { opacity: 1, y: 0, zIndex: 100, display: "block"},
  closed: { opacity: 0, y: "400vh", zIndex: 100, display: "block"},
  vanished: { opacity: 0, y: "400vh", zIndex: 100, display: "none"},
};


const IndexTemplate = (props) => {
  const [isOpen, setIsOpen] = useState("open");
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { allNotebooks } = pageContext;

  //console.log(allNotebooks);

  useEffect(() => {

    // after 1 second delay set isOpen to closed

    // another 1 second delay set isOpen to vanished


    const timer = setTimeout(() => {
      setIsOpen("closed");
    }
    , 1000);

    const timer2 = setTimeout(() => {
      setIsOpen("vanished");
    }

    , 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    }

    
  }, []);

  return (
    <div>
      <motion.nav
        animate={isOpen}
        variants={variants}
        transition={{ duration: 1.0 }}
      >
        {/* blue background */}
        <div
          style={{
            backgroundColor: "#060922",
            //height: isOpen ? "100vh" : "100vh",
            height: "400vh",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            opacity: 1.0,
          }}
        />
      </motion.nav>
      <motion.nav
        animate={isOpen == "open" ? "closed" : "open"}
        variants={variants}
        transition={{ duration: 1.0 }}
      >
        <SimpleSidebar tocList = {null}>
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
          <Container size="xl">
            <Stack align="center" spacing="5" py="10">
              <Heading as="h1">Corca Tech Blog</Heading>
              <Text maxWidth="45ch" textAlign="center">
                Until nobody is marginalized from the technology.
              </Text>
              
            </Stack>
          </Container>
          <Container size="xl">
            <SimpleGrid
              minChildWidth="300px"
              spacing="10px"
              maxWidth={"1500px"}
              
            >
              {allNotebooks.map((notebook) => (
                <div>
                  <BlogPostWithImage
                    author={notebook.author}
                    title={notebook.title}
                    abstract={notebook.abstract}
                    tag={notebook.tag}
                    link={notebook.htmlName}
                    image = {notebook.image}
                    onclickfunc={() => {
                      setIsOpen("open");
                      // wait 1 second before navigating
                      setTimeout(() => {
                        navigate(notebook.htmlName + "/index.html?v=2");
                      }, 1000);
                    }}
                  />
                </div>
              ))}
            </SimpleGrid>
          </Container>
          <Footer />
        </SimpleSidebar>
      </motion.nav>
    </div>
  );
};

export default IndexTemplate;
