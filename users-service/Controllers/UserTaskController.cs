using JobTrackPro.ApiModels;
using JobTrackPro.Helpers;
using JobTrackPro.Models;
using JobTrackPro.Sevices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTrackPro.Controllers
{

    public class UserTaskController : ControllerBase
    {

        private readonly UserTaskService _usertaskservice;

        public UserTaskController(Model_DataContext model_DataContext)
        {
            _usertaskservice = new UserTaskService(model_DataContext);

        }


        [HttpGet]
        [Route("api/usertasks")]
        [Authorize]

        public IActionResult GetAllUserTask()
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                IEnumerable<UserTaskResponseModel> data = _usertaskservice.GetUserTasks();

                if (!data.Any())
                {
                    type = ResponseType.NotFound;
                    message = "Not found";
                }

                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {

                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }



        [HttpGet]
        [Route("api/usertasks/user/assigned")]
        [Authorize]

        public IActionResult GetAssignedTaskToUser()
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                var userId = HttpContext.User.FindFirst("id")?.Value;
                UserTaskResponseModel? data = _usertaskservice.GetUserTask(userId);
                if (data == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, data, "Invalid skill id"));

                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {

                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        [HttpGet("{id}")]
        [Route("api/usertasks/one/{id}")]
        [Authorize]
        public IActionResult GetUserTaskById(string id)
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                UserTaskResponseModel? data = _usertaskservice.GetUserTaskById(id);
                if (data == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, data, "Invalid usertask id"));
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }



        [HttpPost]
        [Route("api/usertasks/user/task")]
        [Authorize]
        public IActionResult PostUserTask([FromBody] UserTaskRequestModel userTaskBody)
        {
            try
            {

                UserTaskResponseModel? usertask = _usertaskservice.getUserTaskByUserIdAndTaskId(userTaskBody);
                if (usertask != null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, usertask, "Task or User already assigned"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                _usertaskservice.CreateUserTask(userTaskBody);
                return Ok(ResponseHandler.GetAppResponses(type, null, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        [HttpDelete("{id}")]
        [Route("api/usertasks/remove/one/{id}")]
        [Authorize]
        public IActionResult RemoveUserTask(string id)
        {
            try
            {

                UserTaskResponseModel? usertask = _usertaskservice.GetUserTaskById(id);
                if (usertask == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, usertask, "Invalid userTaskId"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                _usertaskservice.DeleteUserTask(id);
                return Ok(ResponseHandler.GetAppResponses(type, null, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

    }
}

