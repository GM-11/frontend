import React from "react";
import { ConnectButton } from "./web3/ConnectButton";
import Messages from "./web3/Messages";

function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-green-400 to-green-950 flex flex-col min-h-screen items-center text-white">
        <h1 className="text-4xl font-bold text-white">GloSoro Chat</h1>
        <p>Your global public anonymous chat</p>
        <br />
        <br />
        <ConnectButton />
        <div className="flex flex-col justify-center align-middle">
          {/* <TossContractInteractions />
          <StateButton />
          <GetStateButton /> */}

          <Messages />
        </div>
      </div>
    </>
  );
}

export default App;
