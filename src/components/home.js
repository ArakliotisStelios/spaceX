import React from "react";
import { Flex, Box, Text, Stack, Link } from "@chakra-ui/core";
import { ArrowRight } from "react-feather";
import { Link as BrowserLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Login from "../auth/Login";
import { oktaSignInConfig } from "../auth/config";

const Home = () => {
  const { authState } = useOktaAuth();

  if (authState.isAuthenticated) {
    return (
      <Stack m="6" spacing="6">
        <PageLink url="/launches">Browse SpaceX Launches</PageLink>
        <PageLink url="/launch-pads">Browse SpaceX Launch Pads</PageLink>
      </Stack>
    );
  } else {
    return <Login config={oktaSignInConfig} />;
  }
};

export default Home;

function PageLink({ url, children, ...rest }) {
  return (
    <Link as={BrowserLink} to={url} {...rest}>
      <Flex
        justifyContent="space-between"
        p="6"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
      >
        <Text fontSize="lg">{children}</Text>
        <Box as={ArrowRight} />
      </Flex>
    </Link>
  );
}
