const pool = require('../database')

class User {
	static async createInstance(userData) {
		console.log(userData);
		try {
			const queryString = `
                INSERT INTO user (full_name, email, password, phone, driver_license, role)
                VALUES ('${userData.full_name}', '${userData.email}', '${userData.password}', '${userData.phone}', '${userData.driver_license}', '1')
            `;

			await pool.query(queryString);
			console.log("Создан новый пользователь");
		} catch (error) {
			console.error(
				`Произошла ошибка при создании нового пользователя: ${error}`
			);
		} 
	}

	static async getUserByEmail(email) {
		try {
			const queryString = `
				SELECT * FROM user
				WHERE email = ?
			`;

			const result = await pool.query(queryString, [email]);

			return result[0];
		} catch (error) {
			console.error(
				`Произошла ошибка при получении пользователя по email: ${error}`
			);
		} 
	}

	static async checkUser(email, password) {
		console.log(email, password)
		try {
			const queryString = `
					SELECT *
					FROM user
					WHERE email = '${email}' AND password = '${password}'
			`;

			const result = await pool.query(queryString);

			return result[0][0];
		} catch (error) {
			console.error(
				`Произошла ошибка при авторизации пользователя: ${error}`
			);
		}
	}
}

module.exports = User;
