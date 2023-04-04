export default {
  "/api/test": (req, res) => {
    const { name, age } = req.query;
    res.json({
      success: true,
      data: {
        name,
        age,
      },
    });
  },
  "POST /api/test2": (req, res) => {
    const body = req.body;
    res.json({
      success: true,
      data: body,
    });
  },
  "/api/test3": (req, res) => {
    res.status(401).json({
      success: false,
      message: "暂无权限",
    });
  },
};
