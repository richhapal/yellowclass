const authJoiValidation = (schema) => (req, res, next) => {
     const { error, value } = schema.validate(req.body);
     if (error) {
          return res.json(error);
     } else {
          next();
     }
};

module.exports = authJoiValidation;
