import BigLogo from "./bigLogosvg";
import "./footer.css";
import MessageCornerOpposite from "./messagesvg";
function Footer() {
    return (
        <div>
            <div className="line-contact-home"></div>
            <div className="contactUS-parent-home">
                <div className="contactUS-logo-home">
                    <BigLogo />
                </div>
                <div className="footer-message-box">
                    <div className="mat-footer">
                        <span className="rotate-footer">@MatDev</span>
                    </div>
                    <div className="contact-footer">Contact Us</div>
                    <div className="email1-footer">moeezramay1@gmail.com</div>
                    <div className="email1-footer">moeezmahmoodr@gmail.com</div>
                    <div className="email1-footer">moeezramay@gmail.com</div>
                </div>
                <div className="messagecorner-footer">
                    <MessageCornerOpposite />
                </div>
            </div>
        </div>
    );
}
export default Footer;
