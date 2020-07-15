import crypto from 'crypto';

function convertPasswordWithSalt(password: string, salt: string): Promise<string> {
    return new Promise((res, rej) => {
        crypto.pbkdf2(password, salt, 14243, 64, 'sha512', (err, key) => {
            if(err) return rej(err);
            const convertedPassword = key.toString('base64');
            res(convertedPassword);
        });
    });
}

function makeSalt(): Promise<string> {
    return new Promise((res, rej) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) return rej(err);
            const salt = buf.toString('base64');
            res(salt);
        });
    });
}


async function convertPassword(password: string): Promise<{password:string, salt: string}> {
    const salt = await makeSalt();
    const convertedPassword = await convertPasswordWithSalt(password, salt);
    return {password : convertedPassword, salt};
}

export {convertPasswordWithSalt, makeSalt, convertPassword};