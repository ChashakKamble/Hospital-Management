
const billModel = require("../modules/billModule");
const mediModel = require("../modules/medicineModules");
const roomModel = require("../modules/roomsModules");
const patiModel = require("../modules/patientModules");


class Bill {
  async getMedicinCharge(id) {
    try {
      let patient = await patiModel.getPatient(id);
      if (!patient || patient.length === 0) throw new Error("Patient not found");

      let idString = patient[0].priscription;
      if (!idString) return 0;

      let medIds = idString.split(",").map(id => parseInt(id.trim()));
      let totalPrice = 0;

      for (const medId of medIds) {
        const price = await mediModel.getPrice(medId);
        totalPrice += price || 0;
      }

      return totalPrice;

    } catch (err) {
      console.error("Error in getMedicinCharge:", err);
      throw err;
    }
  }

  async getRoomCharge(id) {
    try {
      let patient = await patiModel.getPatient(id);
      if (!patient || patient.length === 0) throw new Error("Patient not found");

      const room = await roomModel.roomDetails(patient[0].room_id);
      if (!room || room.length === 0) return 0;

      const roomCharge = room[0].charge_per_day;
      let cur_date = new Date();
      let admit_date = new Date(patient[0].admitted_date);

      let diff = Math.ceil((cur_date - admit_date) / (1000 * 60 * 60 * 24));
      return roomCharge * diff;

    } catch (err) {
      console.error("Error in getRoomCharge:", err);
      throw err;
    }
  }

  async addBill(id) {
    try {
      const billExists=await billModel.billExists(id)
      if(billExists.length>1){
        const bill= await this.getBill(id);
        return bill;
      }

      let rc = await this.getRoomCharge(id);
      let mc = await this.getMedicinCharge(id);
      const result = await billModel.addBill(id, rc, 1000, 500, mc, rc + 1000 + 500 + mc);
      return result;
    } catch (err) {
      console.error("Error in addBill:", err);
      throw err;
    }
  }

  async getBill(id) {
    try{
      const result=await billModel.getBill(id);
      return result;
    }catch(err){
      return err;
    }
  }

}


module.exports = Bill;