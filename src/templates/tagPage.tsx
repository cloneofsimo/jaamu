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

type TagPageContext = {
  tagNotebooks: Notebook[];
  tag: string;
};


const TagPage = (props: PageProps<{}, TagPageContext>) => {

  const { pageContext } = props;
  const { tagNotebooks, tag } = pageContext;


  return (
    <div>

      <SimpleSidebar tocList={null}>

        <Container size="xl">

          <Heading as="h1">{tag.toUpperCase()}</Heading>

        </Container>
        <Container size="xl">
          <SimpleGrid
            minChildWidth="300px"
            spacing="10px"
            maxWidth={"3000px"}
          >
            {tagNotebooks.map((notebook) => (
              <div>
                <BlogPostWithImage
                  notebook={notebook}
                  onclickfunc={() => {

                    navigate(notebook.name + ".html?v=2");

                  }}
                />
              </div>
            ))}
          </SimpleGrid>
        </Container>
        <Footer />
      </SimpleSidebar>

    </div>
  );
};

export default TagPage;
