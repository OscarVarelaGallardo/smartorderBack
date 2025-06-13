import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        if (origin == process.env.URL_FRONTEND) {
            callback(null)
        } else {
           callback(new Error('Error of Cors'))
        }
    }
}