import url from "url";

export default {
  "/api/test": (req, res) => {
    const urlObj = url.parse(req.url, true);
    const { name, age } = urlObj.query;
    res.end(
      JSON.stringify({
        success: true,
        data: {
          name,
          age,
        },
      })
    );
  },
  "POST /api/test2": (req, res) => {
    const urlObj = url.parse(req.url, true);
    const { name, age } = urlObj.query;
    res.end(
      JSON.stringify({
        success: true,
        data: {
          name,
          age,
        },
      })
    );
  },
};
