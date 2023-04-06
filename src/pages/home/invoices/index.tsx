import { useEffect } from "react";

export default function Invoices() {
  useEffect(() => {
    fetch("/api/test?name=1&age=2")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("res: ", res);
      });
    fetch("/api/test2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ age: 1, name: "2" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("res: ", res);
      });
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
