import React from "react";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Box, Heading, Text } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";

/**
 * 작업 3: 블록체인에서 읽기 - ETHBalance
 * 작업 3.1: 추가 ETHbalance.tsx(첫 번째 시도)
 */
export default function ETHBalance() {
  const [ethBalance, setEthBalance] = useState<number | undefined>(undefined);
  const { account, active, library, chainId } = useWeb3React<Web3Provider>();
  const provider = library;

  useEffect(() => {
    if (active && account) {
      provider?.getBalance(account).then((result) => {
        setEthBalance(Number(formatEther(result)));
      });
    }
  });

  return (
    <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
      <Heading my={4} fontSize="xl">
        ETH Balance
      </Heading>
      <div>
        {active ? (
          <Text fontSize="md" w="100%" my="2" align="left">
            ETH in account: {ethBalance?.toFixed(3)}{" "}
            {chainId === 31337 ? "Test" : " "} ETH
          </Text>
        ) : (
          <Text fontSize="md" w="100%" my="2" align="left">
            ETH in account:
          </Text>
        )}
      </div>
    </Box>
  );
}
