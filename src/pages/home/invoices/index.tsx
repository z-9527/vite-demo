import { useEffect } from "react";
import * as services from "@/services/invoices";

export default function Invoices() {
  useEffect(() => {
    services
      .getData({ name: "test", age: 2 })
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((er) => {
        console.log("er: ", er);
      });
    // services.getData2({ name: "test", age: 2 }).then((res) => {
    //   console.log("res2: ", res);
    // });
    // services
    //   .getError()
    //   .then((res) => {
    //     console.log("res3: ", res);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   });
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
