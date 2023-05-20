exports.testUser = async (req, res, next) => {
  try {
    res.send("Testing user controllers");
  } catch (error) {
    console.log(error);
  }
};
