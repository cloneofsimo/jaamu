import React, { useCallback, useEffect, useState } from "react";
import { Image, Box, Flex, Link } from "@chakra-ui/react";
import { Toc } from "../lib/types";

const TocComponent = ({
  tocList,
  depth,
}: {
  tocList: Toc[] | Toc | null;
  depth: number;
}) => {
  const [boldtext, setBoldtext] = useState(false);

  const yScrollEvent = useCallback(() => {
    const scroll = document
      .getElementById(tocList["link"]?.slice(1))
      ?.getBoundingClientRect();
    console.log(scroll);
    setBoldtext(scroll?.top <= 400);
  }, [tocList]);

  useEffect(() => {
    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, [yScrollEvent]);

  // if list, then recurse
  if (tocList instanceof Array) {
    return (
      <ul
        style={{
          listStyleType: "none",
          marginTop: "0.2rem",
          fontSize: `${1.1 - depth * 0.1}rem`,
        }}
      >
        {tocList.map((item) => (
          <TocComponent tocList={item} depth={depth + 1} />
        ))}
      </ul>
    );
  }

  // if empty or null, then return
  if (!tocList) return null;

  // if item, then return
  return (
    <li style={{ marginTop: "0.5rem" }}>
      <a
        href={tocList["link"]}
        className="toc-a"
        style={{ fontWeight: boldtext ? "bold" : "normal" }}
      >
        {tocList["name"]}
      </a>
    </li>
  );
};

export default function SimpleSidebar({ children, tocList }) {
  return (
    <Box minH="100vh">
      <Box
        display={{ base: "none", xl: "block" }}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Box>
            <Link href="/">
              <Image
                src={"/logo_corca03.png"}
                width="30%"
                height="30%"
                objectFit={"cover"}
                zIndex={-1000}
                marginTop="30px"
              />
            </Link>
          </Box>
        </Flex>
        {tocList ? <TocComponent tocList={tocList} depth={0} /> : null}
      </Box>
      <Box ml={{ base: 0 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
