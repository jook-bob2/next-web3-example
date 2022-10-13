import React from "react";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Box, Heading, Text } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";

const fetcher =
  (library: any) =>
  (...args: any) => {
    const [method, ...params] = args;
    return library[method](...params);
  };

/**
 * 작업 3: 블록체인에서 읽기 - ETHBalance
 * 작업 3.2: 추가 ETHBalanceSWR.tsx(두 번째 시도)
 */
export default function ETHBalanceSWR() {
  const { account, active, library, chainId } = useWeb3React<Web3Provider>();

  const { data: balance, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  console.log("ETHBalanceSWR", balance);

  useEffect(() => {
    if (!library) return;

    console.log("listening for blocks...");

    library.on("block", () => {
      console.log("update balance...");
      mutate(undefined, true);
    });

    return () => {
      library.removeAllListeners("block");
    };
  }, [library]);

  return (
    <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
      <Heading my={4} fontSize="xl">
        ETH Balance <b>using SWR</b>
      </Heading>

      <div>
        {active && balance ? (
          <Text fontSize="md" w="100%" my="2" align="left">
            ETH in account: {parseFloat(formatEther(balance)).toFixed(3)}{" "}
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
