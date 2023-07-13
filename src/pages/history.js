import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/appBar";

import { Divider, Typography } from "@mui/material";
import axios from "axios";

function History() {
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/cart/user/${localStorage.getItem("user")}`
      )
      .then(
        (data) => (
          console.log(data),
          data.status === 200
            ? (console.log("AAAAAAAAAA"),
              setCarts(data.data),
              setMessage(""),
              console.log(carts))
            : setMessage("Nenhum pedido encontrado")
        )
      );
    //   .catch(() => setMessage("Nenhum pedido encontrado"));
    console.log(message);
  }, [carts]);
  return (
    <div>
      <PrimarySearchAppBar />
      <h1>Histórico de Pedidos</h1>

      <table style={{ width: "100vw" }}>
        <tr>
          <th>Nº pedido</th>
          <th>Data</th>
        </tr>
        {message == "" ? (
          carts.map((cart) => (
            <>
              <tr
                style={{
                  borderWidth: "1px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                <td>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cart.id}
                  </Typography>
                </td>
                <td>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cart.date}
                  </Typography>
                </td>
                <td
                  style={{
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
              <tr
                style={{
                  //   width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <td colspan="3" style={{ textAlign: "center", padding: 2 }}>
                  <table>
                    <tr>
                      <th>Título</th>
                      <th>Preço</th>
                    </tr>

                    {cart.products.map((product) => (
                      <tr>
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
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
              <Divider />
            </>
          ))
        ) : (
          <tr>
            <td colspan="3" style={{ textAlign: "center", padding: 2 }}>
              {message}
            </td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default History;
