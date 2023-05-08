const { response } = require("express");
const Service = require("../models/Service");

const createService = async (req, res = response) => {
  const service = new Service(req.body);

  try {
    service.user = req.uid;
    const serviceSaved = await service.save();
    res.json({
      ok: true,
      event: serviceSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with administrator...",
    });
  }
};

module.exports = {
  createService,
};
