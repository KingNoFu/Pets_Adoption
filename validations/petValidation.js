const {check, validationResult} = require('express-validator');
const generatePetValidators = () =>[
    check('alias').notEmpty().isLength({max:50}).withMessage("invalid alias"),
    check('type').notEmpty().isLength({max:50}).withMessage("invalid type"),
    check('color').notEmpty().isLength({max:30}).withMessage("invalid color"),
    check('notes').notEmpty().isLength({max:150}).withMessage("invalid notes")
]
const generateIdValidators =() =>[
    check('id').notEmpty().isNumeric().withMessage("invalid id"),

]
const updatePetValidators = () =>[
    check('id').notEmpty().isNumeric({max:11}).withMessage("invalid ID"),
    check('alias').optional().isLength({max:50}).withMessage("invalid alias"),
    check('type').optional().isLength({max:50}).withMessage("invalid type"),
    check('color').optional().isLength({max:30}).withMessage("invalid color"),
    check('notes').optional().isLength({max:150}).withMessage("invalid notes")
]
const reporter = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "succes" : false,
            "code": 404,
            "message": errors,
            "data":[]
        });
    }
    next();
}
module.exports ={
    add: [
        generatePetValidators(),
        reporter
    ],
    id:[
        generateIdValidators(),
        reporter
    ],
    update:[
        updatePetValidators(),
        reporter
    ]
};