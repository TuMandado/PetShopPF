import emailjs from '@emailjs/browser'
import emailkeys from './emailkeys'



export const emails=async(user,cart)=>{
    let impor=0
    let product=''
    console.log('entro a emails')
    console.log(user)
    console.log(cart)
    cart.map(e=>{
        let delSim = e.price.slice(2);
        let delDot = delSim.replace(".", "");
        let repCom = delDot.replace(",", ".");
        let price = Number(repCom);
        let sum = price * e.quantity;
        impor = impor + sum;
        product = product + ', ' + e.title
    })
    
    console.log('product',product)

    var templateParams = {
        user_name :`${user.name}`,
        user_email:`${user.email}`,           
        message : `${user.name}👻,
                    le enviamos comprobante de pago, 
                    de la compra realizada el dia de la fecha 
                    por un monto ${impor} de los 
                    siguientes productos ${product}    `
    };
     
    emailjs.send(emailkeys.service_id,emailkeys.template_id, templateParams,emailkeys.public_key)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });


    
    
}