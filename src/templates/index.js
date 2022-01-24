import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider } from "@chakra-ui/react";
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

const IndexTemplate = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { allNotebooks } = pageContext;
  const color = useColorModeValue("black", "gray.800");

  console.log(allNotebooks);
  return (
    <div>
      <SimpleSidebar>
      <Container size="full">
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
      <Container>
        <VStack spacing={4} align="center" justify="center">
          {allNotebooks.map((notebook) => (
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              width="xl"
              onClick={() => {
                navigate(notebook.htmlName + "/index.html?v=2", {
                  replace: true,
                });
              }}
              cursor={`pointer`}
            >
              <Heading fontSize="xl">{notebook.title}</Heading>
              <Text as="l">
                {" "}
                <div dangerouslySetInnerHTML={{ __html: notebook.abstract }} />
              </Text>
              <Text>Authors : {notebook.author}</Text>
              <Text>Topic : {notebook.tag}</Text>
              <Link to={notebook.htmlName}> Read More</Link>
            </Box>
          ))}
        </VStack>
      </Container>
      <Footer />
      </SimpleSidebar>
      
    </div>
  );
};

export default IndexTemplate;
