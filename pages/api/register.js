import { DateTime } from "luxon";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default (req, res) => {
  if (req.method === "POST") {
    const date = DateTime.utc().toISO();
    const { name, email, flavor } = req.body;
    res.json({
      created_at: date,
      name: name,
      email: email,
      flavor: flavor,
      token: makeid(6)
    });
  } else {
    res.statusCode = 200;
    res.json({ name: "John Doe" });
  }
};
