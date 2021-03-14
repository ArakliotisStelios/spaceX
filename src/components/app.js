import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import DrawerFavorites from "./drawer-favorites";
import { FavoriteProvider } from "./context";
import { getFavorites } from "../utils/local-storage-util";
import { oktaAuthConfig } from "../auth/config";
import {
  Security,
  SecureRoute,
  LoginCallback,
  useOktaAuth,
} from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth(oktaAuthConfig);

export default function App() {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };
  const [favorites, setFavorites] = useState(getFavorites());

  return (
    <FavoriteProvider value={[favorites, setFavorites]}>
      <div>
        <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <SecureRoute path="/launches" exact component={Launches} />
            <SecureRoute path="/launches/:launchId" component={Launch} />
            <SecureRoute path="/launch-pads" exact component={LaunchPads} />
            <SecureRoute
              path="/launch-pads/:launchPadId"
              component={LaunchPad}
            />
            <Route path="/login/callback" component={LoginCallback} />
          </Switch>
        </Security>
      </div>
    </FavoriteProvider>
  );
}

function NavBar() {
  const { oktaAuth, authState } = useOktaAuth();

  if (authState.isPending) return null;

  const logout = async () => oktaAuth.signOut();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
      {authState.isAuthenticated && (
        <>
          <DrawerFavorites />
          <button onClick={logout}>Logout</button>
        </>
      )}
    </Flex>
  );
}
