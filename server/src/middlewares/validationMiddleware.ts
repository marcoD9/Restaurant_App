import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

// Type definition for resource validation rules
type ValidationRules<T> = {
  [K in keyof T]?: ValidationChain[];
};

// Parameterized validation middleware
function validateResource<T>(rules: ValidationRules<T>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validations: ValidationChain[] = [];

    // Extract validation rules from request body
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        validations.push(
          ...rules[key]!.map((rule) => rule.withMessage(`${key} is not valid`))
        );
      }
    }

    // Execute all validation rules
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Pass control to the next middleware
    next();
  };
}

export default validateResource;
