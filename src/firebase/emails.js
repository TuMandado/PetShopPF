import emailjs from "@emailjs/browser";
import emailkeys from "./emailkeys";

export const emails = async (user, cart) => {
  let impor = 0;
  let product = "";
  console.log("entro a emails");
  console.log('usermails',user);
  console.log(cart);
  cart.map((e) => {
    let delSim = e.price.slice(2);
    let delDot = delSim.replace(".", "");
    let repCom = delDot.replace(",", ".");
    let price = Number(repCom);
    let sum = price * e.quantity;
    impor = impor + sum;
    product = product + ", " + e.title;
  });

  console.log("product", product);

  var templateParams = {
    user_name: `${user.displayName}`,
    user_email: `${user.email}`,
    message: `¡Hola, ${user.name}! 👋

               📢 Te escribimos este mensaje para avisarte que tu compra por $${impor} pesos fue finalizada con éxito.  
               
               Gracias por elegirnos para hacer feliz a tu mascota. 🐾🥰

               Recordá que cualquier consulta nos la podes hacer llegar escribiendonos un e-mail a elpetshop536@gmail.com 😉
                    `,
  };

  emailjs
    .send(
      emailkeys.service_id,
      emailkeys.template_id,
      templateParams,
      emailkeys.public_key
    )
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};
