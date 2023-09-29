const { pool } = require("../config/db");

const getAllBooking = (request, response) => {
  pool.query(`SELECT * FROM public."booking"`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
};
const createBooking = async (req, res) => {
  try {
    const {
      parking_slot_id,
      from_dt,
      to_dt,
      rental_price,
      extra_price = 0,
      discount_price = 0,
      final_price,
      advance_paid = 0,
      booking_status = "Pendings",
      vehicle_id,
    } = req.body;
    const created_dt = new Date(),
      createdBy = req.user.user_name,
      modified_dt = new Date(),
      modifiedBy = req.user.user_name;
    const { user_id } = req.user;
    const result = await pool.query(
      `INSERT INTO public."booking" (
        user_id,
        parking_slot_id,
        from_dt,
        to_dt,
        rental_price,
        extra_price,
        discount_price,
        final_price,
        advance_paid,
        booking_status,
        vehicle_id,
        created_dt,
        "createdBy",
        modified_dt,
        "modifiedBy") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
      [
        user_id,
        parking_slot_id,
        from_dt,
        to_dt,
        rental_price,
        extra_price,
        discount_price,
        final_price,
        advance_paid,
        booking_status,
        vehicle_id,
        created_dt,
        createdBy,
        modified_dt,
        modifiedBy,
      ]
    );
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addVehicle = async (req, res) => {
  try {
    const { make, model, reg_num } = req.body;
    const { user_id } = req.user;
    const result = await pool.query(
      `INSERT INTO public."vehicle_detail" (
  make,
  model,
  reg_num,
  user_id) VALUES ($1,$2,$3,$4)`,
      [make, model, reg_num, user_id]
    );
    res.status(201).send(`Successfully Added the vehicle ${reg_num}`);
  } catch (error) {
    res.status(500).send(`Could not book due to internal error`);
  }
};
const addSlot = async (req, res) => {
  const { parking_slot_id, price, grade } = req.body;
  await pool.query(
    `INSERT INTO public."parking_slot" (parking_slot_id,price, grade) VALUES ($1,$2,$3)`,
    [parking_slot_id, price, grade]
  );
  res.status(201).send("Parking slot Added");
};
const getAllSlots = async (req, res) => {
  const result = await pool.query(`SELECT * FROM public."parking_slot"`);
  res.status(200).json(result.rows);
};
const getVehicle = async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM public."vehicle_detail" WHERE user_id = ${req?.user?.user_id}`
  );
  const data = result.rows;
  console.log("data", data);
  res.status(200).json(data);
};
const deleteBooking = async (req, res, bookingId) => {
  pool
    .query(`DELETE FROM public."booking" WHERE booking_id = ${bookingId}`)
    .then((result) => {
      return res.status(200).send(`Successfully deleted ${bookingId}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const removeVehicle = async (req, res, vehicle_id) => {
  pool
    .query(
      `DELETE FROM public."vehicle_detail" WHERE vehicle_id = ${vehicle_id}`
    )
    .then((result) => {
      return res.status(200).send(`Successfully deleted ${vehicle_id}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const getAvailableSlots = async (req, res) => {};
module.exports = {
  getAllBooking,
  createBooking,
  addVehicle,
  addSlot,
  getAllSlots,
  getVehicle,
  deleteBooking,
  removeVehicle,
  getAvailableSlots,
};
