const {check} = require("express-validator")

exports.categoryValidation = [
    check('categoryName', "please enter a name min 2 and max 20 chars").isLength({min:2, max:20}),
    check("description", "Please enter a description max 200 chars").isLength({max:200})
];

exports.productValidation = [
    check('productName', "please enter a name min 2 and max 20 chars").isLength({min:2, max:20}),
    check("description", "Please enter a description max 200 chars").isLength({max:200})
]
