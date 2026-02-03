import { auth } from "../utils";
export default function DisplayName() {
  const displayName = auth?.currentUser.displayName;
  const title = displayName ? displayName.split(" ")[0] : "dear";

  return (
    <>
      {auth?.currentUser ? <small>{`Hello, ${title}`}</small> : null}
      <div className="register-line"></div>
    </>
  );
}
