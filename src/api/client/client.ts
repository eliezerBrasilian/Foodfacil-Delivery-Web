import axios from "axios";

// const apiLocal = axios.create({
//   baseURL: `http://localhost:8080/food-facil/api/v1`,
// });
//const api = apiLocal;

const apiProd = axios.create({
  baseURL: `https://foodfacil.site/food-facil/api/v1`,
});

const api = apiProd;
export { api };
