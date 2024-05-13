import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import app from "../../firebase/firebase.init";


const Login = () => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const [user, setUser] = useState(null);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result)
                const user = result.user;
                console.log(user);
                setUser(user);
            })
            .catch(error => {
                console.log('Error', error.messege);
            })
    }

    const handleGitHubSignIn = () =>{
        signInWithPopup(auth, gitProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
            })
            .catch(error => {
                console.log('Error', error.messege);
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log('Error', error.messege);
            })
    }

    return (
        <div>
            <br />
            {
                user ?
                    <button onClick={handleGoogleSignOut}>Sign Out</button> :
                    <>
                        <button onClick={handleGoogleSignIn}>Google Login</button>
                        <button onClick={handleGitHubSignIn}>GitHub Login</button>
                    </>

            }
            {
                user &&
                <div>
                    <h1>User Name : {user.displayName}</h1>
                    <p>Email : {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;