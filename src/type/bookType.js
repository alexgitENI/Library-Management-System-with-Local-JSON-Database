import Joi from "joi"

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    ISBN: Joi.string().pattern(/^\d{13}$/).required(),
    genre: Joi.string().required()  
  });

  export default bookSchema;