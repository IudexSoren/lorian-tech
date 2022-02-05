// Schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const validateSchema = (schema, payload) => {
  const { error, value } = schema.validate(payload, options);

  if (error) {
    return {
      isValid: false,
      message: `Validation error: ${error.details
        .map((e) => e.message)
        .join(", ")}`,
    };
  } else {
    return {
      isValid: true,
      value,
    };
  }
};

export default validateSchema;
