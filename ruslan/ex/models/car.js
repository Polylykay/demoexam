const pool = require('../database')

class Car {
	static async getCars() {
		try {
			const rows = await pool.query(`SELECT * FROM startup.car`);
            const result = rows[0]
			return result;
		} catch (error) {
			console.error(`Произошла ошибка при выполнении запроса: ${error}`);
			throw error;
		}
	}
}

module.exports = Car;
