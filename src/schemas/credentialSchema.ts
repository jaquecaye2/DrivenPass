import joi from "joi";

const credentialSchema = joi.object({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  user_name: joi.string().required(),
  password: joi.string().required()
});

export default credentialSchema;
