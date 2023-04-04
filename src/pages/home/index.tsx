import { Link, Outlet } from "react-router-dom";
// import routes from "../routes";
// console.log('routes: ', routes);

export default function Home() {
  return (
    <div className="Home">
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="invoices">Invoices</Link> |{" "}
        <Link to="expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
