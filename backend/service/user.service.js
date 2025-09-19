import userModel from "../models/user.model.js";

const createUser = async ({
    firstname,
    lastname,
    email,
    hashPassword
}) =>{
    if(!firstname || !email || !hashPassword) {
        console.log(firstname,email,hashPassword)
        throw new Error("All fields are required except lastname");
    }
    const user = await userModel.create({
        firstname,
        lastname ,
        email,
        password:hashPassword
    })
    return user;
}

export default { createUser };