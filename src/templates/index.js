import React from "react";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import ReactDOM from "react-dom";


import {
    useColorModeValue,
    Container,
    useColorMode,
    Button,
    Heading,
    Text,
    Divider,
} from "@chakra-ui/react";

const IndexTemplate = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const { pageContext } = props;
    const { allNotebooks } = pageContext;
    const color = useColorModeValue("black", "gray.800");

    console.log(allNotebooks);
    return (

        <div>
            <h1>Hi!</h1>
            {allNotebooks.map((notebook) => (

                <div>
                    <h1>Title: {notebook.title}</h1>
                    <h2>Author: {notebook.author}</h2>
                    <h3>Tags: {notebook.tag}</h3>
                    <p>Abstract: {notebook.abstract}</p>
                </div>
            ))}
        </div>

    );
};

export default IndexTemplate;
