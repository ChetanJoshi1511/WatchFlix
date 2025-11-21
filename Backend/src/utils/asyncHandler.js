/**
* @params {Function} requestHandler - the async function to wrap
* @returns {Function} - returns a function that returns a promise/async
*/

export default function asyncHandler(requestHandler){
    return function(req,res,next){
        return Promise.resolve(requestHandler).catch((err) => next(err));
    }
}   

//alternate way
// export default asyncHadler = (requestHandler) => {
//     return (async (req,res,next) =>{
//         try{
//             await requestHandler(req,res,next);
//         }catch(error){
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message
//             });
//         }
//     })
// }