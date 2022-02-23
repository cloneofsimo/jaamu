import {
  Image,
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React from "react";

import { Notebook } from "../lib/types";

const BlogPostWithImage = ({
  notebook: { author, title, abstract, tag, name, image, createdDate },
  onclickfunc,
}: {
  notebook: Notebook;
  onclickfunc: () => void;
}) => {
  const imgfile =
    typeof image == "string"
      ? `/${image}`
      : "https://via.placeholder.com/400x300";

  //console.log(imgfile);
  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      maxH={"550px"}
      minH={"550px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box
        h={"210px"}
        bg={"gray.100"}
        mt={-6}
        mx={-6}
        mb={6}
        pos={"relative"}
        maxH={"210px"}
        minH={"210px"}
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
          height={"50px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
        >
          {title}
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
          <Text color={"gray.500"}>{createdDate}</Text>
        </Stack>
      </Stack>
      <Button onClick={onclickfunc}>Read more</Button>
    </Box>
  );
};

export default BlogPostWithImage;
