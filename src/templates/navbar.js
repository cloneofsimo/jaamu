import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Image,
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import { ReactText } from "react";

const Toc = ({ tocList, depth }) => {
  const [boldtext, setBoldtext] = useState(false);

  useEffect(() => {

    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, []);

  const yScrollEvent = () => {
    const scroll = document.getElementById(tocList["link"]?.slice(1))?.getBoundingClientRect();
    console.log(scroll);
    setBoldtext(scroll?.top <= 400);
  };

  // if list, then recurse
  //console.log(tocList)
  if ({}.toString.call(tocList) === "[object Array]") {
    return (
      <ul
        style={{
          listStyleType: "none",
          marginTop: "0.2rem",
          fontSize: `${1.1 - depth * 0.1}rem`,
        }}
      >
        {tocList.map((item) => Toc({ tocList: item, depth: depth + 1 }))}
      </ul>
    );
  }

  // if empty or null, then return
  if (!tocList) return null;

  // if item, then return
  return (
    <li style={{ marginTop: "0.5rem" }}>
      <a href={tocList["link"]} className="toc-a" style={{ fontWeight: boldtext ? "bold" : "normal" }}>
        {tocList["name"]}
      </a>
    </li>
  );
};
export default function SimpleSidebar({ children, tocList }) {

  return (
    <Box minH="100vh">
      <TocContent tocList={tocList} />
      <Box ml={{ base: 0 }} p="4">
        {children}
      </Box>
    </Box>
  );
}



const TocContent = ({ tocList, ...rest }) => {
  return (
    <Box
      display={{ base: "none", xl: "block" }}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box>
          <Image
            src={
              "/logo_corca03.png"
            }
            width="30%"
            height="30%"
            objectFit={"cover"}
            zIndex={-1000}
            marginTop="30px"
          />
        </Box>
      
      </Flex>
      {tocList ? <Toc tocList={tocList} /> : null}
    </Box>
  );
};
