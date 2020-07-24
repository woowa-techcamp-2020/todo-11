

function email(email: string) {
    if(!email) return false;
    
	const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
    return regExp.test(email);
}
function password(password: string) {
    if(password.length < 4) return false;
    const regExp = /[a-zA-Z0-9]/g;
    return regExp.test(password);
}

const validate = {
    email, password
}

export default validate;