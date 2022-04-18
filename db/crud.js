export default new (class Crud {
  reJson(data) {
    return JSON.parse(JSON.stringify(data));
  }
  /**
   * return data from dataBase
   * @param {*} model
   * @param {object} query
   * @param {object} projection
   * @param {object} options
   * @returns
   */
  async find(model, query = {}, projection = null, options = {}) {
    const data = this.reJson(await model.find(query, projection, options));
    return data;
  }
  /**
   * return one record from database
   * @param {*} model
   * @param {object} query
   * @param {object} projection
   * @param {object} options
   * @returns
   */
  async findOne(model, query = null, projection = null, options = {}) {
    const data = this.reJson(await model.findOne(query, projection, options));
    return data;
  }
  /**
   * add record to database
   * @param {*} model
   * @param {object} data
   * @returns
   */
  async create(model, data) {
    let newRecord = new model(data);
    return this.reJson(await newRecord.save());
  }
  /**
   * update database record
   * @param {*} model
   * @param {object} query
   * @param {object} updatedData
   * @param {object} options
   * @returns
   */
  async updateMany(model, query = {}, updatedData = {}, options) {
    return this.reJson(
      await model.updateMany(query, { $set: updatedData }, options)
    );
  }
  /**
   * update one record in database
   * @param {*} model
   * @param {object} query
   * @param {object} updatedData
   * @param {object} options
   * @returns
   */
  async updateOne(model, query = {}, updatedData, options = { new: true }) {
    return this.reJson(
      await model.findOneAndUpdate(query, { $set: updatedData }, options)
    );
  }
  /**
   * delete a record from database and return deleted record
   * @param {*} model
   * @param {object} query
   * @param {object} options
   * @returns
   */
  async deleteOne(model, id = null, options = {}) {
    return this.reJson(await model.findByIdAndDelete(id, options));
  }
})();
