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
} from '@chakra-ui/react';
import React from "react";
const BlogPostWithImage = ({ author, title, abstract, link, tag }) => {
    return (

        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Box
                h={'210px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}
                maxH={'210px'}
            >

                <Image
                    src={
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                    width="100%"
                    height="100%"
                    objectFit={"cover"}
                />
            </Box>
            <Stack>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}>
                    {tag}
                </Text>
                <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {title.slice(0, 30) + (title.length > 30 ? '...' : '')}
                </Heading>
                <Text color={'gray.500'} height = {'60px'}>
                    {abstract.slice(0, 100) + (abstract.length > 100 ? '...' : '')}
                </Text>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                {/* <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          /> */}
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{author}</Text>
                    <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                </Stack>
            </Stack>
            <Link to={link}> Read More</Link>

        </Box>

    );
}

export default BlogPostWithImage;