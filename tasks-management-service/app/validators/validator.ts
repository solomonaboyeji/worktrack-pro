import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult, ValidationError, ValidationChain, Result } from 'express-validator';



export const expressValidator = (req: Request, res: Response, next: NextFunction): any => {
        const errors: Result<ValidationError> = validationResult(req);
        const messages: ValidationError[] = [];
        if (!errors.isEmpty()) {
                for (const i of errors.array()) {
                        messages.push(i);
                }
                return res.status(400).send({ message: 'Bad Request', data: errors, status: 400 });
        }
        next();
};

// post task validator
export const postTaskValidator = (): ValidationChain[] => [
        body('title').notEmpty().withMessage('title is required').isString().withMessage('title must be a string'),
        body('refNumber').notEmpty().withMessage('refNumber is required').isNumeric().withMessage('ref number must be numeric'),
        body('description').notEmpty().withMessage('description is required').isString().withMessage('description must be a string'),
        body('minAge').notEmpty().withMessage('minAge is required').isNumeric().withMessage('minAge must be numeric'),
        body('amountPerHour').notEmpty().withMessage('amountPerHour is required').isNumeric().withMessage('amountPerHour must be numeric'),
];

export const updateTaskValidator = (): ValidationChain[] => [
        body('title').notEmpty().withMessage('title is required').isString().withMessage('title must be a string'),
        body('refNumber').notEmpty().withMessage('refNumber is required').isNumeric().withMessage('ref number must be numeric'),
        body('description').notEmpty().withMessage('description is required').isString().withMessage('description must be a string'),
        body('minAge').notEmpty().withMessage('minAge is required').isNumeric().withMessage('minAge must be numeric'),
        body('amountPerHour').notEmpty().withMessage('amountPerHour is required').isNumeric().withMessage('amountPerHour must be numeric'),
];


export const postTaskSkillValidator = (): ValidationChain[] => [
        body('taskId').notEmpty().withMessage('taskId is required').isString().withMessage('taskId must be a string'),
        body('skillId').notEmpty().withMessage('skillId is required').isString().withMessage('skillId must be a string'),
        body('skillName').notEmpty().withMessage('skillName is required').isString().withMessage('skillName must be a string'),
];

