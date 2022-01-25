import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider, SimpleGrid } from "@chakra-ui/react";
import { theme } from "../theme";
import ReactDOM from "react-dom";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Link } from "gatsby";
import { navigate } from "gatsby";

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

const IndexTemplate = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { allNotebooks } = pageContext;

  console.log(allNotebooks);
  return (
    
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
        <Container size = 'xl'>
          <SimpleGrid minChildWidth='300px' spacing="10px" maxWidth={'1500px'}>
            {allNotebooks.map((notebook) => (
              // <Box
              //   p={5}
              //   shadow="md"
              //   borderWidth="1px"
              //   width="xl"
              //   onClick={() => {
              //     navigate(notebook.htmlName + "/index.html?v=2", {
              //       replace: true,
              //     });
              //   }}
              //   cursor={`pointer`}
              // >
              //   <Heading fontSize="xl">{notebook.title}</Heading>
              //   <Text as="l">
              //     {" "}
              //     <div dangerouslySetInnerHTML={{ __html: notebook.abstract }} />
              //   </Text>
              //   <Text>Authors : {notebook.author}</Text>
              //   <Text>Topic : {notebook.tag}</Text>
              //   <Link to={notebook.htmlName}> Read More</Link>
              // </Box>

              <BlogPostWithImage author={notebook.author} title={notebook.title} abstract={notebook.abstract} tag={notebook.tag} link={notebook.htmlName} />
            ))}
          </SimpleGrid>
        </Container>
        <Footer />
      </SimpleSidebar>

  );
};

export default IndexTemplate;
