// const catchAsync = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };

// module.exports =  catchAsync ;

// utils.js
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};

module.exports = catchAsync;