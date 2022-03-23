const {check, validationResult} = require('express-validator');
const generateadoptionValidations = () =>[
    check('user_id').notEmpty().isLength({max:50}).withMessage("invalid user"),
    check('pet_id').notEmpty().isLength({max:50}).withMessage("invalid pet"),
    check('DATE').notEmpty().isDate({max:30}).withMessage("invalid date"),
    
]
const generateIdValidators =() =>[
    check('id').notEmpty().isNumeric().withMessage("invalid id"),

]
const updateAdoptions = () =>[
    check('user_id').notEmpty().isLength({max:50}).withMessage("invalid user"),
    check('pet_id').notEmpty().isLength({max:50}).withMessage("invalid pet"),
    check('DATE').notEmpty().isDate({max:30}).withMessage("invalid date"),
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
        generateadoptionValidations(),
        reporter
    ],
    id:[
        generateIdValidators(),
        reporter
    ],
    update:[
        updateAdoptions(),
        reporter
    ]
};