"use client";
import { useRegisteredContract } from "@soroban-react/contracts";
import React, { useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";

function Messages() {
  const [messages, setMessage] = useState<string[]>([]);
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false);
  const [currMessage, setCurrMessage] = useState("");
  const contract = useRegisteredContract("toss");

  async function getMessages() {
    try {
      setFetchIsLoading(true);
      const result = await contract?.invoke({
        method: "get_message",
        signAndSend: true,
        //   args: [],
      });

      if (result) {
        const result_val = StellarSdk.scValToNative(
          result.returnValue as StellarSdk.xdr.ScVal
        );
        console.log("Result from contract invocation", result_val);
        console.log(result_val);
        setMessage(result_val as string[]);
      } else {
        console.log("No result from contract invocation");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetchIsLoading(false);
    }
  }

  async function sendMessage() {
    try {
      const result = await contract?.invoke({
        method: "add_message",
        args: [StellarSdk.xdr.ScVal.scvString(currMessage)],
        signAndSend: true,
      });

      if (result) {
        const result_val = StellarSdk.scValToNative(
          result.returnValue as StellarSdk.xdr.ScVal
        ) as string;
        console.log("Result from contract invocation", result_val);
        console.log(result_val);
      } else {
        console.log("No result from contract invocation");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetchIsLoading(false);

      getMessages();
    }
  }

  return (
    <>
      <div className="w-full">
        {messages.length === 0 ? (
          <>
            <button onClick={getMessages}>GET MESSAGES</button>
          </>
        ) : (
          <div className="w-full">
            {fetchIsLoading ? (
              <>
                <h1>LOADING</h1>
              </>
            ) : (
              <div className="w-full">
                {messages.map((val) => (
                  <>
                    <p className="w-full bg-green-200 m-2 text-black">{val}</p>
                  </>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute w-full left-0 bottom-0">
        <input
          onChange={(e) => setCurrMessage(e.target.value)}
          placeholder="Enter your message"
          className=" w-full border-2 border-black  text-black left-0 bottom-0"
          type="text"
        />
        <br />
        <button onClick={sendMessage} className="bg-blue-500 p-3 rounded-full">
          Submit
        </button>
      </div>{" "}
    </>
  );
}

export default Messages;
