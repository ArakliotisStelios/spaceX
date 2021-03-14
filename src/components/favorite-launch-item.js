import { Badge, Box, Image, Text } from "@chakra-ui/core";
import React from "react";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import { Trash2 } from "react-feather";
import Flex from "@chakra-ui/core/dist/Flex";
import { Link } from "react-router-dom";
import { useLocalStorageHook } from "../utils/favorite-hook";

export default function FavoriteLaunchItem({ launch }) {
  const { deleteFavoriteHook } = useLocalStorageHook();

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height="100px"
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Text
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        textAlign="center"
      >
        {launch.mission_name}
      </Text>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" variantColor="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>
      </Box>

      <Flex px={"24px"} pb={"12px"}>
        <Box
          ml={"24px"}
          as={Link}
          to={`/launches/${launch.flight_number.toString()}`}
        >
          {"Go to launch details"}
        </Box>
        <PseudoBox
          ml={"24px"}
          as={Trash2}
          _hover={{
            background: "white",
            color: "teal.500",
            cursor: "pointer",
          }}
          onClick={() => deleteFavoriteHook(launch)}
        />
      </Flex>
    </Box>
  );
}
