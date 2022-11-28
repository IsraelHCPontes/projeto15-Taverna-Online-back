import Joi from "joi";

const cartSchema = Joi.object({
    name:  Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    image: Joi.string().uri().required(),
    quantity: Joi.number().min(0).required(),
})

export default cartSchema