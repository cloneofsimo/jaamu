import { Link } from "gatsby";
import {
  Image,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { getImage, StaticImage } from "gatsby-plugin-image";
const BlogPostWithImage = ({
  author,
  title,
  abstract,
  link,
  tag,
  onclickfunc,
  image,
}) => {
  console.log(image);

  const imgfile =
    typeof image == "string"
      ? `/${image}`
      : "https://via.placeholder.com/400x300";

  console.log(imgfile);
  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      <Box
        h={"210px"}
        bg={"gray.100"}
        mt={-6}
        mx={-6}
        mb={6}
        pos={"relative"}
        maxH={"210px"}
      >
        <Image
          src={
            // if iamge is not none, then use image
            imgfile

            //`../images/${image}`
          }
          width="100%"
          height="100%"
          objectFit={"cover"}
          zIndex={-1000}
        />
      </Box>
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
        >
          {tag}
        </Text>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          {title.slice(0, 30) + (title.length > 30 ? "..." : "")}
        </Heading>
        <Text color={"gray.500"} height={"60px"}>
          {abstract.slice(0, 100) + (abstract.length > 100 ? "..." : "")}
        </Text>
      </Stack>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        {/* <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          /> */}
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>{author}</Text>
          <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
        </Stack>
      </Stack>
      <Button onClick={onclickfunc}>Read more</Button>
    </Box>
  );
};

export default BlogPostWithImage;
