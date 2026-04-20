import express, { urlencoded } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.port || 3000;
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/cotizar", (req, res) => {
	let { nombre, interes } = req.body;

    // Normalizamos: si no eligió nada, ponemos un mensaje; si eligió varios, los unimos.
    let materiales = "Ninguno seleccionado";
    
    if (Array.isArray(interes)) {
        materiales = interes.join(", "); // Ej: "viga-wpc, deck-coextruido"
    } else if (interes) {
        materiales = interes; // Solo uno
    }

    console.log(`Cliente: ${nombre} está interesado en: ${materiales}`);
    res.render('gracias', { nombre });

});

app.listen(port, () => {
	console.log(`Servidor corriendo en el puerto  ${port}`);
});
