export class ResponseHelper {
    response(){
        return {
            success : true,
            message : "record updated successfully",
            code :204
        }
    }
    responseCriterio1() {
        return {
            success : false,
            message : "MRP should be less than equal to the Price",
            code :422
        }
    }
    responseCriterio2() {
        return {
            success : false,
            message : "Stock count is 0",
            code :422
        }
    }
    responseCriterio12() {
        return {
            success : false,
            message : " MRP should be less than equal to the Price y Stock count is 0",
            code :422
        }
    }
}