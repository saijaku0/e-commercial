const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let uniqueFileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", uniqueFileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: uniqueFileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badrequest(error.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    let device;

    page = page || 1;
    limit = limit || 9;

    let offset = page * limit - limit;

    if (!brandId && !typeId) {
      device = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      device = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      device = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      device = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }

    return res.json(device);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: Device, as: "info" }],
    });

    return res.json(device);
  }
}

module.exports = new DeviceController();
