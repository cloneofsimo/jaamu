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

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "-140%" },
};

const variantsRight = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "140%", overflow: "hidden" },
};

const IndexTemplate = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { allNotebooks } = pageContext;

  console.log(allNotebooks);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 1.0 }}
      >
        {/* blue background */}
        <div
          style={{
            backgroundColor: "blue",
            height: isOpen ? "400vh" : "100vh",
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
        animate={isOpen ? "closed" : "open"}
        variants={variantsRight}
        transition={{ duration: 1.0 }}
      >
        <SimpleSidebar>
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
              <Heading as="h1">Welcome To JaaMu!</Heading>
              <Text maxWidth="45ch" textAlign="center">
                Have your <strong>ipynb</strong> research documented right here!
              </Text>
              <Text>
                Go Visit{" "}
                <strong>
                  <Link to="/notes/introa">The tutorial</Link>
                </strong>{" "}
                to see how to upload your notebooks.
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
                    onclickfunc={() => {
                      setIsOpen(true);
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
