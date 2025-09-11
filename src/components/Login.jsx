import { FaFacebookSquare } from "react-icons/fa";
import "../styles/login.css";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "360px", width: "100%" }}>
                {/* Instagram Logo */}
                <h1 className="text-center mb-4 instagram-logo">Instagram</h1>

                {/* Input Fields */}
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-control mb-2"
                        
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control mb-2"
                    />

                    <div className="text-end mb-2">
                        <a href="#" className="small text-primary">Forgot password?</a>
                    </div>

                    <button className="btn btn-primary w-100 mb-3">Log in</button>

                    <div className="text-center text-muted mb-3">OR</div>

                    <button type="button" className="btn btn-outline-primary w-100 mb-2 d-flex justify-content-center align-items-center gap-2">
                        <FaFacebookSquare size={18} /> Log in with Facebook
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-3">
                    <small>
                        Don’t have an account? <Link to="/">Sign Up</Link> 
                    </small>
                </div>

                <div className="text-center mt-2 text-muted" style={{ fontSize: "0.75rem" }}>
                    Instagram or Facebook
                </div>
            </div>
        </div>
    );
}
