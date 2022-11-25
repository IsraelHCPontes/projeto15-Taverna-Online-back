import Joi from "joi";

const signUpSchema = Joi.object({
    name:  Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    image: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.string().required()
})

export default signUpSchema