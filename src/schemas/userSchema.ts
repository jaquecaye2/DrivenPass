import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,}$/)
    .required(),
});

export default signInSchema;
