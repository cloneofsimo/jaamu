import React from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const katex_foot = String.raw`
<script>renderMathInElement(document.body, {
  delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
    ],
  strict : "ignore",
  });
</script>
`;
const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box>

      <Container maxW={'6xl'} py={4} >
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 3, md: 30 }} justifyContent={'end'}>
          <Link href={'https://www.corca.ai'} textAlign='center'>About us</Link>
          <Link href={'/'} textAlign='center'>Blog</Link>
          <Link href={'https://corcaai.notion.site/eae092202e7b45da87399601c77d31cc?v=9a0ddb7a0a1b4c66b624c3ffe1920c7d'} textAlign='center'>Careers</Link>
          <Link href={'mailto: contact@corca.ai'} textAlign='center'>Contact</Link>
        </Stack>
      </Container>
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© 2022 Corca. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Github'} href={'https://github.com/corca-ai'}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/company/corca-ai'}>
              <FaLinkedin />
            </SocialButton>
            {/* <SocialButton label={'Instagram'} href={'https://www.instagram.com/explore/tags/corca-ai'}>
              <FaInstagram />
            </SocialButton> */}
          </Stack>
        </Container>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: katex_foot }} />
    </Box>
  );
}