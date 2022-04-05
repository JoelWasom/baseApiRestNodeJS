export class TestService {
    get(): Date {
        return new Date();
    }
    response() {
        return {
            success : true,
            message :"proceso ejecutado correctamente.",
            code :200
        }
    }
}