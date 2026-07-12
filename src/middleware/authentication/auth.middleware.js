const User = require("../../model/User.model");
const { verifyToken } = require("../../../utils/jwtokens/tokenUser");

const isAuth = async(req,res,next) => {
    try {
        
        const [, token] = req.headers.authorization.split(" ");
        const { id } = verifyToken(token);
        const user = await User.findById(id);
    
        user.password = null;
        req.user = user;

        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Solo los administradores pueden cambiar roles",
            });
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: "No estas autorizado"});
    }
}

const isAuthDelete = async(req,res,next) => {
    try {
        
        const [, token] = req.headers.authorization.split(" ");
        const { id } = verifyToken(token);
        const user = await User.findById(id);
    
        user.password = null;
        req.user = user;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: "No estas autorizado"});
    }
}

module.exports = {
    isAuth,
    isAuthDelete
}