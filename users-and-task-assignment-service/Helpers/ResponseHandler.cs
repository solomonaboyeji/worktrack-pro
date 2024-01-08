namespace JobTrackPro.Helpers
{
    public class ResponseHandler
    {

        public static ApiResponse GetExceptionResponse(Exception ex)
        {
            ApiResponse response = new ApiResponse();
            response.Code = "1";
            response.ResponseData = ex.Message;

            return response;
        }

        public static ApiResponse GetAppResponses(ResponseType type, object? contract, string message)
        {
            ApiResponse response;

            response = new ApiResponse { ResponseData = contract };
            switch (type)
            {
                case ResponseType.Success:
                    response.Code = "0";
                    response.Message = message;
                    break;
                case ResponseType.NotFound:
                    response.Code = "2";
                    response.Message = message;
                    break;

                case ResponseType.BadRequest:
                    response.Code = "3";
                    response.Message = message;
                    break;

                case ResponseType.Unauthorized:
                    response.Code = "4";
                    response.Message = message;
                    break;
            }
            return response;
        }
    }

}
