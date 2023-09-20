import React, { FormEvent } from "react";
import { API_URL } from "./constants";

export type Credentials = {
  username: string;
  password: string;
  scope?: string | null;
  client_id?: string | null;
  client_secret?: string | null;
  grant_type?: string | null;
};

async function loginUser(credentials: Credentials) {
  const body = {
    client_id: "",
    client_secret: "",
    grant_type: "",
    ...credentials
  };
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(body)) {
    data.set(key, value ?? "");
  }
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "remove"
      },
      body: data
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [response, setResponse] = React.useState("");

  const [isLoading, setIsloading] = React.useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    if (!email || !password) return console.log("no email, or password");
    const responseJSON = await loginUser({
      username: email,
      password: password
    });
    if (responseJSON) {
      setResponse(responseJSON);
    } else {
      setResponse("");
    }
    setIsloading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="pass"
        />
        <button> Login </button>
      </form>
      <pre>
        <span>response:</span>
        {isLoading ? "Cargando" : JSON.stringify(response)}
      </pre>
    </div>
  );
}
