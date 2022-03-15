export function signIn() {
    return auth.signInWithPopup(provider)
        .then(result => result.user);
}

export function signOut() {
    return auth.signOut();
}