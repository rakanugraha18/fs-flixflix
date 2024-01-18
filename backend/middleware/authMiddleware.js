const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authorization = req.get("authorization");

  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "User not logged in" });
  }

  const token = authorization.split(" ")[1];

  try {
    const validToken = verify(token, process.env.SECRET_KEY);

    // Check if the decoding was successful
    if (!validToken) {
      return res.status(401).json({ error: "Token is missing or invalid" });
    }

    // Attach the customer ID from the token to the request object
    req.id_customer = validToken.id;

    // Call the next middleware or route handler in the chain
    next();
  } catch (error) {
    // Handle errors during token verification
    return res.status(401).json({ error: "Token is missing or invalid" });
  }
};

module.exports = { validateToken };
