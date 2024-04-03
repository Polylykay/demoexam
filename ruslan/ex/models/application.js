const pool = require('../database')

class ApplicationModel {
	static async createInstance(applicationData) {
		console.log(applicationData);
		try {
			const queryString = `
                INSERT INTO application (booking_date, status, id_user, id_car)
                VALUES ('${applicationData.bookingDate}', 'new', '${applicationData.userId}', '${applicationData.carId}')
            `;

			await pool.query(queryString);

		} catch (error) {
			console.error(
				`Произошла ошибка при создании нового пользователя: ${error}`
			);
		} 
	}
	static async getAllApplications() {
		try {
			const rows = await pool.query(`
            SELECT
                application.id,
                user.full_name AS user_name,
                user.phone AS user_phone,
                user.email AS user_email,
                car.name AS car_model,
                application.status AS status_name,
                application.booking_date
            FROM
                startup.application
            JOIN
                user ON application.id_user = user.id
            JOIN
                car ON application.id_car = car.id
            `);
            const result = rows[0]
            console.log(result)
			return result;
		} catch (error) {
			console.error(`Произошла ошибка при выполнении запроса: ${error}`);
			throw error;
		}
	}
	static async getUserApplications(userId) {
		try {
			const rows = await pool.query(`
                SELECT
                    application.id,
                    user.full_name AS user_name,
                    user.phone AS user_phone,
                    user.email AS user_email,
                    car.name AS car_model,
                    application.status AS status_name,
                    application.booking_date
                FROM
                    startup.application
                JOIN
                    user ON application.id_user = user.id
                JOIN
                    car ON application.id_car = car.id
                WHERE id_user='${userId}'
                    `);
            const result = rows[0]
            console.log(result)
			return result;
		} catch (error) {
			console.error(`Произошла ошибка при выполнении запроса: ${error}`);
			throw error;
		}
	}
}

module.exports = ApplicationModel;
