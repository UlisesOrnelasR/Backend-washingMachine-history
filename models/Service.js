const { Schema, model } = require("mongoose");

const ServiceSchema = Schema({
  customer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  fault: {
    type: String,
    required: true,
  },
  changed_parts: {
    type: String,
    required: true,
  },
  service_cost: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ServiceSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Service", ServiceSchema);
