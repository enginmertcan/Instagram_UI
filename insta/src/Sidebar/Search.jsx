import React, { useRef } from 'react';
import { Tooltip, useDisclosure } from '@chakra-ui/react';
import { Flex, Box, Button,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,FormControl, FormLabel } from '@chakra-ui/react';
import { SearchLogo } from '../assets/constants';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';
import useSearchUser from '../hooks/useSearchUser';

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
    const { user, isLoading, getUserProfile,setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  return (
    <>
      <Tooltip 
      hasArrow 
      label={"Search"}
       placement='right'
        ml={1} openDelay={500} 
        display={{base:"block",md:"none"}}> 

        <Flex alignItems={"center"} 
        gap={4} _hover={{ bg: "whiteAlpha.400" }} 
        borderRadius={6} p={2} w={{ base: 10, md: "full" }} 
        justifyContent={{ base: "center", md: "flex-start" }}
         onClick={onOpen}>
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }} >Search</Box> 

        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <input placeholder='Search User' ref={searchRef} />
              </FormControl>
              <Flex w={"full"} justifyContent={"flex-end"} >
              <Button type='submit' ml={"auto"} size={"sm"} isLoading={isLoading}>Search</Button>
              </Flex>
            </form>
            {/* burası ekrana sorguyu yazdırıyor */}
            { user && <SuggestedUser user={user}  setUser={setUser}/>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default Search;