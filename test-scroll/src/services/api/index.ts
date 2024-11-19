import { ApiResponse } from "./types";

class Api {
	private readonly url = "https://randomuser.me/api";
  /**
   * Retrieves user information from the API for a given page.
   *
   * @param {number} [page=1] - The page number to retrieve. Defaults to 1 if not specified.
   * @param {number} [results=10] - The number of user records to retrieve. Defaults to 10 if not specified.
   * @returns {Promise<ApiResponse>} - A promise that resolves with the user information.
   *
   * @throws Logs an error to the console if the API request fails.
   *
   * @description
   * Sends a request to the API to fetch a list of users for the specified page.
   * The request retrieves up to 10 users per call. If an error occurs during the process,
   * it is caught and logged to the console.
   */

  public async getUsers(page = 1, results = 10): Promise<ApiResponse> {
		try {
			const response = await fetch(`${this.url}?page=${page}&results=${results}`);
			return response.json();
		} catch(error) {
			console.log(error);
		}
	}
}


export const api = new Api();
