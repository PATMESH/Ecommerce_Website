import { Navbar } from "./Navbar";
import { Products } from "./Products";

export const Home = ({ user }) => {
  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Products />
    </div>
  );
};
