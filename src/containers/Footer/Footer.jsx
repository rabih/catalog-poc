import Button from "containers/Button/Button";
import "./Footer.css"

export const Footer = () => {
    return (
    <div className="Footer">
        <div className="Footer__powered">
            <p>Powered by Convictional</p>
        </div>
        <Button class="Footer__cta" text="Trade with us" />
    </div>
    )
};

export default Footer;