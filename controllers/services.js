const { response } = require("express");
const Service = require("../models/Service");

const getServicesByUserId = async (req, res = response) => {
  const uid = req.uid;
  try {
    const services = await Service.find({ user: uid }).populate("user", "name");
    res.json({
      ok: true,
      services,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with administrator...",
    });
  }
};

const createService = async (req, res = response) => {
  const service = new Service(req.body);

  try {
    service.user = req.uid;
    const serviceSaved = await service.save();
    res.json({
      ok: true,
      service: serviceSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with administrator...",
    });
  }
};

const updateService = async (req, res = response) => {
  const serviceId = req.params.id;
  const uid = req.uid;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        ok: false,
        msg: "Nonexistent service",
      });
    }
    if (service.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not authorized, you cannot edit this service",
      });
    }
    const newService = {
      ...req.body,
      user: uid,
    };
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      newService,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      service: updatedService,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with administrator...",
    });
  }
};

const deleteService = async (req, res = response) => {
  const serviceId = req.params.id;
  const uid = req.uid;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        ok: false,
        msg: "Nonexistent service",
      });
    }
    if (service.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not authorized, you cannot delete this event",
      });
    }
    const deletedService = await Service.findByIdAndDelete(serviceId);
    res.json({
      ok: true,
      event: deletedService,
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
  getServicesByUserId,
  createService,
  deleteService,
  updateService,
};
