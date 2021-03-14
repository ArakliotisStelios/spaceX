import { Badge, Box, Text } from "@chakra-ui/core";
import Flex from "@chakra-ui/core/dist/Flex";
import { Link } from "react-router-dom";

import React from "react";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import { Trash2 } from "react-feather";
import { useLocalStorageHook } from "../utils/favorite-hook";

export default function FavoriteLaunchPadItem({ launchPad }) {
  const { deleteFavoriteHook } = useLocalStorageHook();

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Flex>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {launchPad.status === "active" ? (
              <Badge px="2" variant="solid" variantColor="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Retired
              </Badge>
            )}
            <Text
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launchPad.location.name}
            </Text>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launchPad.name}
          </Box>
          <Text color="gray.500" fontSize="sm">
            {launchPad.vehicles_launched.join(", ")}
          </Text>
        </Box>
      </Flex>
      <Flex px={"24px"} pb={"12px"}>
        <Box
          ml={"24px"}
          as={Link}
          to={`/launch-pads/${launchPad.site_id.toString()}`}
        >
          {"Go to pad details"}
        </Box>
        <PseudoBox
          ml={"24px"}
          as={Trash2}
          _hover={{
            background: "white",
            color: "teal.500",
            cursor: "pointer",
          }}
          onClick={() => deleteFavoriteHook(launchPad)}
        />
      </Flex>
    </Box>
  );
}
