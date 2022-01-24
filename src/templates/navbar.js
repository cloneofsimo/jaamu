import React, { ReactNode } from 'react';
import {
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
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

const Toc = ({ tocList, depth }) => {

    // if list, then recurse
    //console.log(tocList)
    if ({}.toString.call(tocList) === '[object Array]') {
        return (
            <ul style={{ listStyleType: "none", marginTop: '0.2rem', fontSize: `${1.1 - depth * 0.1}rem` }}>
                {tocList.map((item) => (
                    Toc({ tocList: item, depth: depth + 1 })
                ))}
            </ul>
        );
    }

    // if empty or null, then return
    if (!tocList)
        return null;


    // if item, then return
    return (
        <li style={{ marginTop: '0.5rem' }}>
            <a href={tocList['link']} className="toc-a">{tocList['name']}</a>
        </li>
    );
};
export default function SimpleSidebar({ children, tocList }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                tocList={tocList}
                className="navbar"
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>

            </Drawer>

            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>

        </Box>
    );
}
const LinkItems = [
    { name: 'Home', icon: FiHome },
    //{ name: 'Blog Posts', icon: FiTrendingUp },
    { name: 'Blog Posts', icon: FiCompass },
    { name: 'Follow', icon: FiStar },
    //{ name: 'Settings', icon: FiSettings },
];


const SidebarContent = ({ onClose, tocList, ...rest }) => {
    return (
        <Box

            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"

            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                {/* logo */}
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    JaaMu
                </Text>
                <CloseButton display={{ base: 'flex' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} className="navitem">
                    {link.name}
                </NavItem>
            ))}
            <Toc tocList={tocList} depth={0} />
        </Box>
    );
};


const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                marginTop="0.5rem"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};


const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};