import joi from "joi";

const cardSchema = joi.object({
  title: joi.string().required(),
  number: joi.string().length(16).required(),
  name: joi.string().required(),
  security_code: joi.string().length(3).required(),
  expiration_date: joi.date().required(),
  password: joi.string().length(4).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "both").required(),
});

export default cardSchema;
