import jwt from 'jsonwebtoken';

const findToken = async (req,res,next)=>{
    try {
        const token = req.header('Auth-Token') || req.header('auth-token');
        if (!token){
            return res.status(400).send({error:'Invalid Token'});
        }
        const SecreteKey = 'VivekIsCollegeStudent';
        const decoded = jwt.verify(token,SecreteKey);
        if(!decoded){
            return res.status(400).send({error:'Invalid Token'});
        }
        res.user = decoded.user.userId;
        next();
    } catch (error) {
        console.log('error ', error.message);
        return res.status(400).send({ error: 'Internal Error Occurred' });
    }
}

export default findToken;