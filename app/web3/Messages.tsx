"use client";

import { useRegisteredContract } from "@soroban-react/contracts";
import React, { useEffect, useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { useSorobanReact } from "@soroban-react/core";

function Messages() {
  const [messages, setMessage] = useState<any[]>([]);
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false);
  const [currMessage, setCurrMessage] = useState("");
  const contract = useRegisteredContract("dapp");
  const sorobanContext = useSorobanReact();

  async function getMessages() {
    try {
      setFetchIsLoading(true);
      const result = (await contract?.invoke({
        method: "get_message",
        // signAndSend: true,
        args: [],
      })) as any;

      if (result) {
        setMessage(result.value());
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
          /// @ts-ignore
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

  if (sorobanContext.address)
    return (
      <>
        <div className="flex flex-col justify-center align-middle  border-2 w-[95vw] p-2 border-red-100">
          <div className=" m-2">
            {messages.length === 0 ? (
              <button
                className="bg-white p-2 rounded-full text-black align-middle"
                onClick={getMessages}
              >
                GET MESSAGES
              </button>
            ) : (
              <div className="w-full">
                {fetchIsLoading ? (
                  <>
                    <h1>LOADING</h1>
                  </>
                ) : (
                  <div className="w-full h-auto">
                    {messages.map((val) => {
                      const index = messages.indexOf(val);

                      const value = val.value();

                      const content = new TextDecoder().decode(value);
                      return (
                        <div
                          key={index}
                          className="w-full px-5 bg-green-900 m-2 text-center rounded-lg py-5"
                        >
                          <p className="  font-bold text-2xl">{content}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>{" "}
        {messages.length !== 0 && (
          <>
            <div className="w-full sticky bottom-0 left-0 flex">
              <input
                onChange={(e) => setCurrMessage(e.target.value)}
                placeholder="Enter your message"
                className=" w-full border-2 border-black rounded-lg mr  text-black "
                type="text"
              />
              <br />
              <button
                onClick={sendMessage}
                className="bg-blue-500 p-3 rounded-lg w-80"
              >
                Submit
              </button>
            </div>{" "}
          </>
        )}
      </>
    );
}

export default Messages;
