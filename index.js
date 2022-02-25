function mostrarResultados(results) {
  const template = document.querySelector("#producto-nuevo");
  console.log(results);

  //voy a repetir el proceso 10 veces para no llenarme mucho la pantalla

  for (let i = 0; i < results.length; i++) {
    let nombre = template.content.querySelector(".nombre-producto");
    let link = template.content.querySelector(".link-producto");
    let cantVendidos = template.content.querySelector(".cantidad-vendidos");
    let precio = template.content.querySelector(".precio-producto");
    let imagen = template.content.querySelector(".imagen-producto");

    //primero paso a una variable todos los elementos del template que quiero modificar
    //luego modifico las variables(elementos) con lo que contengan los productos de results

    link.href = results[i].permalink;
    imagen.src = results[i].thumbnail;
    nombre.textContent = results[i].title;
    cantVendidos.textContent = "Cantidad Vendidos: " + results[i].sold_quantity;
    precio.textContent = "$ " + results[i].prices.prices[0].amount;

    //cuando termino de modificar todos los elementos como quise, entonces voy a clonar
    // el template y lo voy a agregar como hijo a algun contenedor del body, donde quiera
    //colocar este elemento nuevo

    let paste = document.querySelector(".contenedor-busquedas");
    let clone = document.importNode(template.content, true);
    paste.appendChild(clone);

    //este proceso se va a repetir tantas veces como lo indique en el for
  }
}

function main() {
  const form = document.querySelector(".buscador-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const objeto = Object.fromEntries(formData.entries());
    const nombreProduct = objeto.productoNombre;
    console.log(nombreProduct);

    /* hago un fetch, voy a pedir a mercadolibre, los produductos que tengan lo que ingrese
    en el buscador, por lo tanto el nombreProduct, luego convierto la respuesta a un json
    y solo quiero los results de esa respuesta, el cual results va a ser una colleccion +
    con 50 productos */
    const promesaML = fetch(
      "https://api.mercadolibre.com/sites/MLA/search?q=" + nombreProduct
    );
    const promesaData = promesaML.then((response) => response.json());
    promesaData.then((data) => {
      mostrarResultados(data.results);
    });
  });
}

/*
results[]

nombre = results[].title

precio = results[].prices.prices[0].amount

cantVendido = results[].sold_quantity

imagen = results[].thumbnail

link a mercado = results[].permalink
*/

main();
