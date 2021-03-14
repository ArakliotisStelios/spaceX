import React, { useContext } from "react";
import useDisclosure from "@chakra-ui/core/dist/useDisclosure";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/core";
import Text from "@chakra-ui/core/dist/Text";
import Box from "@chakra-ui/core/dist/Box";
import { Star } from "react-feather";
import FavoriteLaunchPadItem from "./favorite-launch-pad-item";
import FavoriteLaunchItem from "./favorite-launch-item";
import { FavoritesContext } from "./context";

export default function DrawerFavorites() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [favorites] = useContext(FavoritesContext);

  const btnRef = React.useRef();

  return (
    <>
      <PseudoBox
        d={"flex"}
        _hover={{
          color: "teal.500",
          cursor: "pointer",
        }}
        ref={btnRef}
        onClick={onOpen}
      >
        <Box as={Star} />
        <Text ml="8px">Your Favorites</Text>
      </PseudoBox>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your favorites</DrawerHeader>

            <DrawerBody overflowY={"scroll"}>
              <Text m={"8px"} fontWeight={"bold"} textAlign={"center"}>
                {`LAUNCHES (${
                  favorites.filter((favorite) => favorite.category === "launch")
                    .length
                })`}
              </Text>
              {favorites
                .filter((favorite) => favorite.category === "launch")
                .map((favorite) => (
                  <Box key={favorite.flight_number} mb="16px">
                    <FavoriteLaunchItem launch={favorite} />
                  </Box>
                ))}
              <Text m={"8px"} fontWeight={"bold"} textAlign={"center"}>
                {`LAUNCHPADS (${
                  favorites.filter(
                    (favorite) => favorite.category === "launchPad"
                  ).length
                })`}
              </Text>
              {favorites
                .filter((favorite) => favorite.category === "launchPad")
                .map((favorite) => (
                  <Box key={favorite.site_id} mb="16px">
                    <FavoriteLaunchPadItem launchPad={favorite} />
                  </Box>
                ))}
            </DrawerBody>

            <DrawerFooter />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
