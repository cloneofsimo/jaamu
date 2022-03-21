import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { SimpleGrid } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { navigate, PageProps } from "gatsby";
import { motion } from "framer-motion";

import {
  Container,
  useColorMode,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

import SimpleSidebar from "../components/navbar";
import BlogPostWithImage from "../components/blogcard";
import { Notebook } from "../lib/types";

type IndexTemplateContext = {
  allNotebooks: Notebook[];
};

const variants = {
  open: { opacity: 1, y: 0, zIndex: 100, display: "block" },
  closed: { opacity: 0, y: "400vh", zIndex: 100, display: "block" },
  vanished: { opacity: 0, y: "400vh", zIndex: 100, display: "none" },
};

const IndexTemplate = (props: PageProps<{}, IndexTemplateContext>) => {
  const [isOpen, setIsOpen] = useState("open");
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { allNotebooks } = pageContext;

  useEffect(() => {
    // after 1 second delay set isOpen to closed

    // another 1 second delay set isOpen to vanished

    const timer = setTimeout(() => {
      setIsOpen("closed");
    }, 1000);

    const timer2 = setTimeout(
      () => {
        setIsOpen("vanished");
      },

      2000
    );

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
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
        animate={isOpen === "open" ? "closed" : "open"}
        variants={variants}
        transition={{ duration: 1.0 }}
      >
        <SimpleSidebar tocList={null}>
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
                    notebook={notebook}
                    onclickfunc={() => {
                      setIsOpen("open");
                      // wait 1 second before navigating
                      setTimeout(() => {
                        navigate(notebook.name + ".html?v=2");
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
