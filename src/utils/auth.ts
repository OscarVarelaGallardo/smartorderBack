import bycript from 'bcrypt'


export const hasPassword = async (password: string) => {
    const salt = await bycript.genSalt(10)
    return await bycript.hash(password, salt)
}

export async function verifyPassword(password, hash) {
    const result = await bycript.compare(password, hash);
    return result;
  }