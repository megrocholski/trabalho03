import * as React from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function AlignItemsList() {
  const [cart, setCart] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/cart_item/${cart.id}/${id}`)
      .catch(() => console.log("OK"));
    if (products.length == 0) {
      setMessage("O carrinho não possui nenhum produto");
    }
  };

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/cart/user/active/${localStorage.getItem(
          "user"
        )}`
      )
      .then(
        (data) => (
          setCart(data.data[0]),
          data.data[0] != null
            ? (setProducts(data.data[0].products), setMessage(""))
            : setMessage("O carrinho não possui nenhum produto"),
          console.log(message)
        )
      );
  }, [cart]);
  return (
    <table style={{ width: "100vw" }}>
      <tr>
        <th></th>
        <th>Título</th>
        <th>Preço</th>
        <th>Descrição</th>
        <th></th>
      </tr>
      {message == "" ? (
        products.map((product) => (
          <tr
            style={{
              padding: 10,
              borderBottom: "2px solid black",
            }}
          >
            <td
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={product.image} style={{ width: 100, height: 100 }} />
            </td>
            <td style={{ maxWidth: 400 }}>
              <Typography
                sx={{
                  width: "100%",

                  // padding: 2,
                  maxHeight: 100,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
              >
                {product.title}
              </Typography>
            </td>
            <td>
              <Typography
                sx={{
                  width: "100%",
                  // padding: 2,
                  maxHeight: 100,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
              >
                R$ {product.price}
              </Typography>
            </td>
            <td style={{ maxWidth: 400 }}>
              <Typography
                sx={{
                  width: "100%",
                  padding: 2,
                  maxHeight: 100,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
              >
                {product.description}
              </Typography>
            </td>
            <td
              style={{
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                width: 50,
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(product.id)}
              >
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colspan="4" style={{ textAlign: "center", padding: 2 }}>
            {message}
          </td>
        </tr>
      )}
    </table>
  );
}
