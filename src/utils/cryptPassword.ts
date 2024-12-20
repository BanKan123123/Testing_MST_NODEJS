import * as bcrypt from 'bcrypt';

export function cryptPassword(password: string, callback: (err: Error | undefined, hash: string) => void) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return callback(err, '');

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
}

export function comparePassword(plainPass: string, hashword: string): Promise<boolean> {
    return bcrypt.compare(plainPass, hashword);
}