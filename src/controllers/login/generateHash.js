import bcrypt from 'bcrypt';

const password = 'himanshu kumar';
const saltRounds = 10; // used to increase security level of password;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log('Hashed password:', hash);
});
