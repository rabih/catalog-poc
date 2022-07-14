import Button from "containers/Button/Button";
import "./Footer.css"

export const Footer = () => {

    // Send the button click to Convictional's login page
    const ctaAction = () => {
        window.open('app.convictional.com/login', '_blank').focus();
    }


    return (
    <div className="Footer">
        <div className="Footer__powered">
            <p className="powered-text">Powered by</p>
            <img className="powered-logo" src="https://mma.prnewswire.com/media/1632636/Convictional_Logo.jpg" />
        </div>
        <Button action={ctaAction} class="Footer__cta" text="Trade with us" />
    </div>
    )
};

export default Footer;