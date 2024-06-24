export default function Hello(app) {
  app.get("/second", (req, res) => {
    res.send("Second Check fof server");
  });
  app.get("/", (req, res) => {
    res.send("Welcome!");
  });
}
