
import { userModel } from "../models/userModel.js"
import { signupValidation, loginValidation } from "../validator/userValidator.js"
import bcrypt from "bcryptjs"

export const getHome = (req, res) => {
    res.send("Homepage!")
}

export const getAbout = (req, res) => {
    res.send("This is About Page!")
}

export const postUser = async(req, res) => {

    try {
    const {username, email, password} = req.body

    const {error} = signupValidation.validate({
        username,
        email,
        password
    })

    if (error){
        res.status(400).json({
            message: error.details[0].message
        })
    }

    const existingUser = await userModel.findOne({email})
    if(existingUser){
        res.status(400).json({
            message:`User with ${email} already exists, please login instead.`
        })
    }


    const  newUser = await userModel.create({
        username,
        email,
        password
    })

    res.status(201).json({
        data: newUser,
        message: "User created successfully!"
    })

}catch(err){
    console.error(err)
    throw new Error(err)
}
}
export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const {error} = loginValidation.validate({
            email,
            password
        })

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const existingUser = await userModel.findOne({email})
        
        if(!existingUser) {
            return res.status(400).json ({
                message: `User with ${email} not found. SignUp instead.`
            })
        }
        
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordMatch) {
            return res.status(400).json({
                message: "invalid Credentials."
            })
        }

        return res.status(200).json({
            message: "User logged in Succesfuly."
        })

        
    } catch(err) {
        console.error(err)
        throw new Error
    }
}