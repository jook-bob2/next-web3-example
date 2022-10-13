import ConnectMetamask from "components/domain/connectMetamask/ConnectMetamask";
import ETHBalance from "components/domain/ethBanlance/ETHBalance";
import ETHBalanceSWR from "components/domain/ethBanlance/swr/ETHBalanceSWR";
import ReadERC20 from "components/domain/readERC20/ReadERC20";
import TransferERC20 from "components/domain/transferERC20/TransferERC20";
import { addressContract } from "constants/addressConstant";
import React from "react";

export default function HomeContainer() {
  return (
    <section className="App">
      <ConnectMetamask />
      <ETHBalance />
      <ETHBalanceSWR />
      <ReadERC20 addressContract={addressContract} />
      <TransferERC20 addressContract={addressContract} />
    </section>
  );
}
