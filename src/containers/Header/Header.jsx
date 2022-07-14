import useAuthMe from "hooks/useAuthMe";
import "./Header.css";

export const Header = () => {
    const { company, isLoading } = useAuthMe();
    if (isLoading) {
        return <h1>Company Loading</h1>
    }
    return (
    <div className="Header">
        <div className="Header__logo">
            <h1>Logo</h1>
        </div>
        <div className="Header__title">
            <h2>{company?.name}</h2>
        </div>
    </div>
    )
    };

export default Header;