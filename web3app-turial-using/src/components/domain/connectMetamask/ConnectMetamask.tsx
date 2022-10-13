import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Box, Button, Text } from "@chakra-ui/react";
import { injected } from "utils/connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { formatAddress } from "utils/helpers";
import { useEffect } from "react";

export default function ConnectMetamask() {
  const {
    chainId,
    account,
    activate,
    deactivate,
    setError,
    active,
    library,
    connector,
  } = useWeb3React<Web3Provider>();

  useEffect(() => {
    console.log(chainId, account, account, library, connector);
  });

  function handleClickConnect() {
    activate(
      injected,
      (error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log("user refused");
        } else {
          setError(error);
        }
      },
      false
    );
  }

  function handleClickDisconnect() {
    deactivate();
  }

  return (
    <div>
      {active && typeof account === "string" ? (
        <Box>
          <Button
            type="button"
            w="100%"
            onClick={() => handleClickDisconnect()}
          >
            Account: {formatAddress(account, 4)}
          </Button>
          <Text fontSize="sm" w="100%" my="2" align="center">
            ChainID : {chainId} connected
          </Text>
        </Box>
      ) : (
        <Box>
          <Button type="button" w="100%" onClick={() => handleClickConnect()}>
            Connect MetaMask
          </Button>
          <Text fontSize="sm" w="100%" my="2" align="center">
            {" "}
            not connected{" "}
          </Text>
        </Box>
      )}
    </div>
  );
}
