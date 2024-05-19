"use client";

import React from "react";
import { SorobanReactProvider } from "@soroban-react/core";
import { testnet } from "@soroban-react/chains";
import { freighter } from "@soroban-react/freighter";
import type { ChainMetadata, Connector } from "@soroban-react/types";

// import deployments from "../../../contracts/hello_world/deployments.json";

const deployments = [
  {
    contractId: "dapp",
    networkPassphrase: "Test SDF Network ; September 2015",
    contractAddress: "CCQXEBL2BJMY6BPOBNA22QOY25XZFGA2KTSW2DUBOU7Q4EQWWGL4723C",
  },
];

const chains: ChainMetadata[] = [testnet];
const connectors: Connector[] = [freighter()];

export default function MySorobanReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SorobanReactProvider
      chains={chains}
      appName={"Tossing App"}
      activeChain={testnet}
      connectors={connectors}
      deployments={deployments}
    >
      {children}
    </SorobanReactProvider>
  );
}
