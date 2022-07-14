import useAuthMe from "hooks/useAuthMe";
import logo from "images/go-coconut.jpg";
import "./Header.css";

export const Header = () => {
    const { company, isLoading } = useAuthMe();
    if (isLoading) {
        return <h1>Company Loading</h1>
    }
    return (
    <div className="Header">
        <div className="Header__logo">
            <img src={logo} alt="go coconut logo" />
        </div>
        <div className="Header__title">
            <h2>Summer Catalog 2022</h2>
        </div>
    </div>
    )
    };

export default Header;