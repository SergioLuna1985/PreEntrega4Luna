
document.addEventListener("DOMContentLoaded", () => {


/*   const reserva = JSON.parse(localStorage.getItem("reserva")) || []; */
  const container = document.getElementById("contenedor");
  const ticketContainer = document.getElementById("ticket");
  let sala_1 = [];
  const reserva_sala_1 = JSON.parse(localStorage.getItem("reserva_sala_1")) || [];
  let sala_2 = [];
  const reserva_sala_2 = JSON.parse(localStorage.getItem("reserva_sala_2")) || [];
  let sala_3 = [];
  const reserva_sala_3 = JSON.parse(localStorage.getItem("reserva_sala_3")) || [];
  let sala_4 = [];
  const reserva_sala_4 = JSON.parse(localStorage.getItem("reserva_sala_4")) || [];
 /*  const lugares = []; */


  function crearLugares(mapa, reserva) {

    let contador = 0;
    let asiento = 1;
    const lugares = [];

    mapa.forEach((row, y) => {
      row.forEach((value, x) => {

        const lugar = {

          id: contador++,
          asiento: value === 1 && asiento,
          estado: Boolean(value),
          reservado: reserva.some(el => el.asiento === asiento),
          columna: x + 1,
          fila: y + 1,
          precio: y < 3 ? 5500 : y > 7 ? 3500 : 2500,
          nombre: "",
          apellido: "",
          dni: ""

        }

        value === 1 && asiento++;

        lugares.push(lugar);

      })
    })

    return lugares;

  }

  function mostrarLugares(lugares, mapa, reserva, reservaStorage) {

    const askTable = document.querySelector("table");

    askTable && askTable.remove();

    const table = document.createElement("table");
    container.append(table);
    const tbody = document.createElement("tbody");
    table.append(tbody);

    mapa.forEach((row, y) => {

      const tr = document.createElement("tr");
      tbody.append(tr);

      row.forEach((value, x) => {

        const posicion = (y * 30) + x;

        const td = document.createElement("td");

        td.className = lugares[posicion].estado ? "disponible" : "no_disponible";

        reserva.find(el => el.asiento === lugares[posicion].asiento) && td.classList.add("seleccionada");

        td.innerText = lugares[posicion].asiento || "";

        tr.append(td);

      })
    })

    const askMensaje = document.querySelector(".mensaje");

    askMensaje && askMensaje.remove();

    const divMensaje = document.createElement("div");
    divMensaje.className = "mensaje"

    container.append(divMensaje);

    const h3 = document.createElement("h3");
    h3.className = "titulo";

    const p = document.createElement("p");
    p.className = "precio"

    const button = document.createElement("button");
    button.innerText = "LIMPIAR LUGARES";

    const button2 = document.createElement("button");
    button2.innerText = "COMPRAR";
    
    button.addEventListener("click", () => {

      Swal.fire({
                 title: 'Está seguro de queres eliminar los lugares seleccionados?',
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonText: 'Sí, seguro',
                 cancelButtonText: 'No, no quiero'
             })
                 .then(result => {
                     if (result.isConfirmed) {
                         Swal.fire({
                              title: "Confirmaste",
                              text: "Eliminaste los lugares seleccionados",
                              icon: "warning",
                              showConfirmButton: false,
                            
                         });
                         localStorage.setItem(reservaStorage, JSON.stringify([]));
                         setTimeout(()=>{
                          document.location.reload();
                         },2000)
                         
                     } else {
                         Swal.fire({
                             title: "Rechazaste",
                             text: "Los lugares seleccionados siguen ahí",
                             icon: "success",
                              confirmButtonText: "Continuar con la reserva",
                         });
                     };
                 });

    })
    
    button2.addEventListener("click", () => {

    
      console.log(reserva)

      let texto = "";

      reserva.forEach((el)=>{
        texto += `Asiento: ${el.asiento} Precio: $${el.precio}`+"   ";
      })

      const suma = reserva.reduce((acc, el) => el.precio + acc, 0);

      texto += `Total: ${suma}`;
 

      Swal.fire({
        title: "Estos son los asientos que vas a adquirir",
        text: texto,
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, comprar",
        width: "250px",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Comprado",
            text: "Tu compra se ha realizado con exito",
            icon: "success"
          });
          localStorage.setItem(reservaStorage, JSON.stringify([]));
          setTimeout(()=>{
          document.location.reload();
          },2000)
        }
      });

      /* localStorage.setItem(reservaStorage, JSON.stringify([]));
      document.location.reload(); */

    })
    
    divMensaje.append(h3);
    divMensaje.append(p);
    divMensaje.append(button);
    divMensaje.append(button2);
  }

  function mostrarTickets(reserva, pelicula) {

    document.querySelectorAll(".card").forEach(card => card.remove());
    document.querySelectorAll(".cardSuma").forEach(card => card.remove());

    const askDiv = document.querySelector(".container-flex");

    askDiv && askDiv.remove();

    const div = document.createElement("div");
    div.className = "container-flex";

    const div1 = document.createElement("div");
    const img = document.createElement("img");
    img.src = pelicula.Poster;
    img.setAttribute("width", "200px")
    img.setAttribute("alt","Poster de la pelicula")

    const div2 = document.createElement("div");
    const p1 = document.createElement("p");
    p1.innerText = `${pelicula.Title}`
    const p2 = document.createElement("p");
    p2.innerHTML = `<span>Resumen:</span> ${pelicula.Plot}`;
    const p3 = document.createElement("p");
    p3.innerHTML = `<span>Actores:</span> ${pelicula.Actors}`;
    const p4 = document.createElement("p");
    p4.innerHTML = `<span>Escrito por:</span> ${pelicula.Writer}`;
    const p5 = document.createElement("p");
    p5.innerHTML = `<span>Director:</span> ${pelicula.Director}`;
    const p6 = document.createElement("p");
    p6.innerHTML = `<span>Genero:</span> ${pelicula.Genre}`;
    const p7 = document.createElement("p");
    p7.innerHTML = `<span>Tiempo de pelicula:</span> ${pelicula.Runtime}`;
    const p8 = document.createElement("p");
    p8.innerHTML = `<span>Año:</span> ${pelicula.Year}`;

    div1.append(img);
    div2.append(p1, p2, p3, p4, p5, p6, p7, p8);
    div.append(div1, div2);
    ticketContainer.append(div);


    
    if (reserva.length) {

      reserva.forEach((el) => {

        const card = document.createElement("div");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.innerText = `Asiento: ${el.asiento} Fila: ${el.fila} Columna: ${el.columna}`;

        const parrafo = document.createElement("p");
        parrafo.innerText = `Precio: $${el.precio}`

        card.append(titulo);
        card.append(parrafo);
        ticketContainer.append(card)

      })

      const isCard = document.querySelector(".cardSuma");
      isCard && isCard.remove();

      const cardSuma = document.createElement("div");
      cardSuma.className = "cardSuma";

      const titulo = document.createElement("h3");

      const suma = reserva.reduce((acc, el) => el.precio + acc, 0);

      titulo.innerText = `Total: ${suma}`;

      cardSuma.append(titulo);

      ticketContainer.append(cardSuma);

    }
  }

  function agregarReserva(lugar, reserva, reservaStorage) {

    !reserva.some(el => el.asiento === lugar.asiento) && reserva.push(lugar);
    localStorage.setItem(reservaStorage, JSON.stringify(reserva));

  }

  function quitarReserva(lugar, reserva, reservaStorage) {

    const index = reserva.findIndex(el => el.id === lugar.id);

    reserva.splice(index, 1)
    localStorage.setItem(reservaStorage, JSON.stringify(reserva))

  }

  function eventos(lugares, reserva, reservaStorage, pelicula) {

    const nodosDisponibles = document.querySelectorAll(".disponible");

    nodosDisponibles.forEach(element => {

    element.onmouseover = () => {

      const titulo = document.querySelector(".titulo");
      const precio = document.querySelector(".precio");

      element.classList.add("hover")

      const asiento = parseInt(element.innerText) || 0;

      const lugar = lugares.find(el => el.asiento === asiento);

      titulo.innerText = `Asiento ${lugar.asiento} Fila ${lugar.fila} Columna ${lugar.columna}`;

      precio.innerText = `Precio: $${lugar.precio}`;

    }


    element.onmouseout = () => {
      element.classList.remove("hover");
    }

    element.onclick = () => {

      element.classList.toggle("seleccionada");

      const asiento = parseInt(element.innerText);

      lugares.forEach((el) => {
        if (el.asiento === asiento) {

          if (el.reservado) {
            Toastify({
              text: `Asiento ${asiento} deseleccionado`,
              gravity: "bottom",
              duration: 3000,
              position: 'left',
              style: {background: 'red'}
            }).showToast();
            
            el.reservado = false;
            quitarReserva(el, reserva, reservaStorage);
            reserva.length || document.querySelector(".cardSuma").remove();
            mostrarTickets(reserva, pelicula);

          } else {
            Toastify({
              text: `Asiento ${asiento} seleccionado`,
              gravity: "bottom",
              duration: 3000,
              style: {background: 'green'}
                     
            }).showToast();
            el.reservado = true;
            agregarReserva(el, reserva, reservaStorage);
            mostrarTickets(reserva, pelicula);

          }
        }
      })
    }
  })
  }

  let pelicula_1 = {};
  let pelicula_2 = {};
  let pelicula_3 = {};
  let pelicula_4 = {};

/*   fetch("/PreEntrega4Luna/peliculas.json")
    .then((res) => res.json())
    .then((peliculas)=>{

      peliculas.forEach((el, index)=>{

        switch (index) {
          case 0:
            pelicula_1 = el;
            break;
          case 1:
            pelicula_2 = el;
            break;
          case 2:
            pelicula_3 = el;
            break;
          case 3:
            pelicula_4 = el;
            break;
          default:
            break;
        }

      });
      
  }) */

  fetch("http://www.omdbapi.com/?apikey=2ac80102&t=jurassic+park")
  .then((res) => res.json())
  .then((pelicula)=>{

    pelicula_1 = pelicula;
    
  })

  fetch("http://www.omdbapi.com/?apikey=2ac80102&t=back+to+the+future")
  .then((res) => res.json())
  .then((pelicula)=>{

    pelicula_2 = pelicula;
    
  })

  fetch("http://www.omdbapi.com/?apikey=2ac80102&t=interstellar")
  .then((res) => res.json())
  .then((pelicula)=>{

    pelicula_3 = pelicula;
    
  })

  fetch("http://www.omdbapi.com/?apikey=2ac80102&t=the+martian")
  .then((res) => res.json())
  .then((pelicula)=>{

    pelicula_4 = pelicula;
    
  })





  sala_1 = crearLugares(disposicion_1, reserva_sala_1);
  sala_2 = crearLugares(disposicion_3, reserva_sala_2);
  sala_3 = crearLugares(disposicion_4, reserva_sala_3);
  sala_4 = crearLugares(disposicion_2, reserva_sala_4);

  



  setTimeout(()=>{
    mostrarLugares(sala_1, disposicion_1, reserva_sala_1, "reserva_sala_1");
    eventos(sala_1, reserva_sala_1, "reserva_sala_1", pelicula_1);
    mostrarTickets(reserva_sala_1, pelicula_1); 
  },100)


  const input_salas = document.getElementById("salas");

  input_salas.onchange = () => {

    switch (input_salas.value) {
      case "0":
        setTimeout(()=>{
          mostrarLugares(sala_1, disposicion_1, reserva_sala_1, "reserva_sala_1");
          eventos(sala_1, reserva_sala_1, "reserva_sala_1", pelicula_1);
          mostrarTickets(reserva_sala_1, pelicula_1); 
        },100)
        break;
      case "1":
        setTimeout(()=>{
          mostrarLugares(sala_2, disposicion_1, reserva_sala_2, "reserva_sala_2");
        eventos(sala_2, reserva_sala_2, "reserva_sala_2", pelicula_2)
        mostrarTickets(reserva_sala_2, pelicula_2); 
        },100)
        break;
      case "2":
        setTimeout(()=>{
          mostrarLugares(sala_3, disposicion_1, reserva_sala_3, "reserva_sala_3");
        eventos(sala_3, reserva_sala_3, "reserva_sala_3", pelicula_3)
        mostrarTickets(reserva_sala_3, pelicula_3); 
        },100) 
        break;
      case "3":
        setTimeout(()=>{
          mostrarLugares(sala_4, disposicion_1, reserva_sala_4, "reserva_sala_4");
        eventos(sala_4, reserva_sala_4, "reserva_sala_4", pelicula_4)
        mostrarTickets(reserva_sala_4, pelicula_4); 
        },100)
        
        break;
    
      default:
        break;
    }

  }



 
   



 

  

})

