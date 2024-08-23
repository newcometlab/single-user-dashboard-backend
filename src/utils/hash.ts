import bcrypt from 'bcryptjs';

export const generateSaltAndHash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
};

export const validatePassword = async (password: string, hash: string, salt: string) => {
    const hashToValidate = await bcrypt.hash(password, salt);
    return hash === hashToValidate;
};
