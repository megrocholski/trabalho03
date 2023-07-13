import { Button, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PrimarySearchAppBar from "../components/appBar";
import { useEffect, useState } from "react";
import axios from "axios";

function Item() {
  let { productId } = useParams();
  const [product, setProduct] = useState();
  const [cart, setCart] = useState();
  const [message, setMessage] = useState("");

  //   const getCart = async () => {
  //     await
  //   };

  const handleAddToCart = async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAaaaa");

    // getCart();

    console.log(cart);

    let cart_aux = [];

    if (cart != null) {
      cart.products.map((product) => {
        cart_aux.push(product.id);
      });
    }
    if (cart != null) {
      let ids_aux = [...cart_aux];
      ids_aux.push(product.id);
      console.log("IDS produtos: " + ids_aux);
      await axios
        .put(
          `http://localhost:8080/api/cart/${cart.id}/${localStorage.getItem(
            "user"
          )}`,
          {
            id: ids_aux,
          }
        )
        .then((data) => (console.log("cart1 " + data), setCart(data.data)));
    } else {
      let ids_aux = [...cart_aux];
      ids_aux.push(product.id);
      console.log("IDS produtos: " + ids_aux);

      await axios
        .post(
          `http://localhost:8080/api/cart/${localStorage.getItem("user")}`,
          {
            id: ids_aux,
          }
        )
        .then((data) => (console.log(data), setCart(data.data)));
    }
    console.log("cart 2" + cart);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${productId}`)
      .then((data) => setProduct(data.data))
      .catch(() => setMessage("Ocorreu um erro, tente novamente."));

    axios
      .get(
        `http://localhost:8080/api/cart/user/active/${localStorage.getItem(
          "user"
        )}`
      )
      .then((data) => setCart(data.data[0]))
      .catch(() => setMessage("Ocorreu um erro, tente novamente."));
    // console.log(product);
  }, [product]);
  return product ? (
    <div>
      <PrimarySearchAppBar />
      <Paper sx={{ display: "flex", flexDirection: "row", padding: 10 }}>
        <div>
          <img src={product.image} style={{ width: 400, height: 400 }} />
        </div>
        <div style={{ marginTop: 50, marginLeft: 15 }}>
          <Typography sx={{ fontSize: 30 }}>{product.title}</Typography>
          <br />
          <Typography>{product.description}</Typography>
          <br />
          <br />
          <br />
          <Typography>R$ {product.price}</Typography>
          <br />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: 20,
            }}
          >
            <Button
              variant="contained"
              onClick={
                () => handleAddToCart()
                // console.log("SSSSSSSSSSSSS")
              }
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  ) : null;
}

export default Item;
