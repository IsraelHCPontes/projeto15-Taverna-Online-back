
export async function confirmePasswordValidation(req, res, next){
    const {password, confirmPassword} = req.body;

    console.log(password, confirmPassword)

    if(password !== confirmPassword){
        res.status(409).send({message:"As senhas precisam ser iguais"})
        return;
     }

     next();
}