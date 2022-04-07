import  {useEffect, useState} from 'react';

export function useAuth(authFirebase) {
    const [authentication, setAuthentication] = useState(null);

    const provider = new authFirebase.GoogleAuthProvider();
    const auth = authFirebase();
    const signIn = () => auth.signInWithPopup(provider);
    const signOut = () => auth.signOut().catch(err => console.error(err));

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setAuthentication(user)
            } else {
                setAuthentication(null)
            }
        });
    }, [auth, authentication])

    return({authentication, signIn, signOut})
}