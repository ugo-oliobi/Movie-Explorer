import { useEffect, useState } from "react";
import {
  useLoaderData,
  Form,
  defer,
  useActionData,
  useNavigate,
  useNavigation,
  redirect,
  useSearchParams,
} from "react-router-dom";
import googleLogo from "../assets/image/google.svg";
import {
  auth,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
} from "../utils";
import { toast } from "react-toastify";
export function loader({ request }) {
  return defer({
    message: new URL(request.url).searchParams.get("message"),
    user: auth?.currentUser,
  });
}
export async function action({ request }) {
  const pathname = new URL(request.url).searchParams.get("pathname") || "/";
  const formData = await request.formData();
  const { email, password, confirmPassword, formType } =
    Object.fromEntries(formData);

  if (formType === "createAccount") {
    if (password !== confirmPassword) {
      return { error: "Password mismatch!", formType };
    }
    // console.log(pathname, "createAccount");
    // return redirect(pathname);
    // return { success: "Account created successfully!", formType };
    try {
      await signUpWithEmailAndPassword(auth, email, password);
      toast.success("Account successfully created.");
      return redirect(pathname);
    } catch (error) {
      return { error: "An error has occurred!", formType };
    }
  }

  if (formType === "signIn") {
    try {
      await loginWithEmailAndPassword(auth, email, password);
      return redirect(pathname);
      // return { success: "Login was successful", formType };
    } catch (error) {
      return { error: "Invalid username or password", formType };
    }
  }
}
export default function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createAccountText, setCreateAcountText] =
    useState("Create an account");
  const [searchParams] = useSearchParams();
  const pathname = searchParams.get("pathname") || "/";
  const [style, setStyle] = useState({
    color: "blue",
  });
  const actionMessage = useActionData();
  const data = useLoaderData();
  const message = data.message;
  const navigation = useNavigation();
  const navigate = useNavigate();

  function createAccount() {
    setModalIsOpen(true);
    setCreateAcountText("Create an account");
    setStyle({ color: "blue" });
  }
  function closeModal() {
    setModalIsOpen(false);
    setCreateAcountText("Create an account");
  }

  useEffect(() => {
    if (actionMessage?.formType === "createAccount") {
      if (actionMessage.error) {
        setCreateAcountText(actionMessage.error);
        setStyle({ color: "red" });
      } else if (actionMessage.success) {
        console.log(actionMessage);
        setModalIsOpen(false);
      }
    }
  }, [actionMessage]);
  async function googleSignIn() {
    await signInWithGoogle();
    navigate(pathname);
  }
  return (
    <section className="login-view">
      <div className="container">
        <h2 className="signin-title">
          {message ? message : "Sign in to your account"}
        </h2>
        {actionMessage?.error && (
          <h3 className="signin-error">{actionMessage.error}</h3>
        )}
        <div className="fields-container">
          <p id="signin-msg"></p>
          <button
            id="google-signin"
            onClick={googleSignIn}
            className="btn google-signin-btn"
          >
            <img className="google" src={googleLogo} alt="google-logo" />
            Sign in with Google
          </button>

          <Form method="post" replace className="signin-form">
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <input type="hidden" name="formType" value="signIn" />
            <button
              className="btn sign-in-btn"
              id="sign-in"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "Logging in..." : "Log in"}
            </button>
          </Form>
          <button
            className="btn create-account-btn"
            id="create-account"
            onClick={createAccount}
          >
            Create Account
          </button>
        </div>
      </div>
      {modalIsOpen && (
        <div className="overlay">
          <div className="modal-display">
            <h4 id="modal-title" style={style}>
              {createAccountText}
            </h4>
            <Form method="post" className="fields-container">
              <h4 id="create-account-msg"></h4>
              <input
                type="email"
                placeholder="Email"
                id="create-with-email"
                name="email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="create-with-pwd"
                name="password"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="create-with-confirm-pwd"
                name="confirmPassword"
                required
              />
              <input type="hidden" name="formType" value="createAccount" />

              <div className="modal-btn">
                <button
                  type="button"
                  id="cancel-btn"
                  className="btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button id="create-btn" className="btn">
                  Create
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </section>
  );
}
