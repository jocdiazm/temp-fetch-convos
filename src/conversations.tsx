import React from "react";
import { API_URL } from "./constants";

async function fetchConversations() {
  try {
    const response = await fetch(`${API_URL}/stories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "remove",
        credentials: "include"
      }
    });

    if (response.ok) {
      console.log("request made", await response);
      return response.json();
    } else {
      return response.json();
    }
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export default function Conversations() {
  const [response, setResponse] = React.useState("");
  const [isLoading, setIsloading] = React.useState(false);
  const handleClick = async () => {
    setIsloading(true);
    const conversations = await fetchConversations();
    if (conversations) {
      setResponse(() => conversations);
    } else {
      setResponse("conversations empty? error in backend?");
    }
    setIsloading(false);
  };
  return (
    <div>
      <button onClick={handleClick}> Fetch conversations </button>
      <pre>
        <span>response:</span>
        {isLoading ? "cargando" : JSON.stringify(response)}
      </pre>
    </div>
  );
}
