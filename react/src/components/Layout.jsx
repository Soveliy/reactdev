import { NavLink, Outlet } from "react-router";
function Layout() {
  return (
    <div className="site">
      <header className="header">
        <div className="container">Шапка</div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">Футер</footer>
    </div>
  );
}
export default Layout;
