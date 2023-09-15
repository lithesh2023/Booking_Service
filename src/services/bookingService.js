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
      extra_price,
      discount_price,
      final_price,
      advance_paid,
      booking_status,
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
  const { booking_id, make, model, reg_num, vehicle_id } = req.body;
  const { user_id } = req.user;
  const result = await pool.query(
    `INSERT INTO public."vehicle" (booking_id,
  make,
  model,
  reg_num,
  user_id,
  vehicle_id) VALUES ($1,$2,$3,$4,$5,$6)`,
    [booking_id, make, model, reg_num, user_id, vehicle_id]
  );
  res.status(201).json(result);
};
const addSlot = async (req, res) => {
  const { parking_slot_id, price, grade } = req.body;
  const result = await pool.query(
    `INSERT INTO public."parking_slot" () VALUES ($1,$2,$3)`,
    [parking_slot_id, price, grade]
  );
  res.status(201).json(result);
};
const getAllSlots = async (req, res) => {
  const result = await pool.query(`SELECT * FROM public."parking_slot"`);
  res.status(200).json(result.rows);
};
const getVehicle = async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM public."vehicle_detail" WHERE user_id = ${req?.user?.user_id}`
  );
  res.status(200).json(result.rows);
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
module.exports = {
  getAllBooking,
  createBooking,
  addVehicle,
  addSlot,
  getAllSlots,
  getVehicle,
  deleteBooking,
  removeVehicle,
};