import { auth as Auth } from 'firebase';

const auth = Auth();
const provider = new Auth.GithubAuthProvider();

export function signIn() {
    return auth.signInWithPopup(provider)
        .then(result => result.user);
}

export function signOut() {
    return auth.signOut();
}

export default auth;